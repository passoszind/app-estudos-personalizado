'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { obterUsuario, obterGrupos, adicionarGrupo, entrarGrupo, salvarGrupos } from '@/lib/storage';
import { Usuario, GrupoEstudo } from '@/lib/types';
import { Users, Plus, Trophy, Target, ArrowLeft, Crown, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function GruposPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [grupos, setGrupos] = useState<GrupoEstudo[]>([]);
  const [mostrarCriar, setMostrarCriar] = useState(false);
  const [novoGrupo, setNovoGrupo] = useState({
    nome: '',
    descricao: '',
    materia: 'matematica' as 'matematica' | 'portugues',
  });

  useEffect(() => {
    const user = obterUsuario();
    if (!user) {
      router.push('/');
    } else {
      setUsuario(user);
      setGrupos(obterGrupos());
    }
  }, [router]);

  if (!usuario) return null;

  const criarGrupo = (e: React.FormEvent) => {
    e.preventDefault();
    
    const grupo: GrupoEstudo = {
      id: Date.now().toString(),
      nome: novoGrupo.nome,
      descricao: novoGrupo.descricao,
      criadorId: usuario.id,
      membrosIds: [usuario.id],
      materia: novoGrupo.materia,
      desafioAtual: {
        id: `desafio-${Date.now()}`,
        titulo: 'Desafio de Boas-Vindas',
        descricao: 'Complete 3 quizzes para ganhar pontos extras!',
        quizId: 'quiz-mat-1',
        pontos: 50,
        dataLimite: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        participantes: [],
      },
      criadoEm: new Date().toISOString(),
    };

    adicionarGrupo(grupo);
    setGrupos([...grupos, grupo]);
    setMostrarCriar(false);
    setNovoGrupo({ nome: '', descricao: '', materia: 'matematica' });
  };

  const entrarNoGrupo = (grupoId: string) => {
    entrarGrupo(grupoId, usuario.id);
    setGrupos(obterGrupos());
  };

  const participarDesafio = (grupoId: string) => {
    const gruposAtualizados = grupos.map(g => {
      if (g.id === grupoId && g.desafioAtual) {
        const jaParticipa = g.desafioAtual.participantes.some(p => p.usuarioId === usuario.id);
        if (!jaParticipa) {
          g.desafioAtual.participantes.push({
            usuarioId: usuario.id,
            pontuacao: Math.floor(Math.random() * 100),
          });
        }
      }
      return g;
    });
    salvarGrupos(gruposAtualizados);
    setGrupos(gruposAtualizados);
  };

  const meusGrupos = grupos.filter(g => g.membrosIds.includes(usuario.id));
  const outrosGrupos = grupos.filter(g => !g.membrosIds.includes(usuario.id));

  if (mostrarCriar) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16 gap-4">
              <button
                onClick={() => setMostrarCriar(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold">Criar Grupo</h1>
            </div>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12">
            <form onSubmit={criarGrupo} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nome do Grupo</label>
                <input
                  type="text"
                  required
                  value={novoGrupo.nome}
                  onChange={(e) => setNovoGrupo({ ...novoGrupo, nome: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Ex: Mestres da Matemática"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descrição</label>
                <textarea
                  required
                  value={novoGrupo.descricao}
                  onChange={(e) => setNovoGrupo({ ...novoGrupo, descricao: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  rows={4}
                  placeholder="Descreva o objetivo do grupo..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Matéria</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setNovoGrupo({ ...novoGrupo, materia: 'matematica' })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      novoGrupo.materia === 'matematica'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <div className="font-semibold">Matemática</div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setNovoGrupo({ ...novoGrupo, materia: 'portugues' })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      novoGrupo.materia === 'portugues'
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <div className="font-semibold">Português</div>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Criar Grupo
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-bold">Grupos de Estudo</h1>
            </div>
            <button
              onClick={() => setMostrarCriar(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Criar Grupo
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Meus Grupos */}
        {meusGrupos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Meus Grupos</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {meusGrupos.map(grupo => (
                <div
                  key={grupo.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-xl">{grupo.nome}</h3>
                        {grupo.criadorId === usuario.id && (
                          <Crown className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {grupo.descricao}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`px-3 py-1 rounded-full ${
                          grupo.materia === 'matematica'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        }`}>
                          {grupo.materia === 'matematica' ? 'Matemática' : 'Português'}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Users className="w-4 h-4" />
                          {grupo.membrosIds.length} membros
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Desafio Atual */}
                  {grupo.desafioAtual && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                      <div className="flex items-start gap-3 mb-3">
                        <Target className="w-5 h-5 text-purple-600 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{grupo.desafioAtual.titulo}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {grupo.desafioAtual.descricao}
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <Trophy className="w-4 h-4 text-yellow-600" />
                            <span className="font-medium text-yellow-600">
                              {grupo.desafioAtual.pontos} pontos
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Ranking */}
                      {grupo.desafioAtual.participantes.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-800">
                          <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                            Ranking
                          </div>
                          <div className="space-y-2">
                            {grupo.desafioAtual.participantes
                              .sort((a, b) => b.pontuacao - a.pontuacao)
                              .slice(0, 3)
                              .map((participante, index) => (
                                <div
                                  key={participante.usuarioId}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                      index === 0 ? 'bg-yellow-400 text-yellow-900' :
                                      index === 1 ? 'bg-gray-300 text-gray-700' :
                                      'bg-orange-400 text-orange-900'
                                    }`}>
                                      {index + 1}
                                    </span>
                                    <span className={participante.usuarioId === usuario.id ? 'font-bold' : ''}>
                                      {participante.usuarioId === usuario.id ? 'Você' : `Membro ${participante.usuarioId.slice(-4)}`}
                                    </span>
                                  </div>
                                  <span className="font-medium">{participante.pontuacao} pts</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => participarDesafio(grupo.id)}
                        className="w-full mt-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                      >
                        {grupo.desafioAtual.participantes.some(p => p.usuarioId === usuario.id)
                          ? 'Ver Progresso'
                          : 'Participar do Desafio'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Descobrir Grupos */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Descobrir Grupos</h2>
          {outrosGrupos.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-lg">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Nenhum grupo disponível</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Seja o primeiro a criar um grupo de estudos!
              </p>
              <button
                onClick={() => setMostrarCriar(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Criar Primeiro Grupo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outrosGrupos.map(grupo => (
                <div
                  key={grupo.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
                >
                  <h3 className="font-bold text-lg mb-2">{grupo.nome}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {grupo.descricao}
                  </p>
                  
                  <div className="flex items-center gap-3 mb-4 text-sm">
                    <span className={`px-3 py-1 rounded-full ${
                      grupo.materia === 'matematica'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    }`}>
                      {grupo.materia === 'matematica' ? 'Matemática' : 'Português'}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      {grupo.membrosIds.length}
                    </span>
                  </div>

                  <button
                    onClick={() => entrarNoGrupo(grupo.id)}
                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Entrar no Grupo
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
