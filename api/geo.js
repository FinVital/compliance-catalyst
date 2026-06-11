export default async function handler(req, res) {
  try {
    const resp = await fetch("https://ipapi.co/json/");
    if (!resp.ok) {
      throw new Error(`ipapi.co returned status ${resp.status}`);
    }
    const data = await resp.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Geo API error:", err);
    return res.status(200).json({
      ip: null,
      city: null,
      region: null,
      country_name: null
    });
  }
}
