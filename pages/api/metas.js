
import fs from 'fs';
import path from 'path';

// Caminho para o arquivo metas.json
const filePath = path.join(process.cwd(), 'data', 'metas.json');

// Função para ler ou escrever no arquivo metas.json
export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Tenta ler o arquivo metas.json
      const data = await fs.promises.readFile(filePath, 'utf-8');
      return res.status(200).json(JSON.parse(data));
    }

    if (req.method === 'POST') {
      // Se for um POST, adicionar uma nova meta
      const newMeta = req.body;
      const data = await fs.promises.readFile(filePath, 'utf-8');
      const metas = JSON.parse(data);
      metas.push(newMeta);

      await fs.promises.writeFile(filePath, JSON.stringify(metas, null, 2));
      return res.status(201).json({ message: 'Meta adicionada com sucesso!' });
    }

    if (req.method === 'PUT') {
      // Se for um PUT, atualizar as metas
      const updatedMetas = req.body;
      await fs.promises.writeFile(filePath, JSON.stringify(updatedMetas, null, 2));
      return res.status(200).json({ message: 'Metas atualizadas com sucesso!' });
    }

    if (req.method === 'DELETE') {
      // Se for um DELETE, remover metas selecionadas
      const { valuesToDelete } = req.body;
      const data = await fs.promises.readFile(filePath, 'utf-8');
      let metas = JSON.parse(data);

      metas = metas.filter(meta => !valuesToDelete.includes(meta.value));
      await fs.promises.writeFile(filePath, JSON.stringify(metas, null, 2));

      return res.status(200).json({ message: 'Metas deletadas com sucesso!' });
    }

    return res.status(405).json({ message: 'Método não permitido' });
  } catch (error) {
    console.error('Erro ao manipular metas:', error);
    return res.status(500).json({ message: 'Erro ao acessar as metas.' });
  }
}
