// src/components/CadastroEquipePanel.tsx

import { useState } from "react";

const CadastroEquipePanel = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [form, setForm] = useState({ nome: "", email: "", funcao: "", sobre: "", curriculo: null as File | null });
  const [enviado, setEnviado] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"> {/* Z-index mais alto para garantir que apareça acima de tudo */}
      <div className="bg-slate-800 rounded-xl shadow-2xl p-8 w-full max-w-md relative border border-emerald-600/30"> {/* Fundo escuro e borda sutil */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-emerald-400 text-3xl font-light leading-none transition-colors">×</button>
        <h4 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Junte-se à Equipe</h4> {/* Título com gradiente */}
        {enviado ? (
          <div className="text-center text-emerald-400 font-semibold text-lg py-8">
            <p className="mb-2">Cadastro enviado com sucesso!</p>
            <p className="text-sm text-gray-300">Agradecemos o seu interesse, entraremos em contato em breve.</p>
          </div>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={async e => {
              e.preventDefault();
              // Lógica de envio (você precisaria ajustar para lidar com 'curriculo' File)
              console.log("Formulário enviado:", form); // Substituir pela chamada real da API
              try {
                // Exemplo de como enviar um FormData com arquivo
                const formData = new FormData();
                for (const key in form) {
                  if (form[key as keyof typeof form]) {
                    formData.append(key, form[key as keyof typeof form] as string | Blob);
                  }
                }

                const res = await fetch("http://localhost:3001/api/contato", {
                  method: "POST",
                  // Não defina Content-Type para FormData, o navegador faz isso automaticamente
                  body: formData
                });
                if (res.ok) setEnviado(true);
                else alert("Erro ao enviar. Tente novamente.");
              } catch (error) {
                console.error("Erro ao enviar:", error);
                alert("Erro ao enviar. Tente novamente.");
              }
            }}
          >
            <input
              className="border border-slate-600 rounded px-4 py-2 bg-slate-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Nome completo"
              name="nome"
              value={form.nome}
              onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
              required
            />
            <input
              className="border border-slate-600 rounded px-4 py-2 bg-slate-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="E-mail"
              type="email"
              name="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
            <input
              className="border border-slate-600 rounded px-4 py-2 bg-slate-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Função desejada (ex: Produtor, Músico...)"
              name="funcao"
              value={form.funcao}
              onChange={e => setForm(f => ({ ...f, funcao: e.target.value }))}
              required
            />
            <textarea
              className="border border-slate-600 rounded px-4 py-2 min-h-[80px] bg-slate-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Conte um pouco sobre você (opcional)"
              name="sobre"
              value={form.sobre || ''}
              onChange={e => setForm(f => ({ ...f, sobre: e.target.value }))}
            />
            <label className="block text-gray-300 text-sm font-semibold mb-1">
              Anexar Currículo (PDF, DOCX, TXT)
              <input
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
                           file:rounded-full file:border-0 file:text-sm file:font-semibold
                           file:bg-emerald-600 file:text-white hover:file:bg-emerald-700
                           transition-colors cursor-pointer mt-1"
                type="file"
                name="curriculo"
                accept=".pdf,.doc,.docx,.odt,.txt"
                onChange={e => setForm(f => ({ ...f, curriculo: e.target.files?.[0] || null }))}
              />
            </label>
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-lg px-4 py-3 mt-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Enviar Inscrição
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CadastroEquipePanel;