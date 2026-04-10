import type { CharacterProfile, DimensionKey, DimensionScores, MatchResult } from '../types';
import { questions } from '../data/questions';

const dimensionKeys: DimensionKey[] = [
  'extraversion',
  'emotionalStability',
  'assertiveness',
  'warmth',
  'openness',
  'discipline',
  'authenticity',
  'optimism',
];

/**
 * 将用户的答题结果(1-7)转换为各维度分数(1-10)
 * answers: Record<questionId, value(1-7)>
 * 1=完全不认同, 4=中立, 7=完全认同
 */
export function calculateDimensionScores(answers: Record<number, number>): DimensionScores {
  const scores: DimensionScores = {
    extraversion: 0,
    emotionalStability: 0,
    assertiveness: 0,
    warmth: 0,
    openness: 0,
    discipline: 0,
    authenticity: 0,
    optimism: 0,
  };

  const counts: Record<DimensionKey, number> = {
    extraversion: 0,
    emotionalStability: 0,
    assertiveness: 0,
    warmth: 0,
    openness: 0,
    discipline: 0,
    authenticity: 0,
    optimism: 0,
  };

  for (const q of questions) {
    const answer = answers[q.id];
    if (answer === undefined) continue;

    // 反向题翻转：8 - answer (1→7, 2→6, ..., 7→1)
    const value = q.reversed ? 8 - answer : answer;

    scores[q.dimension] += value;
    counts[q.dimension]++;
  }

  // 将平均值(1-7)线性映射到(1-10)
  for (const key of dimensionKeys) {
    if (counts[key] > 0) {
      const avg = scores[key] / counts[key]; // 范围 1-7
      scores[key] = Math.round(((avg - 1) / 6) * 9 + 1); // 映射到 1-10
    }
  }

  return scores;
}

/**
 * 计算两个维度向量之间的欧氏距离
 */
function euclideanDistance(a: DimensionScores, b: DimensionScores): number {
  let sum = 0;
  for (const key of dimensionKeys) {
    sum += (a[key] - b[key]) ** 2;
  }
  return Math.sqrt(sum);
}

/**
 * 计算用户与所有角色的匹配结果，按匹配度降序排列
 */
export function matchCharacters(
  userScores: DimensionScores,
  characters: CharacterProfile[],
): MatchResult[] {
  // 最大理论距离: sqrt(8 * 9^2) ≈ 25.46
  const maxDistance = Math.sqrt(dimensionKeys.length * 81);

  const results: MatchResult[] = characters.map((character) => {
    const distance = euclideanDistance(userScores, character.dimensions);
    const similarity = 1 / (1 + distance);
    const percentage = Math.round(Math.max(0, (1 - distance / maxDistance)) * 100);

    return { character, distance, similarity, percentage };
  });

  results.sort((a, b) => a.distance - b.distance);

  return results;
}
