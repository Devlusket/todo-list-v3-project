
// import fs from 'fs';
// import path from 'path';

// // Caminho para o arquivo metas.json
// const filePath = path.join(process.cwd(), 'data', 'metas.json');

// // Função para ler ou escrever no arquivo metas.json
// export default async function handler(req, res) {
//   try {
//     if (req.method === 'GET') {
//       // Tenta ler o arquivo metas.json
//       const data = await fs.promises.readFile(filePath, 'utf-8');
//       return res.status(200).json(JSON.parse(data));
//     }

//     if (req.method === 'POST') {
//       // Se for um POST, adicionar uma nova meta
//       const newMeta = req.body;
//       const data = await fs.promises.readFile(filePath, 'utf-8');
//       const metas = JSON.parse(data);
//       metas.push(newMeta);

//       await fs.promises.writeFile(filePath, JSON.stringify(metas, null, 2));
//       return res.status(201).json({ message: 'Meta adicionada com sucesso!' });
//     }

//     if (req.method === 'PUT') {
//       // Se for um PUT, atualizar as metas
//       const updatedMetas = req.body;
//       await fs.promises.writeFile(filePath, JSON.stringify(updatedMetas, null, 2));
//       return res.status(200).json({ message: 'Metas atualizadas com sucesso!' });
//     }

//     if (req.method === 'DELETE') {
//       // Se for um DELETE, remover metas selecionadas
//       const { valuesToDelete } = req.body;
//       const data = await fs.promises.readFile(filePath, 'utf-8');
//       let metas = JSON.parse(data);

//       metas = metas.filter(meta => !valuesToDelete.includes(meta.value));
//       await fs.promises.writeFile(filePath, JSON.stringify(metas, null, 2));

//       return res.status(200).json({ message: 'Metas deletadas com sucesso!' });
//     }

//     return res.status(405).json({ message: 'Método não permitido' });
//   } catch (error) {
//     console.error('Erro ao manipular metas:', error);
//     return res.status(500).json({ message: 'Erro ao acessar as metas.' });
//   }
// }



// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_ANON_KEY
// );

// export default async function handler(req, res) {
//   try {
//     if (req.method === 'GET') {
//       const { data, error } = await supabase
//         .from('metas')
//         .select('*')
//         .order('id', { ascending: false });

//       if (error) return res.status(500).json({ error: error.message });
//       return res.status(200).json(data);
//     }

//     if (req.method === 'POST') {
//       const { value } = req.body;

//       if (!value || typeof value !== 'string') {
//         return res.status(400).json({ error: 'Meta inválida' });
//       }

//       const { error } = await supabase
//         .from('metas')
//         .insert([{ value }]);

//       if (error) return res.status(500).json({ error: error.message });
//       return res.status(201).json({ message: 'Meta adicionada com sucesso' });
//     }

//     if (req.method === 'PUT') {
//       const metasAtualizadas = req.body;

//       if (!Array.isArray(metasAtualizadas)) {
//         return res.status(400).json({ error: 'Formato inválido' });
//       }

//       const updates = metasAtualizadas.map((meta) =>
//         supabase
//           .from('metas')
//           .update({ checked: meta.checked })
//           .eq('value', meta.value)
//       );

//       const results = await Promise.all(updates);
//       const erro = results.find(r => r.error);
//       if (erro) {
//         return res.status(500).json({ error: erro.error.message });
//       }

//       return res.status(200).json({ message: 'Metas atualizadas' });
//     }

//     if (req.method === 'DELETE') {
//       const { valuesToDelete } = req.body;

//       if (!Array.isArray(valuesToDelete)) {
//         return res.status(400).json({ error: 'Formato inválido para deletar' });
//       }

//       const { error } = await supabase
//         .from('metas')
//         .delete()
//         .in('value', valuesToDelete);

//       if (error) return res.status(500).json({ error: error.message });
//       return res.status(200).json({ message: 'Metas deletadas com sucesso' });
//     }

