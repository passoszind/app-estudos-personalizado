// Tipos do aplicativo de estudos

export type EstiloAprendizado = 'serio' | 'brincalhao';
export type NivelDificuldade = 'basico' | 'intermediario' | 'avancado';
export type Materia = 'matematica' | 'portugues';

export interface Usuario {
  id: string;
  nome: string;
  idade: number;
  email: string;
  estiloAprendizado: EstiloAprendizado;
  dificuldades: string[];
  nivel: NivelDificuldade;
  pontos: number;
  conquistas: string[];
  gruposIds: string[];
  criadoEm: string;
}

export interface Conteudo {
  id: string;
  materia: Materia;
  titulo: string;
  descricao: string;
  nivel: NivelDificuldade;
  texto: string;
  videoUrl?: string;
  audioUrl?: string;
  tags: string[];
}

export interface Quiz {
  id: string;
  conteudoId: string;
  materia: Materia;
  titulo: string;
  perguntas: Pergunta[];
  pontosPorAcerto: number;
}

export interface Pergunta {
  id: string;
  texto: string;
  opcoes: string[];
  respostaCorreta: number;
  explicacao: string;
}

export interface GrupoEstudo {
  id: string;
  nome: string;
  descricao: string;
  criadorId: string;
  membrosIds: string[];
  materia: Materia;
  desafioAtual?: Desafio;
  criadoEm: string;
}

export interface Desafio {
  id: string;
  titulo: string;
  descricao: string;
  quizId: string;
  pontos: number;
  dataLimite: string;
  participantes: { usuarioId: string; pontuacao: number }[];
}

export interface ProgressoUsuario {
  usuarioId: string;
  conteudosCompletados: string[];
  quizzesCompletados: { quizId: string; pontuacao: number; data: string }[];
  tempoEstudo: number; // em minutos
}
