import { createClient } from "@libsql/client/web";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, company, phone, score, answers } = req.body;

  if (!name || !email || score === undefined) {
    return res.status(400).json({ error: "Missing required fields (name, email, score)" });
  }

  const dbClient = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    // 1. Ensure the assessments table exists
    await dbClient.execute(`
      CREATE TABLE IF NOT EXISTS assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        phone TEXT,
        score INTEGER NOT NULL,
        answers TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Insert the assessment details
    const answersJson = JSON.stringify(answers || {});
    await dbClient.execute({
      sql: `INSERT INTO assessments (name, email, company, phone, score, answers) 
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [name, email, company || null, phone || null, score, answersJson],
    });

    // 3. Optional: Send an email notification via Mailjet as well, or just return success
    // Let's also email the admin about the new assessment
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0d9488, #115e59); padding: 24px; border-radius: 12px 12px 0 0;">
          <h2 style="color: #ffffff; margin: 0; font-size: 22px;">📊 New Compliance Assessment Completed</h2>
          <p style="color: #ccfbf1; margin: 8px 0 0 0; font-size: 14px;">via ReguLattice Website</p>
        </div>
        <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
          <h3 style="color: #0f172a; margin-top: 0;">Score: <span style="color: #0d9488; font-size: 24px; font-weight: bold;">${score}/100</span></h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px; width: 120px;"><strong>Name</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;"><strong>Email</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;"><a href="mailto:${email}" style="color: #0d9488;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;"><strong>Company</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;">${company || "Not specified"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;"><strong>Phone / WA</strong></td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;">${phone || "Not provided"}</td>
            </tr>
          </table>
          <p style="color: #64748b; font-size: 12px; margin-top: 20px;">Answers stored securely in Turso DB.</p>
        </div>
      </div>
    `;

    const MJ_API_KEY = "f2e0ab5af468c23789f8ef1bedfa2e59";
    const MJ_SECRET_KEY = "36fa567993ccd2023deb25df5ab198ee";

    const mailjetPayload = {
      Messages: [
        {
          From: {
            Email: "info@regulattice.com",
            Name: "ReguLattice Website",
          },
          To: [
            {
              Email: "info@regulattice.com",
              Name: "ReguLattice",
            },
            {
              Email: "moazzamwaheed@gmail.com",
              Name: "Moazzam Waheed",
            },
          ],
          Subject: `Compliance Assessment Completed by ${name} (${score}/100)`,
          TextPart: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone}\nScore: ${score}/100`,
          HTMLPart: htmlBody,
          ReplyTo: {
            Email: email,
            Name: name,
          },
        },
      ],
    };

    // We make the email call asynchronous and don't await if we want, but since this is serverless we can just await it.
    await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${MJ_API_KEY}:${MJ_SECRET_KEY}`).toString("base64"),
      },
      body: JSON.stringify(mailjetPayload),
    }).catch(err => console.error("Mailjet send failed:", err));

    return res.status(200).json({ success: true, message: "Assessment stored successfully" });
  } catch (dbErr) {
    console.error("Turso DB error during assessment storage:", dbErr);
    return res.status(500).json({ error: "Failed to store assessment details in database" });
  }
}
