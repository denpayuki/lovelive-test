import type { TranslationKey } from './zh';

const ja: Record<TranslationKey, string> = {
  // Landing page
  'landing.subtitle': 'Personality Quiz',
  'landing.title': 'シャイニーカラーズ パーソナリティ診断',
  'landing.titleJa': 'シャイニーカラーズ パーソナリティ診断',
  'landing.savedProgress': '未完了のテストがあります',
  'landing.savedCount': '{done}/{total} 問完了',
  'landing.resume': '続きから',
  'landing.viewResults': '結果を見る',
  'landing.restart': 'やり直す →',
  'landing.confirmClear': 'リセットしますか？',
  'landing.description': '{total} 問の性格診断に答えて、\nあなたに一番似ているアイドルを見つけよう！',
  'landing.start': '診断スタート',
  'landing.browseCharacters': 'まずキャラ一覧を見る →',

  // Quiz
  'quiz.back': '← ホームに戻る',
  'quiz.confirmExit': '終了しますか？',
  'quiz.prev': '前の問題',
  'quiz.next': '次の問題',
  'quiz.viewResults': '結果を見る',

  // Milestones
  'milestone.10.title': 'いい調子！',
  'milestone.10.subtitle': '最初の 10 問が完了しました',
  'milestone.20.title': '折り返し！',
  'milestone.20.subtitle': 'あなたのことがだんだん見えてきました',
  'milestone.30.title': 'あと少し！',
  'milestone.30.subtitle': '残りわずか、がんばって',
  'milestone.progress': '{done}/{total} 問',
  'milestone.continue': '続ける',

  // Likert scale
  'likert.agree': '同意',
  'likert.disagree': '非同意',
  'likert.7': '強く同意',
  'likert.6': '同意',
  'likert.5': 'やや同意',
  'likert.4': '中立',
  'likert.3': 'やや非同意',
  'likert.2': '非同意',
  'likert.1': '強く非同意',
  'likert.aria': '同意の度合いを選んでください',

  // Question card
  'question.label': 'Q{index} / {total}',

  // Result page
  'result.subtitle': 'Result',
  'result.title': '診断結果',
  'result.description': 'あなたに最も似ているアイドル',
  'result.bestMatch': 'ベストマッチ',
  'result.radarTitle': '次元比較',
  'result.radarUser': 'あなた',
  'result.otherMatches': '似ているキャラクター',
  'result.userScores': 'あなたのスコア',
  'result.share': '結果をシェア',
  'result.copied': 'コピーしました',
  'result.retake': 'もう一度診断',
  'result.confirmClear': 'リセットしますか？',
  'result.viewAll': '全キャラを見る →',
  'result.shareText': 'シャイニーカラーズ性格診断で{name}にマッチしました！類似度 {percentage}%！',
  'result.shareTitle': 'シャイニーカラーズ性格診断の結果',

  // Character list page
  'charList.back': '← ホームに戻る',
  'charList.title': 'キャラクター一覧',
  'charList.subtitle': 'シャイニーカラーズ 全28人',
  'charList.start': '診断スタート',
  'charList.count': '{count}人',
  'charList.expandHint': 'クリックして詳細を見る',
  'charList.ariaExpand': '{name} — 詳細を展開',
  'charList.ariaCollapse': '{name} — 詳細を閉じる',

  // Character card
  'charCard.noImage': '画像準備中',
  'charCard.similarity': '類似度 {percentage}%',
  'charCard.rankAria': '第{rank}位',

  // Disclaimer modal
  'disclaimer.title': 'このプロジェクトについて',
  'disclaimer.close': '閉じる',
  'disclaimer.okay': '了解',
  'disclaimer.p1': '本プロジェクトのコードとデータ収集は 100% {highlight} により生成されました。AI 生成コンテンツには偏りや誤りが含まれる可能性があり、診断結果はあくまで娯楽目的です。',
  'disclaimer.p1.highlight': 'Claude Opus 4.6',
  'disclaimer.p2': '本プロジェクトは{highlight}であり、バンダイナムコエンターテインメント、Project ShinyColors、その他公式団体とは一切関係ありません。',
  'disclaimer.p2.highlight': 'ファン制作作品',
  'disclaimer.p3': 'プロジェクトで使用されているキャラクター画像および関連素材の著作権は原著作権者に帰属します。問題がある場合は作者までご連絡ください。',

  // Theme toggle
  'theme.light': 'ライトモードに切り替え',
  'theme.dark': 'ダークモードに切り替え',

  // Top bar
  'topbar.about': 'このプロジェクトについて',

  // Progress bar
  'progress.aria': '{current} / {total} 問完了',

  // Language
  'lang.label': '言語',

  // Dimensions
  'dim.extraversion': '外向性',
  'dim.emotionalStability': '情緒安定性',
  'dim.assertiveness': '自己主張性',
  'dim.warmth': '温かさ',
  'dim.openness': '開放性',
  'dim.discipline': '勤勉性',
  'dim.authenticity': '素直さ',
  'dim.optimism': '楽観性',
  'dim.extraversion.short': '外向性',
  'dim.emotionalStability.short': '安定性',
  'dim.assertiveness.short': '主張性',
  'dim.warmth.short': '温かさ',
  'dim.openness.short': '開放性',
  'dim.discipline.short': '勤勉性',
  'dim.authenticity.short': '素直さ',
  'dim.optimism.short': '楽観性',
  'dim.extraversion.desc': '社交エネルギーの方向：高い＝社交でエネルギーを得る、低い＝一人の時間でエネルギーを得る',
  'dim.emotionalStability.desc': '感情の回復力：高い＝冷静で安定、低い＝不安になりやすい',
  'dim.assertiveness.desc': 'リーダーシップ：高い＝積極的に表現・競争、低い＝従順で協調的',
  'dim.warmth.desc': '思いやり：高い＝共感力が高く面倒見が良い、低い＝独立的でクール',
  'dim.openness.desc': '好奇心と創造性：高い＝新しいことが好き、低い＝伝統や慣習を好む',
  'dim.discipline.desc': '自律性：高い＝目標志向で勤勉、低い＝気ままで自由',
  'dim.authenticity.desc': '内面と外面の一致度：高い＝ありのまま、低い＝イメージを管理する',
  'dim.optimism.desc': '人生観：高い＝ポジティブで楽観的、低い＝現実的で慎重',
};

export default ja;
