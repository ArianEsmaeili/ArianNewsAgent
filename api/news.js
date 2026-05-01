export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { sources, q, from, to } = req.query;
  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/everything?sources=${sources}&q=${encodeURIComponent(q)}&pageSize=10&sortBy=publishedAt${from?`&from=${from}`:''}${to?`&to=${to}`:''}&&apiKey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}
