const en = {
  // Landing page
  'landing.subtitle': 'Personality Quiz',
  'landing.title': 'Love Live! Personality Quiz',
  'landing.savedProgress': 'You have an unfinished quiz',
  'landing.savedCount': 'Completed {done}/{total} questions',
  'landing.resume': 'Continue',
  'landing.viewResults': 'View Results',
  'landing.restart': 'Start Over →',
  'landing.confirmClear': 'Confirm clear?',
  'landing.description': 'Answer {total} personality questions\nand find the Love Live! character most like you!',
  'landing.start': 'Start Quiz',
  'landing.browseCharacters': 'Browse characters first →',

  // Quiz
  'quiz.back': '← Back to Home',
  'quiz.confirmExit': 'Confirm exit?',
  'quiz.prev': 'Previous',
  'quiz.next': 'Next',
  'quiz.viewResults': 'View Results',

  // Likert scale
  'likert.agree': 'Agree',
  'likert.disagree': 'Disagree',
  'likert.7': 'Strongly agree',
  'likert.6': 'Agree',
  'likert.5': 'Slightly agree',
  'likert.4': 'Neutral',
  'likert.3': 'Slightly disagree',
  'likert.2': 'Disagree',
  'likert.1': 'Strongly disagree',
  'likert.aria': 'Choose your level of agreement',

  // Question card
  'question.label': 'Q{index} / {total}',

  // Result page
  'result.subtitle': 'Result',
  'result.title': 'Your Result',
  'result.description': 'The Love Live! character most like you',
  'result.bestMatch': 'Best Match',
  'result.radarTitle': 'Dimension Comparison',
  'result.radarUser': 'You',
  'result.otherMatches': 'Other Similar Characters',
  'result.userScores': 'Your Dimension Scores',
  'result.share': 'Share Result',
  'result.copied': 'Copied to clipboard',
  'result.retake': 'Retake Quiz',
  'result.confirmClear': 'Confirm clear?',
  'result.viewAll': 'View All Characters →',
  'result.shareText': 'I matched with {name} in the Love Live! Personality Quiz — {percentage}% similarity!',
  'result.shareTitle': 'Love Live! Personality Quiz Result',

  // Character list page
  'charList.back': '← Back to Home',
  'charList.title': 'Character Gallery',
  'charList.subtitle': 'Love Live! — All {count} Idols',
  'charList.start': 'Start Quiz',
  'charList.count': '{count} members',
  'charList.expandHint': 'Click to view dimensions',
  'charList.ariaExpand': '{name} — Expand dimension details',
  'charList.ariaCollapse': '{name} — Collapse dimension details',

  // Character card
  'charCard.noImage': 'Image pending',
  'charCard.similarity': '{percentage}% similarity',
  'charCard.rankAria': 'Rank #{rank}',

  // Disclaimer modal
  'disclaimer.title': 'About This Project',
  'disclaimer.close': 'Close',
  'disclaimer.okay': 'Got it',
  'disclaimer.p1': 'This personality quiz is subjective and intended for entertainment only.',
  'disclaimer.p2': 'This is a {highlight} and is not affiliated with or endorsed by any official rights holder.',
  'disclaimer.p2.highlight': 'fan-made project',
  'disclaimer.p3': 'Love Live! and Nijigasaki High School Idol Club characters, names, and artwork belong to their respective rights holders.',
  'disclaimer.p4': 'This is a fully client-side application. All quiz data is stored locally in your browser and is never sent to any server.',

  // Theme toggle
  'theme.light': 'Switch to light mode',
  'theme.dark': 'Switch to dark mode',

  // Top bar
  'topbar.about': 'About this project',
  'topbar.nav': 'Site navigation',
  'language.switchToEnglish': 'Switch language to English',
  'language.switchToRussian': 'Switch language to Russian',

  // Progress bar
  'progress.aria': 'Completed {current} / {total} questions',

 // Dimensions
  'dim.energy': 'Energy',
  'dim.warmth': 'Warmth',
  'dim.drive': 'Drive',
  'dim.discipline': 'Discipline',
  'dim.creativity': 'Creativity',
  'dim.confidence': 'Confidence',
  'dim.optimism': 'Optimism',
  'dim.independence': 'Independence',

  'dim.energy.short': 'Energy',
  'dim.warmth.short': 'Warmth',
  'dim.drive.short': 'Drive',
  'dim.discipline.short': 'Discipline',
  'dim.creativity.short': 'Creative',
  'dim.confidence.short': 'Confidence',
  'dim.optimism.short': 'Optimism',
  'dim.independence.short': 'Independ.',

  'dim.energy.desc': 'Social battery and genki level — how much you recharge around people vs alone',
  'dim.warmth.desc': 'Caring and emotional support tendency — how much you prioritize others’ feelings',
  'dim.drive.desc': 'Ambition and competitive spirit — how strongly you want to improve and win',
  'dim.discipline.desc': 'Structure, responsibility and self-control — how much you stick to plans and rules',
  'dim.creativity.desc': 'Originality and free-thinking — how much you enjoy unusual or artistic ideas',
  'dim.confidence.desc': 'Self-assurance and stage presence — how comfortable you are being the center of attention',
  'dim.optimism.desc': 'Positive outlook — how much you tend to believe things will work out',
  'dim.independence.desc': 'Self-reliance vs group orientation — how much you prefer doing things your own way',

  // Export image
  'export.button': 'Export Image',
  'export.exporting': 'Generating...',
  'export.nicknameTitle': 'Enter your nickname',
  'export.nicknamePlaceholder': 'Your name',
  'export.nicknameConfirm': 'Generate Image',
  'export.nicknameCancel': 'Cancel',
  'export.brand': 'Love Live! Personality Quiz',
  'export.headlineSuffix': "'s Love Live! Match",
  'export.similarity': "My similarity to {name} is {percentage}% — try it too!",
  'export.siteUrl': 'lovelive-test',
  'export.previewTitle': 'Image Preview',
  'export.previewDownload': 'Save Image',
  'export.previewClose': 'Close',
};

export default en;
export type TranslationKey = keyof typeof en;
