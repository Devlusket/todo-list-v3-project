// import { useEffect, useState } from 'react';

// export default function Home() {
//   const [metas, setMetas] = useState([]);
//   const [novaMeta, setNovaMeta] = useState('');
//   const [mensagem, setMensagem] = useState('');

//   useEffect(() => {
//     fetchMetas();
//   }, []);

//   const fetchMetas = async () => {
//     const res = await fetch('/api/metas');
//     const data = await res.json();
//     setMetas(data);
//   };

//   const adicionarMeta = async () => {
//     if (!novaMeta.trim()) {
//       setMensagem('Meta inválida!');
//       return;
//     }
//     await fetch('/api/metas', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ value: novaMeta }),
//     });
//     setNovaMeta('');
//     setMensagem('Meta adicionada com sucesso!');
//     fetchMetas();
//   };

//   const toggleCheck = (value) => {
//     const atualizadas = metas.map(meta =>
//       meta.value === value ? { ...meta, checked: !meta.checked } : meta
//     );
//     atualizarMetas(atualizadas);
//   };

//   const atualizarMetas = async (metasAtualizadas) => {
//     await fetch('/api/metas', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(metasAtualizadas),
//     });
//     fetchMetas();
//   };

//   const deletarSelecionadas = async () => {
//     const paraDeletar = metas.filter(meta => meta.checked).map(meta => meta.value);
//     if (paraDeletar.length === 0) {
//       setMensagem('Nenhuma meta selecionada para deletar');
//       return;
//     }
//     await fetch('/api/metas', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ valuesToDelete: paraDeletar }),
//     });
//     setMensagem('Metas deletadas com sucesso!');
//     fetchMetas();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
//       <div className="w-full max-w-xl bg-white rounded shadow p-6">
//         <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">📋 App de Metas</h1>

//         {mensagem && <p className="mb-4 text-green-600 font-medium">{mensagem}</p>}

//         <div className="flex gap-2 mb-6">
//           <input
//             type="text"
//             value={novaMeta}
//             onChange={(e) => setNovaMeta(e.target.value)}
//             placeholder="Digite uma nova meta"
//             className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={adicionarMeta}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Adicionar
//           </button>
//         </div>

//         <h2 className="text-xl font-semibold mb-2">Minhas Metas</h2>
//         <ul className="space-y-2 mb-4">
//           {metas.map((meta) => (
//             <li key={meta.value} className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={meta.checked}
//                 onChange={() => toggleCheck(meta.value)}
//                 className="h-4 w-4"
//               />
//               <span className={`${meta.checked ? 'line-through text-gray-500' : ''}`}>
//                 {meta.value}
//               </span>
//             </li>
//           ))}
//         </ul>

//         <button
//           onClick={deletarSelecionadas}
//           className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
//         >
//           🗑 Deletar Selecionadas
//         </button>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';

export default function Home() {
  const [metas, setMetas] = useState([]);
  const [novaMeta, setNovaMeta] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Carregar metas ao montar o componente
  useEffect(() => {
    fetchMetas();
  }, []);

  // Função para carregar as metas
  const fetchMetas = async () => {
    const res = await fetch('/api/metas');
    const data = await res.json();
    setMetas(data);
  };

  // Função para adicionar nova meta
  const adicionarMeta = async () => {
    if (!novaMeta.trim()) {
      setMensagem('Meta inválida!');
      return;
    }

    // Enviar nova meta para a API
    await fetch('/api/metas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: novaMeta }),
    });

    setNovaMeta('');
    setMensagem('Meta adicionada com sucesso!');
    fetchMetas(); // Recarregar metas
  };

  // Função para marcar/desmarcar uma meta
  const toggleCheck = (value) => {
    const atualizadas = metas.map(meta =>
      meta.value === value ? { ...meta, checked: !meta.checked } : meta
    );
    setMetas(atualizadas); // Atualiza localmente
    atualizarMetas(atualizadas); // Envia a atualização para a API
  };

  // Função para atualizar metas na API
  const atualizarMetas = async (metasAtualizadas) => {
    await fetch('/api/metas', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metasAtualizadas),
    });
  };

  // Função para deletar metas selecionadas
  const deletarSelecionadas = async () => {
    const paraDeletar = metas.filter(meta => meta.checked).map(meta => meta.value);
    if (paraDeletar.length === 0) {
      setMensagem('Nenhuma meta selecionada para deletar');
      return;
    }

    await fetch('/api/metas', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ valuesToDelete: paraDeletar }),
    });

    // Remover metas deletadas localmente
    const novasMetas = metas.filter(meta => !meta.checked);
    setMetas(novasMetas);
    setMensagem('Metas deletadas com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">📋 App de Metas</h1>

        {mensagem && (
          <p className="mb-4 text-green-600 font-medium">
            {mensagem}
          </p>
        )}

        {/* Input de nova meta */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={novaMeta}
            onChange={(e) => setNovaMeta(e.target.value)}
            placeholder="Digite uma nova meta"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-black"
          />
          <button
            onClick={adicionarMeta}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
          >
            Adicionar
          </button>
        </div>

        {/* Lista de metas */}
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Minhas Metas</h2>
        <ul className="space-y-2 mb-4">
          {metas.map((meta) => (
            <li key={meta.value} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={meta.checked}
                onChange={() => toggleCheck(meta.value)}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span
                className={`text-lg ${meta.checked ? 'line-through text-gray-400' : 'text-gray-800'}`}
              >
                {meta.value}
              </span>
            </li>
          ))}
        </ul>

        {/* Botão de deletar metas selecionadas */}
        <button
          onClick={deletarSelecionadas}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all duration-200"
        >
          🗑 Deletar Selecionadas
        </button>
      </div>
    </div>
  );
}
