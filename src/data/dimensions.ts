import type { DimensionMeta } from '../types';

export const dimensions: DimensionMeta[] = [
  {
    key: 'extraversion',
    label: '外向性',
    labelJa: '外向性',
    shortLabel: 'E',
    description: '社交能量方向：高分表示从社交中获取能量，低分表示从独处中获取能量',
  },
  {
    key: 'emotionalStability',
    label: '情绪稳定性',
    labelJa: '情緒安定性',
    shortLabel: 'S',
    description: '情绪弹性与抗压能力：高分表示冷静稳定，低分表示容易焦虑',
  },
  {
    key: 'assertiveness',
    label: '自我主张',
    labelJa: '自己主張性',
    shortLabel: 'A',
    description: '领导与竞争意愿：高分表示主动表达、敢于争取，低分表示顺从配合',
  },
  {
    key: 'warmth',
    label: '温暖包容',
    labelJa: '温かさ',
    shortLabel: 'W',
    description: '关怀他人倾向：高分表示富有同理心和照顾欲，低分表示独立疏离',
  },
  {
    key: 'openness',
    label: '开放性',
    labelJa: '開放性',
    shortLabel: 'O',
    description: '好奇心与创造力：高分表示热爱探索新事物，低分表示偏好传统和常规',
  },
  {
    key: 'discipline',
    label: '勤勉性',
    labelJa: '勤勉性',
    shortLabel: 'D',
    description: '自律与目标导向：高分表示自律勤勉，低分表示随性自由',
  },
  {
    key: 'authenticity',
    label: '真实性',
    labelJa: '素直さ',
    shortLabel: 'M',
    description: '外在与内在一致度：高分表示表里如一，低分表示善于伪装管理形象',
  },
  {
    key: 'optimism',
    label: '乐观性',
    labelJa: '楽観性',
    shortLabel: 'P',
    description: '人生态度：高分表示积极乐观，低分表示现实悲观',
  },
];
