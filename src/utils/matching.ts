import type { CharacterProfile, DimensionKey, DimensionScores, MatchResult } from '../types';
import { questions } from '../data/questions';

const dimensionKeys: DimensionKey[] = [
  'energy',
  'warmth',
  'drive',
  'discipline',
  'creativity',
  'confidence',
  'optimism',
  'independence',
];

/**
 * Convert user answers (1-7) into dimension scores (1-10)
 * answers: Record<questionId, value(1-7)>
 * 1 = Strongly Disagree, 4 = Neutral, 7 = Strongly Agree
 */
export function calculateDimensionScores(answers: Record<number, number>): DimensionScores {
  const scores: DimensionScores = {
    energy: 0,
    warmth: 0,
    drive: 0,
    discipline: 0,
    creativity: 0,
    confidence: 0,
    optimism: 0,
    independence: 0,
  };

  const counts: Record<DimensionKey, number> = {
    energy: 0,
    warmth: 0,
    drive: 0,
    discipline: 0,
    creativity: 0,
    confidence: 0,
    optimism: 0,
    independence: 0,
  };

  for (const q of questions) {
    const answer = answers[q.id];
    if (answer === undefined) continue;

    // Reverse scoring for reversed questions: 8 - answer (1→7, 2→6, ..., 7→1)
    const value = q.reversed ? 8 - answer : answer;

    scores[q.dimension] += value;
    counts[q.dimension]++;
  }

  // Map average (1-7) linearly to (1-10)
  for (const key of dimensionKeys) {
    if (counts[key] > 0) {
      const avg = scores[key] / counts[key]; // range 1-7
      scores[key] = Math.round(((avg - 1) / 6) * 9 + 1); // map to 1-10
    }
  }

  return scores;
}

/**
 * Calculate Euclidean distance between two dimension score vectors
 */
function euclideanDistance(a: DimensionScores, b: DimensionScores): number {
  let sum = 0;
  for (const key of dimensionKeys) {
    sum += (a[key] - b[key]) ** 2;
  }
  return Math.sqrt(sum);
}

/**
 * Match user scores against all characters and return results sorted by similarity (best first)
 */
export function matchCharacters(
  userScores: DimensionScores,
  characters: CharacterProfile[],
): MatchResult[] {
  // Theoretical max distance: sqrt(8 * 9²) ≈ 25.46
  const maxDistance = Math.sqrt(dimensionKeys.length * 81);

  const results: MatchResult[] = characters.map((character) => {
    const distance = euclideanDistance(userScores, character.scores);
    const similarity = 1 / (1 + distance);
    const percentage = Math.round(Math.max(0, (1 - distance / maxDistance)) * 100);

    return { character, distance, similarity, percentage };
  });

  results.sort((a, b) => a.distance - b.distance);

  return results;
}
