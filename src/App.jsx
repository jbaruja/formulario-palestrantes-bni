import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Upload } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    nomePalestrante: '',
    dataPalestra: '',
    nomeEmpresa: '',
    cadeiraBNI: '',
    redesSociais: '',
    minibiografia: '',
    tituloPalestra: '',
    cidadeNascimento: '',
    cidadeResidencia: '',
    tempoResidencia: '',
    profissao: '',
    anosExperiencia: '',
    filhoDe: '',
    temFilhos: '',
    nomeFilhos: '',
    temMascote: '',
    nomeMascote: '',
    grandeSonho: '',
    hobbies: '',
    segredo: '',
    chaveSucesso: '',
    musicaPreferencia: '',
    apresentacaoTemVideo: '',
    slideVideo: '',
    precisaMaisArquivos: '',
    observacoesArquivo2: '',
    observacoesArquivo3: '',
    confirmacaoHorario: false,
  });

  const [files, setFiles] = useState({
    foto: null,
    apresentacao: null,
    videos: null,
    arquivo2: null,
    arquivo3: null,
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({
        ...prev,
        [fieldName]: file
      }));
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Validação básica
      if (!formData.nomePalestrante || !formData.dataPalestra || !formData.nomeEmpresa || 
          !formData.cadeiraBNI || !formData.redesSociais || !formData.tituloPalestra ||
          !formData.cidadeNascimento || !formData.cidadeResidencia || !formData.tempoResidencia ||
          !formData.profissao || !formData.anosExperiencia || !formData.filhoDe ||
          !formData.temFilhos || !formData.temMascote || !formData.grandeSonho ||
          !formData.hobbies || !formData.segredo || !formData.chaveSucesso ||
          !formData.apresentacaoTemVideo || !formData.precisaMaisArquivos ||
          !formData.confirmacaoHorario) {
        setStatus({ 
          type: 'error', 
          message: 'Por favor, preencha todos os campos obrigatórios.' 
        });
        setLoading(false);
        return;
      }

      // Preparar dados para envio
      const payload = {
        ...formData,
        timestamp: new Date().toISOString(),
        arquivos: {}
      };

      // Converter arquivos para base64 se existirem
      for (const [key, file] of Object.entries(files)) {
        if (file) {
          try {
            const base64 = await convertFileToBase64(file);
            payload.arquivos[key] = {
              nome: file.name,
              tipo: file.type,
              tamanho: file.size,
              conteudo: base64
            };
          } catch (error) {
            console.error(`Erro ao converter arquivo ${key}:`, error);
          }
        }
      }

      // Enviar para o webhook
      const response = await fetch('https://newbaru.up.railway.app/webhook/New31dc5023-02bd-4ab3-85e5-b4525902bf1e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Formulário enviado com sucesso! Obrigado pelo seu cadastro.' 
        });
        // Limpar formulário
        setFormData({
          nomePalestrante: '',
          dataPalestra: '',
          nomeEmpresa: '',
          cadeiraBNI: '',
          redesSociais: '',
          minibiografia: '',
          tituloPalestra: '',
          cidadeNascimento: '',
          cidadeResidencia: '',
          tempoResidencia: '',
          profissao: '',
          anosExperiencia: '',
          filhoDe: '',
          temFilhos: '',
          nomeFilhos: '',
          temMascote: '',
          nomeMascote: '',
          grandeSonho: '',
          hobbies: '',
          segredo: '',
          chaveSucesso: '',
          musicaPreferencia: '',
          apresentacaoTemVideo: '',
          slideVideo: '',
          precisaMaisArquivos: '',
          observacoesArquivo2: '',
          observacoesArquivo3: '',
          confirmacaoHorario: false,
        });
        setFiles({
          foto: null,
          apresentacao: null,
          videos: null,
          arquivo2: null,
          arquivo3: null,
        });
      } else {
        throw new Error('Erro ao enviar formulário');
      }
    } catch (error) {
      console.error('Erro:', error);
      setStatus({ 
        type: 'error', 
        message: 'Erro ao enviar formulário. Por favor, tente novamente.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-indigo-900 mb-6 text-center">
          Formulário do Palestrante
        </h1>

        <div className="space-y-6">
          {/* Nome do Palestrante */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Palestrante <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nomePalestrante"
              value={formData.nomePalestrante}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Data da Palestra */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data da sua Palestra <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dataPalestra"
              value={formData.dataPalestra}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Nome da Empresa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Empresa <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nomeEmpresa"
              value={formData.nomeEmpresa}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Cadeira BNI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cadeira que ocupa no BNI <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="cadeiraBNI"
              value={formData.cadeiraBNI}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Redes Sociais */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              @ das redes sociais para divulgação <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="redesSociais"
              value={formData.redesSociais}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="@seu_usuario"
              required
            />
          </div>

          {/* Upload Foto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto em Alta Resolução
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Certifique-se de que não haja objetos à sua frente ou ao fundo que possam dificultar o recorte da imagem. (Máx: 100MB)
            </p>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition">
                <Upload size={20} />
                Escolher Arquivo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'foto')}
                  className="hidden"
                />
              </label>
              {files.foto && (
                <span className="text-sm text-gray-600">{files.foto.name}</span>
              )}
            </div>
          </div>

          {/* Minibiografia */}
          <div className="mt-6">
            <label className="block text-base font-medium text-gray-700 mb-2">
              Minibiografia do Palestrante
            </label>
            
          </div>

          {/* Título da Palestra */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título ou Tema da Palestra <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="tituloPalestra"
              value={formData.tituloPalestra}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Cidade de Nascimento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cidade e Estado de nascimento <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="cidadeNascimento"
              value={formData.cidadeNascimento}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Ex: São Paulo, SP"
              required
            />
          </div>

          {/* Cidade onde reside */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cidade onde reside <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="cidadeResidencia"
              value={formData.cidadeResidencia}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Tempo de Residência */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mora há quantos anos <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="tempoResidencia"
              value={formData.tempoResidencia}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Profissão */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qual é a profissão <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="profissao"
              value={formData.profissao}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Anos de Experiência */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantos anos de experiência <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="anosExperiencia"
              value={formData.anosExperiencia}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Filho de */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              É filho ou filha de <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="filhoDe"
              value={formData.filhoDe}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Tem filhos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tem filhos? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="temFilhos"
                  value="Sim"
                  checked={formData.temFilhos === 'Sim'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Sim
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="temFilhos"
                  value="Não"
                  checked={formData.temFilhos === 'Não'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Não
              </label>
            </div>
          </div>

          {/* Nome dos filhos (condicional) */}
          {formData.temFilhos === 'Sim' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome dos filhos
              </label>
              <input
                type="text"
                name="nomeFilhos"
                value={formData.nomeFilhos}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Tem mascote */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tem mascote? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="temMascote"
                  value="Sim"
                  checked={formData.temMascote === 'Sim'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Sim
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="temMascote"
                  value="Não"
                  checked={formData.temMascote === 'Não'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Não
              </label>
            </div>
          </div>

          {/* Nome do mascote (condicional) */}
          {formData.temMascote === 'Sim' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do mascote
              </label>
              <input
                type="text"
                name="nomeMascote"
                value={formData.nomeMascote}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Grande Sonho */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seu grande sonho <span className="text-red-500">*</span>
            </label>
            <textarea
              name="grandeSonho"
              value={formData.grandeSonho}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Hobbies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hobbies e interesses <span className="text-red-500">*</span>
            </label>
            <textarea
              name="hobbies"
              value={formData.hobbies}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Segredo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              O que ninguém sabe sobre você <span className="text-red-500">*</span>
            </label>
            <textarea
              name="segredo"
              value={formData.segredo}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Chave para o Sucesso */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chave para o sucesso <span className="text-red-500">*</span>
            </label>
            <textarea
              name="chaveSucesso"
              value={formData.chaveSucesso}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Música de Preferência */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Música de preferência para sua apresentação pela ST
            </label>
            <input
              type="text"
              name="musicaPreferencia"
              value={formData.musicaPreferencia}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Upload Apresentação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Material da Apresentação <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Envie sua apresentação. Sugerimos no formato PDF no tamanho Widescreen (16:9) - Máx: 600MB
            </p>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition">
                <Upload size={20} />
                Escolher Arquivo
                <input
                  type="file"
                  accept=".pdf,.ppt,.pptx"
                  onChange={(e) => handleFileChange(e, 'apresentacao')}
                  className="hidden"
                />
              </label>
              {files.apresentacao && (
                <span className="text-sm text-gray-600">{files.apresentacao.name}</span>
              )}
            </div>
          </div>

          {/* Apresentação contém vídeo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sua apresentação contém vídeo? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="apresentacaoTemVideo"
                  value="Sim"
                  checked={formData.apresentacaoTemVideo === 'Sim'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Sim
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="apresentacaoTemVideo"
                  value="Não"
                  checked={formData.apresentacaoTemVideo === 'Não'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Não
              </label>
            </div>
          </div>

          {/* Campos condicionais para vídeo */}
          {formData.apresentacaoTemVideo === 'Sim' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anexe os vídeos
                </label>
                <p className="text-xs text-gray-500 mb-2">Máx: 900MB</p>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition">
                    <Upload size={20} />
                    Escolher Vídeo
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange(e, 'videos')}
                      className="hidden"
                    />
                  </label>
                  {files.videos && (
                    <span className="text-sm text-gray-600">{files.videos.name}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Indique em qual slide de sua apresentação o vídeo deve ser inserido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="slideVideo"
                  value={formData.slideVideo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Slide 5"
                  required
                />
              </div>
            </>
          )}

          {/* Precisa adicionar mais arquivos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precisa adicionar mais arquivos? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="precisaMaisArquivos"
                  value="Sim"
                  checked={formData.precisaMaisArquivos === 'Sim'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Sim
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="precisaMaisArquivos"
                  value="Não"
                  checked={formData.precisaMaisArquivos === 'Não'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Não
              </label>
            </div>
          </div>

          {/* Campos condicionais para mais arquivos */}
          {formData.precisaMaisArquivos === 'Sim' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arquivo 2
                </label>
                <p className="text-xs text-gray-500 mb-2">Máx: 500MB</p>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition">
                    <Upload size={20} />
                    Escolher Arquivo
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'arquivo2')}
                      className="hidden"
                    />
                  </label>
                  {files.arquivo2 && (
                    <span className="text-sm text-gray-600">{files.arquivo2.name}</span>
                  )}
                </div>
                <input
                  type="text"
                  name="observacoesArquivo2"
                  value={formData.observacoesArquivo2}
                  onChange={handleInputChange}
                  placeholder="Observações sobre o arquivo 2"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arquivo 3
                </label>
                <p className="text-xs text-gray-500 mb-2">Máx: 500MB</p>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition">
                    <Upload size={20} />
                    Escolher Arquivo
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'arquivo3')}
                      className="hidden"
                    />
                  </label>
                  {files.arquivo3 && (
                    <span className="text-sm text-gray-600">{files.arquivo3.name}</span>
                  )}
                </div>
                <input
                  type="text"
                  name="observacoesArquivo3"
                  value={formData.observacoesArquivo3}
                  onChange={handleInputChange}
                  placeholder="Observações sobre o arquivo 3"
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          {/* Confirmação de Horário */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                name="confirmacaoHorario"
                checked={formData.confirmacaoHorario}
                onChange={handleInputChange}
                className="mt-1 mr-3 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                required
              />
              <span className="text-sm text-gray-700">
                Declaro estar ciente da necessidade de comparecimento às 6:15h para a realização dos testes técnicos de minha apresentação <span className="text-red-500">*</span>
              </span>
            </label>
          </div>

          {/* Mensagens de Status */}
          {status.message && (
            <div className={`p-4 rounded-lg flex items-start gap-3 ${
              status.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {status.type === 'success' ? (
                <CheckCircle2 className="flex-shrink-0" size={20} />
              ) : (
                <AlertCircle className="flex-shrink-0" size={20} />
              )}
              <p className="text-sm">{status.message}</p>
            </div>
          )}

          {/* Botão Enviar */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white transition ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-98'
            }`}
          >
            {loading ? 'Enviando...' : 'Enviar Formulário'}
          </button>
        </div>
      </div>
    </div>
  );
}
