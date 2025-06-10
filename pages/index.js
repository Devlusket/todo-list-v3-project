
// import { useEffect, useState } from 'react';

// export default function Home() {
//   const [metas, setMetas] = useState([]);
//   const [novaMeta, setNovaMeta] = useState('');
//   const [mensagem, setMensagem] = useState('');
//   const [tipoMensagem, setTipoMensagem] = useState('success'); // 'success' ou 'error'
//   const [modoEscuro, setModoEscuro] = useState(false);

//   const alternarModo = () => {
//     const root = window.document.documentElement;
//     root.classList.toggle('dark');
//     setModoEscuro(root.classList.contains('dark'));
//   };
//   // Alternar entre modo claro e escuro  


//   // Carregar metas ao montar o componente
//   useEffect(() => {
//     fetchMetas();
  
//     // Detectar modo escuro já ativado (ex: após reload)
//     const isDark = document.documentElement.classList.contains('dark');
//     setModoEscuro(isDark);
//   }, []);
  

//   // Função para carregar as metas
//   const fetchMetas = async () => {
//     const res = await fetch('/api/metas');
//     const data = await res.json();
//     setMetas(data);
//   };

//   // Função para adicionar nova meta
//   const adicionarMeta = async () => {
//     if (!novaMeta.trim()) {
//       setMensagem('Meta inválida!');
//       setTipoMensagem('error');
//       return;
//     }
//     setMensagem('Meta adicionada com sucesso!');
//     setTipoMensagem('success');

//     // Enviar nova meta para a API
//     await fetch('/api/metas', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ value: novaMeta }),
//     });

//     setNovaMeta('');
//     setMensagem('Meta adicionada com sucesso!');
//     fetchMetas(); // Recarregar metas
//   };

//   // Função para marcar/desmarcar uma meta
//   const toggleCheck = (value) => {
//     const atualizadas = metas.map(meta =>
//       meta.value === value ? { ...meta, checked: !meta.checked } : meta
//     );
//     setMetas(atualizadas); // Atualiza localmente
//     atualizarMetas(atualizadas); // Envia a atualização para a API
//   };

//   // Função para atualizar metas na API
//   const atualizarMetas = async (metasAtualizadas) => {
//     await fetch('/api/metas', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(metasAtualizadas),
//     });
//   };

//   // Função para deletar metas selecionadas
//   const deletarSelecionadas = async () => {
//     const paraDeletar = metas.filter(meta => meta.checked).map(meta => meta.value);
//     if (paraDeletar.length === 0) {
//       setMensagem('Nenhuma meta selecionada para deletar');
//       setTipoMensagem('error');
//       return;
//     }
//     setMensagem('Metas deletadas com sucesso!');
//     setTipoMensagem('success');

//     await fetch('/api/metas', {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ valuesToDelete: paraDeletar }),
//     });

//     // Remover metas deletadas localmente
//     const novasMetas = metas.filter(meta => !meta.checked);
//     setMetas(novasMetas);
//     setMensagem('Metas deletadas com sucesso!');
//   };

//   return (
//     <div className={`${modoEscuro ? 'bg-gray-900' : 'bg-gray-200'} min-h-screen flex items-center justify-center py-10 px-4 transition-colors`}>
      
//       {/* Botão de alternância de tema */}
//       <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
//         <button
//           onClick={alternarModo}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-all"
//         >
//           {modoEscuro ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
//         </button>
//       </div>
  
//       <div className={`${modoEscuro ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} w-full max-w-md sm:max-w-xl rounded-lg shadow-lg p-4 sm:p-6 transition-colors duration-300`}>
        
//         <h1 className={`${modoEscuro ? 'text-indigo-400' : 'text-indigo-600'} text-2xl sm:text-3xl font-bold mb-4 text-center`}>
//           📋 App de Metas
//         </h1>
  
//         {mensagem && (
//           <p className={`mb-4 font-medium ${tipoMensagem === 'error' 
//             ? (modoEscuro ? 'text-red-400' : 'text-red-600') 
//             : (modoEscuro ? 'text-green-400' : 'text-green-600')}`}>
//             {mensagem}
//           </p>
//         )}
  
//         {/* Input de nova meta */}
//         <div className="flex flex-col sm:flex-row gap-2 mb-6">
//           <input
//             type="text"
//             value={novaMeta}
//             onChange={(e) => setNovaMeta(e.target.value)}
//             placeholder="Digite uma nova meta"
//             className={`flex-1 border ${modoEscuro ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
//           />
//           <button
//             onClick={adicionarMeta}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
//           >
//             Adicionar
//           </button>
//         </div>
  
