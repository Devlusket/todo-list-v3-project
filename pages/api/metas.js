// import path from 'path';
import fs from 'fs/promises';

// Caminho para o arquivo metas.json
const filePath = path.join(process.cwd(), 'data', 'metas.json');

// Função de manipulação das rotas
export default async function handler(req, res) {
  try {
    // GET: Retorna as metas
    if (req.method === 'GET') {
      const data = await fs.readFile(filePath, 'utf-8');
      return res.status(200).json(JSON.parse(data));
    }

    // POST: Adiciona uma nova meta
    if (req.method === 'POST') {
      const { value } = req.body;
      if (!value) {
        return res.status(400).json({ error: 'Meta inválida' });
      }

      const data = await fs.readFile(filePath, 'utf-8');
      const metas = JSON.parse(data);
      metas.push({ value, checked: false });
      await fs.writeFile(filePath, JSON.stringify(metas, null, 2));
      return res.status(201).json({ message: 'Meta criada com sucesso!' });
    }

    // PUT: Atualiza as metas
    if (req.method === 'PUT') {
      const metasAtualizadas = req.body;
      await fs.writeFile(filePath, JSON.stringify(metasAtualizadas, null, 2));
      return res.status(200).json({ message: 'Metas atualizadas com sucesso!' });
    }

    // DELETE: Deleta as metas selecionadas
    if (req.method === 'DELETE') {
      const { valuesToDelete } = req.body;
      const data = await fs.readFile(filePath, 'utf-8');
      let metas = JSON.parse(data);
      metas = metas.filter(meta => !valuesToDelete.includes(meta.value));
      await fs.writeFile(filePath, JSON.stringify(metas, null, 2));
      return res.status(200).json({ message: 'Metas deletadas com sucesso!' });
    }

    // Método não permitido
    res.status(405).json({ error: 'Método não permitido' });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
}
