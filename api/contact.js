import { createClient } from "@libsql/client/web";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, company, phone, message } = req.body;

  // Initialize Turso DB Client
  const dbClient = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    // Ensure table exists
    await dbClient.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        company TEXT,
        phone TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert data into Turso DB
    await dbClient.execute({
      sql: "INSERT INTO contacts (name, email, company, phone, message) VALUES (?, ?, ?, ?, ?)",
      args: [name, email, company, phone, message],
    });
  } catch (dbErr) {
    console.error("Turso DB Error:", dbErr);
    // We continue execution to send the email even if DB insertion fails
  }

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 24px; border-radius: 12px 12px 0 0;">
        <h2 style="color: #2dd4bf; margin: 0; font-size: 22px;">🚀 New Expert Consultation Request</h2>
        <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">via ReguLattice Website</p>
      </div>
      <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px; width: 120px; vertical-align: top;"><strong>Name</strong></td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px; vertical-align: top;"><strong>Email</strong></td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;"><a href="mailto:${email}" style="color: #0d9488;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px; vertical-align: top;"><strong>Company</strong></td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;">${company || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px; vertical-align: top;"><strong>Phone / WhatsApp</strong></td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 14px;">${phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #64748b; font-size: 14px; vertical-align: top;"><strong>Message</strong></td>
            <td style="padding: 12px 0; color: #0f172a; font-size: 14px; white-space: pre-wrap;">${message}</td>
          </tr>
        </table>
      </div>
    </div>
  `;

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
        Subject: \`Expert Consultation Request from \${name}\`,
        TextPart: \`Name: \${name}\\nEmail: \${email}\\nCompany: \${company}\\nPhone/WhatsApp: \${phone}\\nMessage: \${message}\`,
        HTMLPart: htmlBody,
        ReplyTo: {
          Email: email,
          Name: name,
        },
      },
    ],
  };

  const MJ_API_KEY = "f2e0ab5af468c23789f8ef1bedfa2e59";
  const MJ_SECRET_KEY = "36fa567993ccd2023deb25df5ab198ee";

  try {
    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(\`\${MJ_API_KEY}:\${MJ_SECRET_KEY}\`).toString("base64"),
      },
      body: JSON.stringify(mailjetPayload),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error("Mailjet error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