//         {/* Lista de metas */}
//         <h2 className="text-lg sm:text-xl font-semibold mb-2">Minhas Metas</h2>
//         <ul className="space-y-2 mb-4">
//           {metas.map((meta) => (
//             <li key={meta.value} className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={meta.checked}
//                 onChange={() => toggleCheck(meta.value)}
//                 className="h-5 w-5 text-indigo-600 border-gray-300 rounded dark:border-gray-600"
//               />
//               <span className={`text-base sm:text-lg ${meta.checked 
//                 ? (modoEscuro ? 'line-through text-gray-500' : 'line-through text-gray-400') 
//                 : (modoEscuro ? 'text-gray-100' : 'text-gray-800')}`}>
//                 {meta.value}
//               </span>
//             </li>
//           ))}
//         </ul>
  
//         {/* Botão de deletar metas selecionadas */}
//         <button
//           onClick={deletarSelecionadas}
//           className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all duration-200"
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
  const [tipoMensagem, setTipoMensagem] = useState('success'); // 'success' ou 'error'
  const [modoEscuro, setModoEscuro] = useState(false);

  const alternarModo = () => {
    const root = window.document.documentElement;
    root.classList.toggle('dark');
    setModoEscuro(root.classList.contains('dark'));
  };

  useEffect(() => {
    fetchMetas();

    const isDark = document.documentElement.classList.contains('dark');
    setModoEscuro(isDark);
  }, []);

  const fetchMetas = async () => {
    const res = await fetch('/api/metas');
    const data = await res.json();
    setMetas(data);
  };

  const adicionarMeta = async () => {
    if (!novaMeta.trim()) {
      setMensagem('Meta inválida!');
      setTipoMensagem('error');
      return;
    }

    // Enviar nova meta para a API
    const res = await fetch('/api/metas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: novaMeta }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setMensagem(`Erro: ${errorData.error || 'Erro ao adicionar meta'}`);
      setTipoMensagem('error');
      return;
    }

    setNovaMeta('');
    setMensagem('Meta adicionada com sucesso!');
    setTipoMensagem('success');
    fetchMetas();
  };

  // Marca/desmarca meta usando o id
  const toggleCheck = (id) => {
    const atualizadas = metas.map(meta =>
      meta.id === id ? { ...meta, checked: !meta.checked } : meta
    );
    setMetas(atualizadas);
    atualizarMetas(atualizadas);
  };

  const atualizarMetas = async (metasAtualizadas) => {
    const res = await fetch('/api/metas', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metasAtualizadas),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setMensagem(`Erro: ${errorData.error || 'Erro ao atualizar metas'}`);
      setTipoMensagem('error');
    }
  };

  const deletarSelecionadas = async () => {
    const idsParaDeletar = metas.filter(meta => meta.checked).map(meta => meta.id);

    if (idsParaDeletar.length === 0) {
      setMensagem('Nenhuma meta selecionada para deletar');
      setTipoMensagem('error');
      return;
    }

    const res = await fetch('/api/metas', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idsToDelete: idsParaDeletar }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      setMensagem(`Erro: ${errorData.error || 'Erro ao deletar metas'}`);
      setTipoMensagem('error');
      return;
    }

    const novasMetas = metas.filter(meta => !meta.checked);
    setMetas(novasMetas);
    setMensagem('Metas deletadas com sucesso!');
    setTipoMensagem('success');
  };

  return (
    <div className={`${modoEscuro ? 'bg-gray-900' : 'bg-gray-200'} min-h-screen flex items-center justify-center py-10 px-4 transition-colors`}>
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <button
          onClick={alternarModo}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-all"
        >
          {modoEscuro ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
        </button>
      </div>

      <div className={`${modoEscuro ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} w-full max-w-md sm:max-w-xl rounded-lg shadow-lg p-4 sm:p-6 transition-colors duration-300`}>
        <h1 className={`${modoEscuro ? 'text-indigo-400' : 'text-indigo-600'} text-2xl sm:text-3xl font-bold mb-4 text-center`}>
          📋 App de Metas
        </h1>

        {mensagem && (
          <p className={`mb-4 font-medium text-center ${tipoMensagem === 'error' 
            ? (modoEscuro ? 'text-red-400' : 'text-red-600') 
            : (modoEscuro ? 'text-green-400' : 'text-green-600')}`}>
            {mensagem}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            value={novaMeta}
            onChange={(e) => setNovaMeta(e.target.value)}
            placeholder="Digite uma nova meta"
            className={`flex-1 border ${modoEscuro ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
          />
          <button
            onClick={adicionarMeta}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
          >
            Adicionar
          </button>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold mb-2">Minhas Metas</h2>
        <ul className="space-y-2 mb-4">
          {metas.map((meta) => (
            <li key={meta.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={meta.checked || false}
                onChange={() => toggleCheck(meta.id)}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded dark:border-gray-600"
              />
              <span className={`text-base sm:text-lg ${meta.checked 
                ? (modoEscuro ? 'line-through text-gray-500' : 'line-through text-gray-400') 
                : (modoEscuro ? 'text-gray-100' : 'text-gray-800')}`}>
                {meta.value}
              </span>
            </li>
          ))}
        </ul>

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

