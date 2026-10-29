import type { Question } from "../types";

export const questions: Question[] = [
  // ========== ENERGY ==========
  {
    id: 1,
    text: {
      en: "I feel energized after hanging out with a big group of people.",
      ru: "После общения с большой компанией людей я чувствую прилив сил.",
    },
    dimension: "energy",
    reversed: false,
  },
  {
    id: 2,
    text: {
      en: "I prefer quiet, low-key activities over loud and lively ones.",
      ru: "Я предпочитаю спокойные занятия шумным и оживлённым.",
    },
    dimension: "energy",
    reversed: true,
  },
  {
    id: 3,
    text: {
      en: "I can comfortably move from one social interaction to another without needing a quiet break.",
      ru: "Я легко переключаюсь с одного общения на другое и не нуждаюсь в тихом перерыве.",
    },
    dimension: "energy",
    reversed: false,
  },
  {
    id: 4,
    text: {
      en: "After a long day of socializing, I need a lot of alone time to recover.",
      ru: "После долгого дня общения мне нужно много времени побыть одной, чтобы восстановиться.",
    },
    dimension: "energy",
    reversed: true,
  },
  {
    id: 5,
    text: {
      en: "I get bored quickly if things are too calm or quiet.",
      ru: "Мне быстро становится скучно, если вокруг слишком спокойно и тихо.",
    },
    dimension: "energy",
    reversed: false,
  },

  // ========== WARMTH ==========
  {
    id: 6,
    text: {
      en: "I often notice when someone is feeling down, even if they don’t say anything.",
      ru: "Я часто замечаю, когда кому-то грустно, даже если человек не говорит об этом.",
    },
    dimension: "warmth",
    reversed: false,
  },
  {
    id: 7,
    text: {
      en: "I make an effort to respond with kindness when someone shares something personal with me.",
      ru: "Я стараюсь отвечать с добротой, когда кто-то делится со мной чем-то личным.",
    },
    dimension: "warmth",
    reversed: false,
  },
  {
    id: 8,
    text: {
      en: "I sometimes come across as cold or distant without meaning to.",
      ru: "Иногда я кажусь холодной или отстранённой, хотя не подразумеваю этого.",
    },
    dimension: "warmth",
    reversed: true,
  },
  {
    id: 9,
    text: {
      en: "People often come to me when they need someone to talk to.",
      ru: "Люди часто обращаются ко мне, когда им нужно с кем-то поговорить.",
    },
    dimension: "warmth",
    reversed: false,
  },
  {
    id: 10,
    text: {
      en: "I find it difficult to show compassion toward people whose problems I cannot relate to.",
      ru: "Мне трудно сочувствовать людям, чьи проблемы мне незнакомы.",
    },
    dimension: "warmth",
    reversed: true,
  },

  // ========== DRIVE ==========
  {
    id: 11,
    text: {
      en: "I feel frustrated when I’m not improving or achieving something.",
      ru: "Меня расстраивает, если я не развиваюсь и не добиваюсь никаких результатов.",
    },
    dimension: "drive",
    reversed: false,
  },
  {
    id: 12,
    text: {
      en: "I’m fine with just having fun, even if I’m not the best at something.",
      ru: "Мне достаточно просто получать удовольствие, даже если я не лучшая в чём-либо.",
    },
    dimension: "drive",
    reversed: true,
  },
  {
    id: 13,
    text: {
      en: "I set high goals for myself and push hard to reach them.",
      ru: "Я ставлю перед собой высокие цели и упорно стремлюсь к ним.",
    },
    dimension: "drive",
    reversed: false,
  },
  {
    id: 14,
    text: {
      en: "Competing with others motivates me more than it stresses me out.",
      ru: "Соревнование с другими скорее мотивирует меня, чем вызывает стресс.",
    },
    dimension: "drive",
    reversed: false,
  },
  {
    id: 15,
    text: {
      en: "I enjoy measuring my progress against clear standards of achievement.",
      ru: "Мне нравится оценивать свой прогресс по чётким критериям достижений.",
    },
    dimension: "drive",
    reversed: false,
  },

  // ========== DISCIPLINE ==========
  {
    id: 16,
    text: {
      en: "I like having a clear plan and sticking to it.",
      ru: "Мне нравится иметь чёткий план и придерживаться его.",
    },
    dimension: "discipline",
    reversed: false,
  },
  {
    id: 17,
    text: {
      en: "I tend to go with the flow rather than follow a strict schedule.",
      ru: "Я предпочитаю действовать по обстоятельствам, а не следовать строгому распорядку.",
    },
    dimension: "discipline",
    reversed: true,
  },
  {
    id: 18,
    text: {
      en: "I feel uncomfortable when things are messy or disorganized.",
      ru: "Я чувствую себя неуютно, когда вокруг беспорядок.",
    },
    dimension: "discipline",
    reversed: false,
  },
  {
    id: 19,
    text: {
      en: "I usually take care of routine responsibilities before moving on to more enjoyable activities.",
      ru: "Обычно я сначала выполняю повседневные обязанности и только потом перехожу к более приятным занятиям.",
    },
    dimension: "discipline",
    reversed: false,
  },
  {
    id: 20,
    text: {
      en: "I often leave things until the last minute.",
      ru: "Я часто откладываю дела на последний момент.",
    },
    dimension: "discipline",
    reversed: true,
  },

  // ========== CREATIVITY ==========
  {
    id: 21,
    text: {
      en: "I enjoy coming up with unusual or unconventional ideas.",
      ru: "Мне нравится придумывать необычные и нестандартные идеи.",
    },
    dimension: "creativity",
    reversed: false,
  },
  {
    id: 22,
    text: {
      en: "I prefer proven methods over trying something completely new.",
      ru: "Я предпочитаю проверенные способы попыткам сделать что-то по новому.",
    },
    dimension: "creativity",
    reversed: true,
  },
  {
    id: 23,
    text: {
      en: "People sometimes say my way of thinking is a bit strange or unique.",
      ru: "Люди иногда говорят, что я мыслю немного странно или необычно.",
    },
    dimension: "creativity",
    reversed: false,
  },
  {
    id: 24,
    text: {
      en: "I get excited by weird or abstract concepts.",
      ru: "Меня увлекают странные или абстрактные идеи.",
    },
    dimension: "creativity",
    reversed: false,
  },
  {
    id: 25,
    text: {
      en: "I feel most comfortable when things are straightforward and practical.",
      ru: "Я чувствую себя наиболее комфортно, когда всё просто и практично.",
    },
    dimension: "creativity",
    reversed: true,
  },

  // ========== CONFIDENCE ==========
  {
    id: 26,
    text: {
      en: "I am comfortable taking responsibility for the quality of my own work.",
      ru: "Мне комфортно брать ответственность за качество собственной работы.",
    },
    dimension: "confidence",
    reversed: false,
  },
  {
    id: 27,
    text: {
      en: "I often second-guess myself even when I know what I’m doing.",
      ru: "Я часто сомневаюсь в себе, даже если я знаю, что делаю.",
    },
    dimension: "confidence",
    reversed: true,
  },
  {
    id: 28,
    text: {
      en: "I can speak up easily in a group, even if my opinion is different.",
      ru: "Я легко высказываюсь в компании, даже если моё мнение отличается от мнения остальных.",
    },
    dimension: "confidence",
    reversed: false,
  },
  {
    id: 29,
    text: {
      en: "I tend to downplay my accomplishments when talking about them with others.",
      ru: "Рассказывая о своих достижениях, я обычно преуменьшаю их значимость.",
    },
    dimension: "confidence",
    reversed: true,
  },
  {
    id: 30,
    text: {
      en: "When I succeed at something, I feel proud rather than surprised.",
      ru: "Когда у меня что-то получается, я скорее горжусь собой, чем удивляюсь.",
    },
    dimension: "confidence",
    reversed: false,
  },

  // ========== OPTIMISM ==========
  {
    id: 31,
    text: {
      en: "I usually believe things will work out in the end.",
      ru: "Обычно я верю, что в конце концов всё сложится хорошо.",
    },
    dimension: "optimism",
    reversed: false,
  },
  {
    id: 32,
    text: {
      en: "I tend to focus more on what could go wrong than what could go right.",
      ru: "Я чаще думаю о том, что может пойти не так, чем о том, что может получиться.",
    },
    dimension: "optimism",
    reversed: true,
  },
  {
    id: 33,
    text: {
      en: "Even when things are difficult, I try to stay positive.",
      ru: "Даже в трудные времена я стараюсь сохранять оптимизм.",
    },
    dimension: "optimism",
    reversed: false,
  },
  {
    id: 34,
    text: {
      en: "I get discouraged easily when plans don’t go smoothly.",
      ru: "Я легко падаю духом, когда планы идут не так, как хотелось бы.",
    },
    dimension: "optimism",
    reversed: true,
  },
  {
    id: 35,
    text: {
      en: "I naturally look for the bright side in most situations.",
      ru: "В большинстве ситуаций я естественным образом стараюсь увидеть хорошее.",
    },
    dimension: "optimism",
    reversed: false,
  },

  // ========== INDEPENDENCE ==========
  {
    id: 36,
    text: {
      en: "I prefer making decisions on my own rather than relying on the group.",
      ru: "Я предпочитаю принимать решения самостоятельно, а не полагаться на группу.",
    },
    dimension: "independence",
    reversed: false,
  },
  {
    id: 37,
    text: {
      en: "I prefer to figure things out for myself before asking others for help.",
      ru: "Я предпочитаю сначала разобраться самостоятельно и только потом просить помощь.",
    },
    dimension: "independence",
    reversed: false,
  },
  {
    id: 38,
    text: {
      en: "I often do things my own way even if others disagree.",
      ru: "Я часто поступаю по-своему, даже если другие не согласны.",
    },
    dimension: "independence",
    reversed: false,
  },
  {
    id: 39,
    text: {
      en: "I dislike standing out too much from the people around me.",
      ru: "Мне не нравится слишком сильно выделяться среди окружающих.",
    },
    dimension: "independence",
    reversed: true,
  },
  {
    id: 40,
    text: {
      en: "I am comfortable pursuing a personal project without needing others to participate.",
      ru: "Мне комфортно заниматься личным проектом, даже если никто больше не участвует.",
    },
    dimension: "independence",
    reversed: false,
  },
];
