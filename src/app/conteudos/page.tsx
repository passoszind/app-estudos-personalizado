'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { obterUsuario, marcarConteudoConcluido, registrarQuizCompletado, atualizarPontos } from '@/lib/storage';
import { Usuario, Conteudo, Quiz } from '@/lib/types';
import { conteudos, quizzes } from '@/lib/data';
import { BookOpen, Play, CheckCircle, Award, X, ArrowLeft, Volume2 } from 'lucide-react';
import Link from 'next/link';

export default function ConteudosPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [conteudoSelecionado, setConteudoSelecionado] = useState<Conteudo | null>(null);
  const [quizAtivo, setQuizAtivo] = useState<Quiz | null>(null);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);

  useEffect(() => {
    const user = obterUsuario();
    if (!user) {
      router.push('/');
    } else {
      setUsuario(user);
    }
  }, [router]);

  if (!usuario) return null;

  const conteudosFiltrados = conteudos.filter(c => c.nivel === usuario.nivel);

  const iniciarQuiz = (conteudoId: string) => {
    const quiz = quizzes.find(q => q.conteudoId === conteudoId);
    if (quiz) {
      setQuizAtivo(quiz);
      setRespostas([]);
      setPerguntaAtual(0);
      setMostrarResultado(false);
      setPontuacao(0);
    }
  };

  const responderPergunta = (opcao: number) => {
    const novasRespostas = [...respostas, opcao];
    setRespostas(novasRespostas);

    if (perguntaAtual < (quizAtivo?.perguntas.length || 0) - 1) {
      setPerguntaAtual(perguntaAtual + 1);
    } else {
      finalizarQuiz(novasRespostas);
    }
  };

  const finalizarQuiz = (respostasFinais: number[]) => {
    if (!quizAtivo) return;

    let pontos = 0;
    respostasFinais.forEach((resposta, index) => {
      if (resposta === quizAtivo.perguntas[index].respostaCorreta) {
        pontos += quizAtivo.pontosPorAcerto;
      }
    });

    setPontuacao(pontos);
    setMostrarResultado(true);
    registrarQuizCompletado(quizAtivo.id, pontos);
    atualizarPontos(pontos);
    
    if (conteudoSelecionado) {
      marcarConteudoConcluido(conteudoSelecionado.id);
    }
  };

  const lerTexto = (texto: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'pt-BR';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Visualização de Lista de Conteúdos
  if (!conteudoSelecionado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16 gap-4">
              <Link href="/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-bold">Conteúdos</h1>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Explore os Conteúdos</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Materiais selecionados para o nível {usuario.nivel}
            </p>
          </div>

          {/* Matemática */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <div className="w-3 h-8 bg-blue-600 rounded-full" />
              Matemática
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conteudosFiltrados
                .filter(c => c.materia === 'matematica')
                .map(conteudo => (
                  <button
                    key={conteudo.id}
                    onClick={() => setConteudoSelecionado(conteudo)}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-left"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                        {conteudo.nivel}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg mb-2">{conteudo.titulo}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {conteudo.descricao}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                      Começar
                      <Play className="w-4 h-4" />
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* Português */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <div className="w-3 h-8 bg-purple-600 rounded-full" />
              Português
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conteudosFiltrados
                .filter(c => c.materia === 'portugues')
                .map(conteudo => (
                  <button
                    key={conteudo.id}
                    onClick={() => setConteudoSelecionado(conteudo)}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-left"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                        <BookOpen className="w-6 h-6 text-purple-600" />
                      </div>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                        {conteudo.nivel}
                      </span>
                    </div>
                    <h4 className="font-bold text-lg mb-2">{conteudo.titulo}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {conteudo.descricao}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
                      Começar
                      <Play className="w-4 h-4" />
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Visualização de Quiz
  if (quizAtivo && !mostrarResultado) {
    const pergunta = quizAtivo.perguntas[perguntaAtual];
    const cor = quizAtivo.materia === 'matematica' ? 'blue' : 'purple';

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pergunta {perguntaAtual + 1} de {quizAtivo.perguntas.length}
              </span>
              <span className={`text-sm font-medium text-${cor}-600`}>
                {Math.round(((perguntaAtual + 1) / quizAtivo.perguntas.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`bg-gradient-to-r from-${cor}-600 to-${cor}-400 h-2 rounded-full transition-all duration-300`}
                style={{ width: `${((perguntaAtual + 1) / quizAtivo.perguntas.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Pergunta */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">{pergunta.texto}</h2>

          {/* Opções */}
          <div className="space-y-3">
            {pergunta.opcoes.map((opcao, index) => (
              <button
                key={index}
                onClick={() => responderPergunta(index)}
                className={`w-full p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-left hover:border-${cor}-600 hover:bg-${cor}-50 dark:hover:bg-${cor}-900/20 transition-all font-medium`}
              >
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-${cor}-100 dark:bg-${cor}-900/30 text-${cor}-600 mr-3`}>
                  {String.fromCharCode(65 + index)}
                </span>
                {opcao}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Resultado do Quiz
  if (mostrarResultado && quizAtivo) {
    const acertos = respostas.filter((r, i) => r === quizAtivo.perguntas[i].respostaCorreta).length;
    const percentual = (acertos / quizAtivo.perguntas.length) * 100;
    const cor = quizAtivo.materia === 'matematica' ? 'blue' : 'purple';

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-${cor}-100 dark:bg-${cor}-900/30 mb-6`}>
            <Award className={`w-10 h-10 text-${cor}-600`} />
          </div>

          <h2 className="text-3xl font-bold mb-4">Quiz Concluído!</h2>
          
          <div className="mb-8">
            <div className="text-5xl font-bold mb-2">{percentual.toFixed(0)}%</div>
            <p className="text-gray-600 dark:text-gray-400">
              Você acertou {acertos} de {quizAtivo.perguntas.length} perguntas
            </p>
          </div>

          <div className={`p-6 bg-${cor}-50 dark:bg-${cor}-900/20 rounded-2xl mb-8`}>
            <div className="text-4xl font-bold mb-2">+{pontuacao} pontos</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Adicionados ao seu total
            </p>
          </div>

          {/* Revisão das Respostas */}
          <div className="text-left space-y-4 mb-8">
            <h3 className="font-bold text-lg mb-4">Revisão</h3>
            {quizAtivo.perguntas.map((pergunta, index) => {
              const acertou = respostas[index] === pergunta.respostaCorreta;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 ${
                    acertou
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    {acertou ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    ) : (
                      <X className="w-5 h-5 text-red-600 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2">{pergunta.texto}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {pergunta.explicacao}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setQuizAtivo(null);
                setMostrarResultado(false);
              }}
              className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              Voltar ao Conteúdo
            </button>
            <button
              onClick={() => {
                setQuizAtivo(null);
                setMostrarResultado(false);
                setConteudoSelecionado(null);
              }}
              className={`flex-1 py-3 bg-gradient-to-r from-${cor}-600 to-${cor}-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all`}
            >
              Explorar Mais
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Visualização de Conteúdo
  const cor = conteudoSelecionado.materia === 'matematica' ? 'blue' : 'purple';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <button
              onClick={() => setConteudoSelecionado(null)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">{conteudoSelecionado.titulo}</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className={`px-3 py-1 bg-${cor}-100 dark:bg-${cor}-900/30 text-${cor}-700 dark:text-${cor}-300 text-xs font-medium rounded-full`}>
                {conteudoSelecionado.materia === 'matematica' ? 'Matemática' : 'Português'}
              </span>
              <h1 className="text-3xl font-bold mt-4 mb-2">{conteudoSelecionado.titulo}</h1>
              <p className="text-gray-600 dark:text-gray-400">{conteudoSelecionado.descricao}</p>
            </div>
          </div>

          {/* Áudio */}
          <button
            onClick={() => lerTexto(conteudoSelecionado.texto)}
            className={`flex items-center gap-2 px-4 py-2 bg-${cor}-100 dark:bg-${cor}-900/30 text-${cor}-700 dark:text-${cor}-300 rounded-xl hover:bg-${cor}-200 dark:hover:bg-${cor}-900/40 transition-colors mb-6`}
          >
            <Volume2 className="w-5 h-5" />
            Ouvir Conteúdo
          </button>

          {/* Conteúdo */}
          <div className="prose dark:prose-invert max-w-none mb-8">
            <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
              {conteudoSelecionado.texto}
            </div>
          </div>

          {/* Vídeo */}
          {conteudoSelecionado.videoUrl && (
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4">Vídeo Explicativo</h3>
              <div className="aspect-video rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                <iframe
                  src={conteudoSelecionado.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Quiz Button */}
          <button
            onClick={() => iniciarQuiz(conteudoSelecionado.id)}
            className={`w-full py-4 bg-gradient-to-r from-${cor}-600 to-${cor}-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2`}
          >
            <Award className="w-5 h-5" />
            Fazer Quiz e Ganhar Pontos
          </button>
        </div>
      </div>
    </div>
  );
}
