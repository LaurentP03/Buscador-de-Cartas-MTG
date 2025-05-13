const express = require('express');
const path = require('path');
const fetch = require('node-fetch'); // Se estiver usando Node.js < 18, instale: npm install node-fetch

const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para buscar cartas através da API do Scryfall
app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Parâmetro de busca é obrigatório' });
    }
    
    const response = await fetch(`https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: `Erro na API Scryfall: ${response.status}` });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar cartas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Endpoint para autocompletar nomes de cartas
app.get('/api/autocomplete', async (req, res) => {
  try {
    const partial = req.query.q;
    if (!partial) {
      return res.status(400).json({ error: 'Parâmetro de busca é obrigatório' });
    }
    
    const response = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(partial)}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: `Erro na API Scryfall: ${response.status}` });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar sugestões:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});