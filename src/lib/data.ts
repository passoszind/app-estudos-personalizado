// Conteúdos e Quizzes do aplicativo

import { Conteudo, Quiz } from './types';

export const conteudos: Conteudo[] = [
  // Matemática
  {
    id: 'mat-1',
    materia: 'matematica',
    titulo: 'Operações Básicas',
    descricao: 'Aprenda adição, subtração, multiplicação e divisão',
    nivel: 'basico',
    texto: `As operações básicas são fundamentais na matemática:
    
• Adição (+): Juntar quantidades. Ex: 2 + 3 = 5
• Subtração (-): Tirar quantidades. Ex: 5 - 2 = 3
• Multiplicação (×): Somar várias vezes. Ex: 3 × 4 = 12
• Divisão (÷): Dividir em partes iguais. Ex: 12 ÷ 3 = 4

Dica: A ordem das operações importa! Sempre resolva multiplicação e divisão antes de adição e subtração.`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['operações', 'básico', 'fundamentos'],
  },
  {
    id: 'mat-2',
    materia: 'matematica',
    titulo: 'Frações',
    descricao: 'Entenda como funcionam as frações',
    nivel: 'intermediario',
    texto: `Frações representam partes de um todo:
    
• Numerador: número de cima (partes que temos)
• Denominador: número de baixo (total de partes)
• Exemplo: 3/4 significa 3 partes de 4

Operações com frações:
• Soma/Subtração: iguale os denominadores primeiro
• Multiplicação: multiplique numerador com numerador e denominador com denominador
• Divisão: inverta a segunda fração e multiplique`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['frações', 'intermediário', 'operações'],
  },
  // Português
  {
    id: 'port-1',
    materia: 'portugues',
    titulo: 'Classes Gramaticais',
    descricao: 'Conheça as principais classes de palavras',
    nivel: 'basico',
    texto: `As classes gramaticais organizam as palavras:
    
• Substantivo: nomeia seres e coisas (casa, amor, João)
• Adjetivo: caracteriza o substantivo (bonito, grande, azul)
• Verbo: indica ação ou estado (correr, ser, estar)
• Advérbio: modifica verbo, adjetivo ou outro advérbio (muito, aqui, ontem)
• Pronome: substitui ou acompanha o substantivo (ele, meu, este)

Exemplo: "O menino feliz corre rapidamente"
- O: artigo
- menino: substantivo
- feliz: adjetivo
- corre: verbo
- rapidamente: advérbio`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['gramática', 'classes', 'básico'],
  },
  {
    id: 'port-2',
    materia: 'portugues',
    titulo: 'Interpretação de Texto',
    descricao: 'Técnicas para entender melhor o que você lê',
    nivel: 'intermediario',
    texto: `Dicas para interpretar textos:
    
1. Leia o texto completo primeiro
2. Identifique o tema principal
3. Observe palavras-chave
4. Preste atenção em conectivos (mas, porém, portanto)
5. Releia trechos importantes

Tipos de questões:
• Localização: encontrar informação no texto
• Inferência: concluir algo não explícito
• Opinião: identificar ponto de vista do autor
• Vocabulário: entender palavras pelo contexto`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['interpretação', 'leitura', 'intermediário'],
  },
];

export const quizzes: Quiz[] = [
  {
    id: 'quiz-mat-1',
    conteudoId: 'mat-1',
    materia: 'matematica',
    titulo: 'Quiz: Operações Básicas',
    pontosPorAcerto: 10,
    perguntas: [
      {
        id: 'q1',
        texto: 'Quanto é 15 + 27?',
        opcoes: ['32', '42', '52', '62'],
        respostaCorreta: 1,
        explicacao: '15 + 27 = 42. Some as unidades (5+7=12) e as dezenas (1+2=3), depois junte: 42.',
      },
      {
        id: 'q2',
        texto: 'Qual o resultado de 8 × 7?',
        opcoes: ['54', '56', '58', '60'],
        respostaCorreta: 1,
        explicacao: '8 × 7 = 56. Você pode pensar como 8 + 8 + 8 + 8 + 8 + 8 + 8 = 56.',
      },
      {
        id: 'q3',
        texto: 'Quanto é 100 - 37?',
        opcoes: ['53', '63', '73', '83'],
        respostaCorreta: 1,
        explicacao: '100 - 37 = 63. Subtraia 30 de 100 (=70) e depois subtraia 7 (70-7=63).',
      },
    ],
  },
  {
    id: 'quiz-port-1',
    conteudoId: 'port-1',
    materia: 'portugues',
    titulo: 'Quiz: Classes Gramaticais',
    pontosPorAcerto: 10,
    perguntas: [
      {
        id: 'q1',
        texto: 'Na frase "O gato preto dormia", qual é o adjetivo?',
        opcoes: ['gato', 'preto', 'dormia', 'o'],
        respostaCorreta: 1,
        explicacao: '"Preto" é o adjetivo porque caracteriza o substantivo "gato".',
      },
      {
        id: 'q2',
        texto: 'Qual palavra é um verbo?',
        opcoes: ['casa', 'bonito', 'correr', 'muito'],
        respostaCorreta: 2,
        explicacao: '"Correr" é um verbo porque indica uma ação.',
      },
      {
        id: 'q3',
        texto: 'Em "Ela chegou cedo", qual é o advérbio?',
        opcoes: ['Ela', 'chegou', 'cedo', 'nenhuma'],
        respostaCorreta: 2,
        explicacao: '"Cedo" é advérbio de tempo, modificando o verbo "chegou".',
      },
    ],
  },
];
