'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { obterUsuario, obterProgresso } from '@/lib/storage';
import { Usuario, ProgressoUsuario } from '@/lib/types';
import { BookOpen, Trophy, Users, TrendingUp, Sparkles, Target } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [progresso, setProgresso] = useState<ProgressoUsuario | null>(null);

  useEffect(() => {
    const user = obterUsuario();
    if (!user) {
      router.push('/');
    } else {
      setUsuario(user);
      setProgresso(obterProgresso());
    }
  }, [router]);

  if (!usuario) return null;

  const saudacao = usuario.estiloAprendizado === 'brincalhao' 
    ? `E aí, ${usuario.nome.split(' ')[0]}! 🎉`
    : `Olá, ${usuario.nome.split(' ')[0]}!`;

  const motivacao = usuario.estiloAprendizado === 'brincalhao'
    ? 'Bora arrasar nos estudos hoje? 🚀'
    : 'Pronto para aprender algo novo hoje?';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Estudos
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                href="/conteudos"
                className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Conteúdos
              </Link>
              <Link
                href="/grupos"
                className="px-4 py-2 text-sm font-medium hover:text-purple-600 transition-colors"
              >
                Grupos
              </Link>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full">
                <Trophy className="w-4 h-4" />
                <span className="font-bold">{usuario.pontos}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">{saudacao}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{motivacao}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold mb-1">
              {progresso?.conteudosCompletados.length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Conteúdos Concluídos
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold mb-1">
              {progresso?.quizzesCompletados.length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Quizzes Realizados
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{usuario.pontos}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Pontos Totais
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">
              {usuario.gruposIds.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Grupos Ativos
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Link
            href="/conteudos"
            className="group bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <BookOpen className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-2">Explorar Conteúdos</h3>
            <p className="text-blue-100 mb-4">
              Acesse materiais de matemática e português adaptados ao seu nível
            </p>
            <div className="inline-flex items-center gap-2 text-sm font-semibold">
              Começar agora
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          <Link
            href="/grupos"
            className="group bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Users className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold mb-2">Grupos de Estudo</h3>
            <p className="text-purple-100 mb-4">
              Participe de desafios, compartilhe conhecimento e ganhe pontos
            </p>
            <div className="inline-flex items-center gap-2 text-sm font-semibold">
              Ver grupos
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>

        {/* Personalized Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Recomendado para Você</h2>
          
          <div className="space-y-4">
            {usuario.dificuldades.length > 0 && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-600">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Áreas de Foco</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Identificamos que você tem interesse em melhorar em:{' '}
                      <span className="font-medium text-blue-600">
                        {usuario.dificuldades.join(', ')}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-l-4 border-purple-600">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Seu Estilo: {usuario.estiloAprendizado === 'brincalhao' ? 'Brincalhão 🎉' : 'Sério 📚'}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {usuario.estiloAprendizado === 'brincalhao'
                      ? 'Preparamos conteúdos divertidos e interativos especialmente para você!'
                      : 'Conteúdos objetivos e diretos, perfeitos para seu estilo de aprendizado.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-600">
              <div className="flex items-start gap-3">
                <Trophy className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Próxima Meta</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Complete mais {3 - (progresso?.quizzesCompletados.length || 0)} quizzes para desbloquear a conquista "Estudante Dedicado"!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
