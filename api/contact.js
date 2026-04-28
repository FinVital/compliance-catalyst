export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const MJ_API_KEY = "f2e0ab5af468c23789f8ef1bedfa2e59";
  const MJ_SECRET_KEY = "36fa567993ccd2023deb25df5ab198ee";

  try {
    const response = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${MJ_API_KEY}:${MJ_SECRET_KEY}`).toString("base64"),
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error("Mailjet error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
