import type { DimensionMeta } from "../types";

export const dimensions: DimensionMeta[] = [
  {
    key: "energy",
    label: "Energy",
    description: "Social battery and genki level — how much you recharge around people vs alone.",
    highLabel: "High Energy",
    lowLabel: "Low Energy",
  },
  {
    key: "warmth",
    label: "Warmth",
    description: "Caring and emotional support tendency — how much you prioritize others’ feelings.",
    highLabel: "Very Warm",
    lowLabel: "Cool / Reserved",
  },
  {
    key: "drive",
    label: "Drive",
    description: "Ambition and competitive spirit — how strongly you want to improve and win.",
    highLabel: "High Drive",
    lowLabel: "Laid-back",
  },
  {
    key: "discipline",
    label: "Discipline",
    description: "Structure, responsibility and self-control — how much you stick to plans and rules.",
    highLabel: "Highly Disciplined",
    lowLabel: "Flexible / Chaotic",
  },
  {
    key: "creativity",
    label: "Creativity",
    description: "Originality and free-thinking — how much you enjoy unusual or artistic ideas.",
    highLabel: "Highly Creative",
    lowLabel: "Practical",
  },
  {
    key: "confidence",
    label: "Confidence",
    description: "Self-assurance and stage presence — how comfortable you are being the center of attention.",
    highLabel: "Very Confident",
    lowLabel: "Low Confidence",
  },
  {
    key: "optimism",
    label: "Optimism",
    description: "Positive outlook — how much you tend to believe things will work out.",
    highLabel: "Very Optimistic",
    lowLabel: "Cautious / Pessimistic",
  },
  {
    key: "independence",
    label: "Independence",
    description: "Self-reliance vs group orientation — how much you prefer doing things your own way.",
    highLabel: "Highly Independent",
    lowLabel: "Group-oriented",
  },
];