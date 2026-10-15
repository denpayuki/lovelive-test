import type { Question } from "../types";

export const questions: Question[] = [
  // ========== ENERGY ==========
  {
    id: 1,
    text: {
      en: "I feel energized after hanging out with a big group of people.",
    },
    dimension: "energy",
    reversed: false,
  },
  {
    id: 2,
    text: {
      en: "I prefer quiet, low-key activities over loud and lively ones.",
    },
    dimension: "energy",
    reversed: true,
  },
  {
    id: 3,
    text: {
      en: "When I’m at an event, I naturally end up talking to a lot of different people.",
    },
    dimension: "energy",
    reversed: false,
  },
  {
    id: 4,
    text: {
      en: "After a long day of socializing, I need a lot of alone time to recover.",
    },
    dimension: "energy",
    reversed: true,
  },
  {
    id: 5,
    text: {
      en: "I get bored quickly if things are too calm or quiet.",
    },
    dimension: "energy",
    reversed: false,
  },

  // ========== WARMTH ==========
  {
    id: 6,
    text: {
      en: "I often notice when someone is feeling down, even if they don’t say anything.",
    },
    dimension: "warmth",
    reversed: false,
  },
  {
    id: 7,
    text: {
      en: "I find it easy to put other people’s feelings ahead of my own.",
    },
    dimension: "warmth",
    reversed: false,
  },
  {
    id: 8,
    text: {
      en: "I sometimes come across as cold or distant without meaning to.",
    },
    dimension: "warmth",
    reversed: true,
  },
  {
    id: 9,
    text: {
      en: "People often come to me when they need someone to talk to.",
    },
    dimension: "warmth",
    reversed: false,
  },
  {
    id: 10,
    text: {
      en: "I prefer solving problems logically rather than focusing on emotions.",
    },
    dimension: "warmth",
    reversed: true,
  },

  // ========== DRIVE ==========
  {
    id: 11,
    text: {
      en: "I feel frustrated when I’m not improving or achieving something.",
    },
    dimension: "drive",
    reversed: false,
  },
  {
    id: 12,
    text: {
      en: "I’m fine with just having fun, even if I’m not the best at something.",
    },
    dimension: "drive",
    reversed: true,
  },
  {
    id: 13,
    text: {
      en: "I set high goals for myself and push hard to reach them.",
    },
    dimension: "drive",
    reversed: false,
  },
  {
    id: 14,
    text: {
      en: "Competing with others motivates me more than it stresses me out.",
    },
    dimension: "drive",
    reversed: false,
  },
  {
    id: 15,
    text: {
      en: "I often lose interest once something stops feeling challenging.",
    },
    dimension: "drive",
    reversed: false,
  },

  // ========== DISCIPLINE ==========
  {
    id: 16,
    text: {
      en: "I like having a clear plan and sticking to it.",
    },
    dimension: "discipline",
    reversed: false,
  },
  {
    id: 17,
    text: {
      en: "I tend to go with the flow rather than follow a strict schedule.",
    },
    dimension: "discipline",
    reversed: true,
  },
  {
    id: 18,
    text: {
      en: "I feel uncomfortable when things are messy or disorganized.",
    },
    dimension: "discipline",
    reversed: false,
  },
  {
    id: 19,
    text: {
      en: "Deadlines and rules help me work better rather than restrict me.",
    },
    dimension: "discipline",
    reversed: false,
  },
  {
    id: 20,
    text: {
      en: "I often leave things until the last minute.",
    },
    dimension: "discipline",
    reversed: true,
  },

  // ========== CREATIVITY ==========
  {
    id: 21,
    text: {
      en: "I enjoy coming up with unusual or unconventional ideas.",
    },
    dimension: "creativity",
    reversed: false,
  },
  {
    id: 22,
    text: {
      en: "I prefer proven methods over trying something completely new.",
    },
    dimension: "creativity",
    reversed: true,
  },
  {
    id: 23,
    text: {
      en: "People sometimes say my way of thinking is a bit strange or unique.",
    },
    dimension: "creativity",
    reversed: false,
  },
  {
    id: 24,
    text: {
      en: "I get excited by weird or abstract concepts.",
    },
    dimension: "creativity",
    reversed: false,
  },
  {
    id: 25,
    text: {
      en: "I feel most comfortable when things are straightforward and practical.",
    },
    dimension: "creativity",
    reversed: true,
  },

  // ========== CONFIDENCE ==========
  {
    id: 26,
    text: {
      en: "I usually feel comfortable being the center of attention.",
    },
    dimension: "confidence",
    reversed: false,
  },
  {
    id: 27,
    text: {
      en: "I often second-guess myself even when I know what I’m doing.",
    },
    dimension: "confidence",
    reversed: true,
  },
  {
    id: 28,
    text: {
      en: "I can speak up easily in a group, even if my opinion is different.",
    },
    dimension: "confidence",
    reversed: false,
  },
  {
    id: 29,
    text: {
      en: "I tend to stay in the background rather than stand out.",
    },
    dimension: "confidence",
    reversed: true,
  },
  {
    id: 30,
    text: {
      en: "When I succeed at something, I feel proud rather than surprised.",
    },
    dimension: "confidence",
    reversed: false,
  },

  // ========== OPTIMISM ==========
  {
    id: 31,
    text: {
      en: "I usually believe things will work out in the end.",
    },
    dimension: "optimism",
    reversed: false,
  },
  {
    id: 32,
    text: {
      en: "I tend to focus more on what could go wrong than what could go right.",
    },
    dimension: "optimism",
    reversed: true,
  },
  {
    id: 33,
    text: {
      en: "Even when things are difficult, I try to stay positive.",
    },
    dimension: "optimism",
    reversed: false,
  },
  {
    id: 34,
    text: {
      en: "I get discouraged easily when plans don’t go smoothly.",
    },
    dimension: "optimism",
    reversed: true,
  },
  {
    id: 35,
    text: {
      en: "I naturally look for the bright side in most situations.",
    },
    dimension: "optimism",
    reversed: false,
  },

  // ========== INDEPENDENCE ==========
  {
    id: 36,
    text: {
      en: "I prefer making decisions on my own rather than relying on the group.",
    },
    dimension: "independence",
    reversed: false,
  },
  {
    id: 37,
    text: {
      en: "I feel most comfortable when I’m part of a close-knit group.",
    },
    dimension: "independence",
    reversed: true,
  },
  {
    id: 38,
    text: {
      en: "I often do things my own way even if others disagree.",
    },
    dimension: "independence",
    reversed: false,
  },
  {
    id: 39,
    text: {
      en: "I dislike standing out too much from the people around me.",
    },
    dimension: "independence",
    reversed: true,
  },
  {
    id: 40,
    text: {
      en: "I value having my own space and freedom more than belonging.",
    },
    dimension: "independence",
    reversed: false,
  },
];