//     return res.status(405).json({ error: 'Método não permitido' });
//   } catch (err) {
//     console.error('Erro na API de metas:', err);
//     return res.status(500).json({ error: 'Erro interno do servidor' });
//   }
// }



// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_ANON_KEY
// );

// export default async function handler(req, res) {
//   try {
//     if (req.method === 'GET') {
//       const { data, error } = await supabase
//         .from('metas')
//         .select('*')
//         .order('id', { ascending: false });

//       if (error) return res.status(500).json({ error: error.message });
//       return res.status(200).json(data);
//     }

//     if (req.method === 'POST') {
//       const { value } = req.body;

//       if (!value || typeof value !== 'string') {
//         return res.status(400).json({ error: 'Meta inválida' });
//       }

//       const { error } = await supabase
//         .from('metas')
//         .insert([{ value, checked: false }]);

//       if (error) return res.status(500).json({ error: error.message });
//       return res.status(201).json({ message: 'Meta adicionada com sucesso' });
//     }

//     if (req.method === 'PUT') {
//       const metasAtualizadas = req.body;

//       if (!Array.isArray(metasAtualizadas)) {
//         return res.status(400).json({ error: 'Formato inválido' });
//       }

//       const updates = metasAtualizadas.map((meta) =>
//         supabase
//           .from('metas')
//           .update({ checked: meta.checked })
//           .eq('id', meta.id)
//       );

//       const results = await Promise.all(updates);
//       const erro = results.find(r => r.error);
//       if (erro) {
//         return res.status(500).json({ error: erro.error.message });
//       }

//       return res.status(200).json({ message: 'Metas atualizadas' });
//     }

//     if (req.method === 'DELETE') {
//       const { idsToDelete } = req.body;

//       if (!Array.isArray(idsToDelete)) {
//         return res.status(400).json({ error: 'Formato inválido para deletar' });
//       }

//       const { error } = await supabase
//         .from('metas')
//         .delete()
//         .in('id', idsToDelete);

//       if (error) return res.status(500).json({ error: error.message });
//       return res.status(200).json({ message: 'Metas deletadas com sucesso' });
//     }

//     return res.status(405).json({ error: 'Método não permitido' });
//   } catch (err) {
//     console.error('Erro na API de metas:', err);
//     return res.status(500).json({ error: 'Erro interno do servidor' });
//   }
// }

// Usando Prisma com banco de dados PostgreSQL
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // ================= GET =================
    if (req.method === 'GET') {
      const metas = await prisma.metas.findMany({
        orderBy: { id: 'desc' },
      });
      return res.status(200).json(metas);
    }

    // ================= POST =================
    if (req.method === 'POST') {
      const { value } = req.body;

      if (!value || typeof value !== 'string') {
        return res.status(400).json({ error: 'Meta inválida' });
      }

      const novaMeta = await prisma.metas.create({
        data: {
          value,
          checked: false,
        },
      });

      return res.status(201).json(novaMeta);
    }

    // ================= PUT =================
    if (req.method === 'PUT') {
      const metasAtualizadas = req.body;

      if (!Array.isArray(metasAtualizadas)) {
        return res.status(400).json({ error: 'Formato inválido' });
      }

      const updates = metasAtualizadas.map((meta) =>
        prisma.metas.update({
          where: { id: meta.id },
          data: { checked: meta.checked },
        })
      );

      await Promise.all(updates);

      return res.status(200).json({ message: 'Metas atualizadas' });
    }

    // ================= DELETE =================
    if (req.method === 'DELETE') {
      const { idsToDelete } = req.body;

      if (!Array.isArray(idsToDelete)) {
        return res.status(400).json({ error: 'Formato inválido para deletar' });
      }

      await prisma.metas.deleteMany({
        where: { id: { in: idsToDelete } },
      });

      return res.status(200).json({ message: 'Metas deletadas com sucesso' });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (err) {
    console.error('Erro na API de metas:', err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
