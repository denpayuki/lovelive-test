export interface DimensionScores {
  extraversion: number;
  emotionalStability: number;
  assertiveness: number;
  warmth: number;
  openness: number;
  discipline: number;
  authenticity: number;
  optimism: number;
}

export type DimensionKey = keyof DimensionScores;

export interface CharacterProfile {
  id: number;
  nameJa: string;
  nameCn: string;
  unit: string;
  unitColor: string;
  description: string;
  imageFile: string;
  dimensions: DimensionScores;
}

export interface Question {
  id: number;
  text: string;
  dimension: DimensionKey;
  reversed: boolean;
}

export interface DimensionMeta {
  key: DimensionKey;
  label: string;
  labelJa: string;
  shortLabel: string;
  description: string;
}

export interface MatchResult {
  character: CharacterProfile;
  distance: number;
  similarity: number;
  percentage: number;
}
