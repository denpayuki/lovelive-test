import type { TranslationKey } from './en';

const ru: Record<TranslationKey, string> = {
  // Landing page
  'landing.subtitle': 'Тест личности',
  'landing.title': 'Тест личности Love Live!',
  'landing.savedProgress': 'У вас есть незавершённый тест',
  'landing.savedCount': 'Отвечено на вопросы: {done} из {total}',
  'landing.resume': 'Продолжить',
  'landing.viewResults': 'Посмотреть результат',
  'landing.restart': 'Начать заново →',
  'landing.confirmClear': 'Точно очистить?',
  'landing.description': 'Ответьте на {total} вопросов о вашей личности\nи узнайте, на какого персонажа Love Live! вы больше всего похожи!',
  'landing.start': 'Начать тест',
  'landing.browseCharacters': 'Сначала посмотреть персонажей →',

  // Quiz
  'quiz.back': '← На главную',
  'quiz.confirmExit': 'Точно выйти?',
  'quiz.prev': 'Назад',
  'quiz.next': 'Далее',
  'quiz.viewResults': 'Посмотреть результат',

  // Likert scale
  'likert.agree': 'Согласен',
  'likert.disagree': 'Не согласен',
  'likert.7': 'Полностью согласен',
  'likert.6': 'Согласен',
  'likert.5': 'Скорее согласен',
  'likert.4': 'Нейтрально',
  'likert.3': 'Скорее не согласен',
  'likert.2': 'Не согласен',
  'likert.1': 'Совершенно не согласен',
  'likert.aria': 'Выберите степень согласия',

  // Question card
  'question.label': 'Вопрос {index} из {total}',

  // Result page
  'result.subtitle': 'Результат',
  'result.title': 'Ваш результат',
  'result.description': 'Персонаж Love Live!, который больше всего на Вас похож',
  'result.bestMatch': 'Больше всего похожи',
  'result.radarTitle': 'Сравнение характеристик',
  'result.radarUser': 'Вы',
  'result.otherMatches': 'Другие похожие персонажи',
  'result.userScores': 'Ваши показатели',
  'result.share': 'Поделиться результатом',
  'result.copied': 'Скопировано в буфер обмена',
  'result.retake': 'Пройти тест ещё раз',
  'result.confirmClear': 'Точно очистить?',
  'result.viewAll': 'Посмотреть всех персонажей →',
  'result.shareText': 'В тесте личности Love Live! я больше всего похож(а) на {name} — сходство {percentage}%!',
  'result.shareTitle': 'Результат теста личности Love Live!',

  // Character list page
  'charList.back': '← На главную',
  'charList.title': 'Галерея персонажей',
  'charList.subtitle': 'Love Live! — все участницы: {count}',
  'charList.start': 'Начать тест',
  'charList.count': 'участниц: {count}',
  'charList.expandHint': 'Нажмите, чтобы увидеть характеристики',
  'charList.ariaExpand': '{name} — показать характеристики',
  'charList.ariaCollapse': '{name} — скрыть характеристики',

  // Character card
  'charCard.noImage': 'Изображение скоро появится',
  'charCard.similarity': 'Сходство: {percentage}%',
  'charCard.rankAria': 'Место: {rank}',

  // Disclaimer modal
  'disclaimer.title': 'О проекте',
  'disclaimer.close': 'Закрыть',
  'disclaimer.okay': 'Понятно',
  'disclaimer.p1': 'Этот тест субъективен и создан исключительно для развлечения.',
  'disclaimer.p2': 'Это {highlight}, не связанный с официальными правообладателями и не одобренный ими.',
  'disclaimer.p2.highlight': 'фанатский проект',
  'disclaimer.p3': 'Love Live!, а также персонажи, имена и изображения принадлежат соответствующим правообладателям.',
  'disclaimer.p4': 'Приложение полностью работает в браузере. Все данные теста хранятся локально и никогда не отправляются на сервер.',

  // Theme toggle
  'theme.light': 'Переключить на светлую тему',
  'theme.dark': 'Переключить на тёмную тему',

  // Top bar
  'topbar.about': 'О проекте',
  'topbar.nav': 'Навигация по сайту',
  'language.switchToEnglish': 'Переключить язык на английский',
  'language.switchToRussian': 'Переключить язык на русский',

  // Progress bar
  'progress.aria': 'Отвечено на вопросы: {current} из {total}',

  // Dimensions
  'dim.energy': 'Энергичность',
  'dim.warmth': 'Доброта',
  'dim.drive': 'Целеустремлённость',
  'dim.discipline': 'Дисциплина',
  'dim.creativity': 'Креативность',
  'dim.confidence': 'Уверенность',
  'dim.optimism': 'Оптимизм',
  'dim.independence': 'Самостоятельность',

  'dim.energy.short': 'Энергия',
  'dim.warmth.short': 'Доброта',
  'dim.drive.short': 'Цель',
  'dim.discipline.short': 'Порядок',
  'dim.creativity.short': 'Творчество',
  'dim.confidence.short': 'Уверенность',
  'dim.optimism.short': 'Оптимизм',
  'dim.independence.short': 'Самост.',

  'dim.energy.desc': 'Запас социальной энергии и бодрости — насколько общение помогает вам восстановить силы по сравнению с отдыхом в одиночестве',
  'dim.warmth.desc': 'Забота и эмоциональная поддержка — насколько для вас важны чувства других людей',
  'dim.drive.desc': 'Амбиции и дух соперничества — насколько сильно вы стремитесь развиваться и побеждать',
  'dim.discipline.desc': 'Организованность, ответственность и самоконтроль — насколько вы придерживаетесь планов и правил',
  'dim.creativity.desc': 'Оригинальность и свобода мышления — насколько вам интересны необычные и творческие идеи',
  'dim.confidence.desc': 'Уверенность в себе и умение держаться на сцене — насколько вам комфортно быть в центре внимания',
  'dim.optimism.desc': 'Позитивный взгляд на жизнь — насколько вы верите, что всё сложится хорошо',
  'dim.independence.desc': 'Самостоятельность и ориентация на группу — насколько вы предпочитаете действовать по-своему',

  // Export image
  'export.button': 'Сохранить изображение',
  'export.exporting': 'Создаём изображение...',
  'export.nicknameTitle': 'Введите своё имя',
  'export.nicknamePlaceholder': 'Ваше имя',
  'export.nicknameConfirm': 'Создать изображение',
  'export.nicknameCancel': 'Отмена',
  'export.brand': 'Тест личности Love Live!',
  'export.headlineSuffix': ' во вселенной Love Live!',
  'export.similarity': 'Я на {percentage}% похож(а) на {name}!',
  'export.siteUrl': 'lovelive-test',
  'export.previewTitle': 'Предпросмотр изображения',
  'export.previewDownload': 'Сохранить изображение',
  'export.previewClose': 'Закрыть',
};

export default ru;
