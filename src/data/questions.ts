import type { Question } from '../types';

export const questions: Question[] = [
  // ===== 外向性 E (4题) =====
  {
    id: 1,
    text: '和很多人在一起时，我会感到精力充沛。',
    dimension: 'extraversion',
    reversed: false,
  },
  {
    id: 2,
    text: '在聚会上，比起成为焦点，我更喜欢在一旁观察。',
    dimension: 'extraversion',
    reversed: true,
  },
  {
    id: 3,
    text: '我经常主动和不太熟悉的人开启对话。',
    dimension: 'extraversion',
    reversed: false,
  },
  {
    id: 4,
    text: '社交之后，我需要大量的独处时间来恢复精力。',
    dimension: 'extraversion',
    reversed: true,
  },

  // ===== 情绪稳定性 S (5题) =====
  {
    id: 5,
    text: '即使在高压环境下，我也能保持冷静。',
    dimension: 'emotionalStability',
    reversed: false,
  },
  {
    id: 6,
    text: '我经常担心事情会出差错。',
    dimension: 'emotionalStability',
    reversed: true,
  },
  {
    id: 7,
    text: '一个小小的挫折就能毁掉我一整天的心情。',
    dimension: 'emotionalStability',
    reversed: true,
  },
  {
    id: 8,
    text: '面对挑战时，我对自己的应对能力有信心。',
    dimension: 'emotionalStability',
    reversed: false,
  },
  {
    id: 9,
    text: '我经常被自我怀疑的想法所困扰。',
    dimension: 'emotionalStability',
    reversed: true,
  },

  // ===== 自我主张 A (5题) =====
  {
    id: 10,
    text: '在团队中，我会自然而然地承担起领导角色。',
    dimension: 'assertiveness',
    reversed: false,
  },
  {
    id: 11,
    text: '当我有不同看法时，我能坦然地公开表达。',
    dimension: 'assertiveness',
    reversed: false,
  },
  {
    id: 12,
    text: '比起坚持自己的主张，我更倾向于迎合他人的想法。',
    dimension: 'assertiveness',
    reversed: true,
  },
  {
    id: 13,
    text: '当我发现问题时，我会立刻说出来。',
    dimension: 'assertiveness',
    reversed: false,
  },
  {
    id: 14,
    text: '竞争能激发我发挥出最好的表现。',
    dimension: 'assertiveness',
    reversed: false,
  },

  // ===== 温暖/包容 W (4题) =====
  {
    id: 15,
    text: '我能本能地察觉到身边有人情绪低落。',
    dimension: 'warmth',
    reversed: false,
  },
  {
    id: 16,
    text: '我经常把别人的需求放在自己的需求之前。',
    dimension: 'warmth',
    reversed: false,
  },
  {
    id: 17,
    text: '遇到困难时，人们倾向于来找我寻求安慰或建议。',
    dimension: 'warmth',
    reversed: false,
  },
  {
    id: 18,
    text: '我有强烈的意愿去照顾和保护身边的人。',
    dimension: 'warmth',
    reversed: false,
  },

  // ===== 开放性 O (5题) =====
  {
    id: 19,
    text: '我喜欢尝试从未做过的事情，即使它们看起来有些奇怪。',
    dimension: 'openness',
    reversed: false,
  },
  {
    id: 20,
    text: '我被不拘一格的想法和独特的艺术表达所吸引。',
    dimension: 'openness',
    reversed: false,
  },
  {
    id: 21,
    text: '比起冒险尝试新事物，我更喜欢坚持已有的常规和熟悉的方式。',
    dimension: 'openness',
    reversed: true,
  },
  {
    id: 22,
    text: '我的想象力经常带我去意想不到的地方。',
    dimension: 'openness',
    reversed: false,
  },
  {
    id: 23,
    text: '我喜欢探索抽象的概念或哲学性的话题。',
    dimension: 'openness',
    reversed: false,
  },

  // ===== 勤勉性 D (4题) =====
  {
    id: 24,
    text: '我会设定明确的目标，并系统地朝着它们努力。',
    dimension: 'discipline',
    reversed: false,
  },
  {
    id: 25,
    text: '我经常把任务拖到最后一刻才开始做。',
    dimension: 'discipline',
    reversed: true,
  },
  {
    id: 26,
    text: '维持稳定的习惯和规律的作息对我来说很容易。',
    dimension: 'discipline',
    reversed: false,
  },
  {
    id: 27,
    text: '一旦我承诺了某件事，无论多困难我都会坚持到底。',
    dimension: 'discipline',
    reversed: false,
  },

  // ===== 真实性 M (4题) =====
  {
    id: 28,
    text: '人们看到的就是真实的我——我不会在不同场合表现出不同的面孔。',
    dimension: 'authenticity',
    reversed: false,
  },
  {
    id: 29,
    text: '我有时候会表现出与内心真实感受不同的样子。',
    dimension: 'authenticity',
    reversed: true,
  },
  {
    id: 30,
    text: '我倾向于直率地表达想法，即使那不是别人想听的。',
    dimension: 'authenticity',
    reversed: false,
  },
  {
    id: 31,
    text: '我会小心翼翼地管理别人对我的看法和印象。',
    dimension: 'authenticity',
    reversed: true,
  },

  // ===== 乐观性 P (4题) =====
  {
    id: 32,
    text: '我大体上相信事情最终都会好起来的。',
    dimension: 'optimism',
    reversed: false,
  },
  {
    id: 33,
    text: '在任何情况下，我都倾向于关注积极的一面。',
    dimension: 'optimism',
    reversed: false,
  },
  {
    id: 34,
    text: '当事情不顺利时，我很难保持乐观的心态。',
    dimension: 'optimism',
    reversed: true,
  },
  {
    id: 35,
    text: '面对新体验，比起谨慎我更多的是感到兴奋。',
    dimension: 'optimism',
    reversed: false,
  },
];
