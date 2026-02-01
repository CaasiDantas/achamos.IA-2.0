let locations = {};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, lat, lng } = req.body;

    if (!email || !lat || !lng) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    locations[email] = {
      lat,
      lng,
      date: new Date().toISOString()
    };

    return res.json({ success: true });
  }

  if (req.method === 'GET') {
    return res.json(locations);
  }

  res.status(405).json({ error: 'Método não permitido' });
}
