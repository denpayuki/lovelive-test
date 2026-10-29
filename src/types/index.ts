// ========== Dimension Keys ==========
export type DimensionKey =
  | "energy"
  | "warmth"
  | "drive"
  | "discipline"
  | "creativity"
  | "confidence"
  | "optimism"
  | "independence";

// ========== Scores ==========
export type DimensionScores = {
  [K in DimensionKey]: number; // 1–10
};

// ========== Dimension Metadata ==========
export interface DimensionMeta {
  key: DimensionKey;
  label: string;
  description: string;
  highLabel: string;
  lowLabel: string;
}

// ========== Character ==========
export interface CharacterProfile {
  id: number;
  name: string;
  nameJa: string;
  unit: string;
  color: string;
  scores: DimensionScores;
  // Optional fields you can add later:
  // description?: string;
  imageUrl: string;
}

// ========== Question ==========
export interface Question {
  id: number;
  text: {
    en: string;
    ru: string;
  };
  dimension: DimensionKey;
  reversed: boolean;
}

// ========== Match Result ==========
export interface MatchResult {
  character: CharacterProfile;
  distance: number;
  similarity: number;
  percentage: number;
}