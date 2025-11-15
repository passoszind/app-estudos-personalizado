'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { obterUsuario, salvarUsuario, salvarProgresso } from '@/lib/storage';
import { Usuario, EstiloAprendizado, NivelDificuldade } from '@/lib/types';
import { BookOpen, Sparkles, GraduationCap, Users } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [etapa, setEtapa] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    email: '',
    estiloAprendizado: 'serio' as EstiloAprendizado,
    dificuldades: [] as string[],
    nivel: 'basico' as NivelDificuldade,
  });

  useEffect(() => {
    const usuario = obterUsuario();
    if (usuario) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const novoUsuario: Usuario = {
      id: Date.now().toString(),
      nome: formData.nome,
      idade: parseInt(formData.idade),
      email: formData.email,
      estiloAprendizado: formData.estiloAprendizado,
      dificuldades: formData.dificuldades,
      nivel: formData.nivel,
      pontos: 0,
      conquistas: [],
      gruposIds: [],
      criadoEm: new Date().toISOString(),
    };

    salvarUsuario(novoUsuario);
    salvarProgresso({
      usuarioId: novoUsuario.id,
      conteudosCompletados: [],
      quizzesCompletados: [],
      tempoEstudo: 0,
    });

    router.push('/dashboard');
  };

  const toggleDificuldade = (dificuldade: string) => {
    setFormData(prev => ({
      ...prev,
      dificuldades: prev.dificuldades.includes(dificuldade)
        ? prev.dificuldades.filter(d => d !== dificuldade)
        : [...prev.dificuldades, dificuldade],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Hero Section */}
      {etapa === 0 && (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
          <div className="max-w-4xl w-full text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Aprendizado Personalizado
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Aprenda do Seu Jeito
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Uma plataforma de estudos que se adapta ao seu estilo, ritmo e preferências de aprendizado
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Conteúdos Personalizados</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Matemática e Português adaptados ao seu nível
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <GraduationCap className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Quizzes Interativos</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Teste seus conhecimentos e ganhe pontos
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <Users className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Grupos de Estudo</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Participe de desafios e compartilhe experiências
                </p>
              </div>
            </div>

            <button
              onClick={() => setEtapa(1)}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Começar Agora
            </button>
          </div>
        </div>
      )}

      {/* Formulário de Cadastro */}
      {etapa > 0 && (
        <div className="flex items-center justify-center min-h-screen px-4 py-12">
          <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Etapa {etapa} de 3
                </span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {Math.round((etapa / 3) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(etapa / 3) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Etapa 1: Dados Básicos */}
              {etapa === 1 && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Vamos nos conhecer!</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Conte um pouco sobre você
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Nome</label>
                    <input
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Idade</label>
                    <input
                      type="number"
                      required
                      min="5"
                      max="100"
                      value={formData.idade}
                      onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Sua idade"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">E-mail</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setEtapa(2)}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Continuar
                  </button>
                </div>
              )}

              {/* Etapa 2: Preferências */}
              {etapa === 2 && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Como você gosta de aprender?</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Vamos personalizar sua experiência
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Estilo de Aprendizado</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, estiloAprendizado: 'serio' })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.estiloAprendizado === 'serio'
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        <GraduationCap className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                        <div className="font-semibold">Sério</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          Formal e objetivo
                        </div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, estiloAprendizado: 'brincalhao' })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.estiloAprendizado === 'brincalhao'
                            ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                        <div className="font-semibold">Brincalhão</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          Divertido e leve
                        </div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Nível de Conhecimento</label>
                    <div className="space-y-2">
                      {(['basico', 'intermediario', 'avancado'] as NivelDificuldade[]).map((nivel) => (
                        <button
                          key={nivel}
                          type="button"
                          onClick={() => setFormData({ ...formData, nivel })}
                          className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                            formData.nivel === nivel
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          <div className="font-semibold capitalize">{nivel}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setEtapa(1)}
                      className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      onClick={() => setEtapa(3)}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}

              {/* Etapa 3: Dificuldades */}
              {etapa === 3 && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Onde você precisa de ajuda?</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Selecione suas dificuldades (opcional)
                    </p>
                  </div>

                  <div className="space-y-2">
                    {[
                      'Operações matemáticas',
                      'Frações e decimais',
                      'Interpretação de texto',
                      'Gramática',
                      'Ortografia',
                      'Concentração',
                    ].map((dificuldade) => (
                      <button
                        key={dificuldade}
                        type="button"
                        onClick={() => toggleDificuldade(dificuldade)}
                        className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                          formData.dificuldades.includes(dificuldade)
                            ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        {dificuldade}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setEtapa(2)}
                      className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Começar a Estudar!
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
