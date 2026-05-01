export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { sources, q, from, to } = req.query;
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    res.status(500).json({ status: 'error', message: 'API key not configured on server' });
    return;
  }

  let url = `https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${apiKey}`;
  if (q) url += `&q=${encodeURIComponent(q)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}
