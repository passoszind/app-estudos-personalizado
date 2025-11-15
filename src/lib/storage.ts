// Gerenciamento de Local Storage

import { Usuario, GrupoEstudo, ProgressoUsuario } from './types';

const KEYS = {
  USUARIO: 'estudos_usuario',
  GRUPOS: 'estudos_grupos',
  PROGRESSO: 'estudos_progresso',
};

// Usuário
export const salvarUsuario = (usuario: Usuario): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.USUARIO, JSON.stringify(usuario));
  }
};

export const obterUsuario = (): Usuario | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(KEYS.USUARIO);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const atualizarPontos = (pontos: number): void => {
  const usuario = obterUsuario();
  if (usuario) {
    usuario.pontos += pontos;
    salvarUsuario(usuario);
  }
};

export const limparUsuario = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(KEYS.USUARIO);
  }
};

// Grupos de Estudo
export const salvarGrupos = (grupos: GrupoEstudo[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.GRUPOS, JSON.stringify(grupos));
  }
};

export const obterGrupos = (): GrupoEstudo[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(KEYS.GRUPOS);
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const adicionarGrupo = (grupo: GrupoEstudo): void => {
  const grupos = obterGrupos();
  grupos.push(grupo);
  salvarGrupos(grupos);
};

export const entrarGrupo = (grupoId: string, usuarioId: string): void => {
  const grupos = obterGrupos();
  const grupo = grupos.find(g => g.id === grupoId);
  if (grupo && !grupo.membrosIds.includes(usuarioId)) {
    grupo.membrosIds.push(usuarioId);
    salvarGrupos(grupos);
  }
};

// Progresso
export const salvarProgresso = (progresso: ProgressoUsuario): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEYS.PROGRESSO, JSON.stringify(progresso));
  }
};

export const obterProgresso = (): ProgressoUsuario | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(KEYS.PROGRESSO);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const marcarConteudoConcluido = (conteudoId: string): void => {
  const progresso = obterProgresso();
  if (progresso && !progresso.conteudosCompletados.includes(conteudoId)) {
    progresso.conteudosCompletados.push(conteudoId);
    salvarProgresso(progresso);
  }
};

export const registrarQuizCompletado = (quizId: string, pontuacao: number): void => {
  const progresso = obterProgresso();
  if (progresso) {
    progresso.quizzesCompletados.push({
      quizId,
      pontuacao,
      data: new Date().toISOString(),
    });
    salvarProgresso(progresso);
  }
};
