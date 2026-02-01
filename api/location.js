let locations = {}; // Armazenamento em memória (limpa ao reiniciar o servidor)

export default function handler(req, res) {
  // --- MENSAGEM POST: Recebe dados do usuário ---
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

  // --- MENSAGEM GET: Retorna todos os usuários para o painel ---
  if (req.method === 'GET') {
    return res.json(locations);
  }

  // --- MENSAGEM DELETE: Remove o card e o monitoramento ---
  if (req.method === 'DELETE') {
    const { email } = req.body;

    if (email && locations[email]) {
      delete locations[email]; // Apaga definitivamente da memória
      return res.json({ success: true, message: 'Removido com sucesso' });
    }
    
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  res.status(405).json({ error: 'Método não permitido' });
}