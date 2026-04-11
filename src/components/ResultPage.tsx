import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import type { MatchResult, DimensionKey } from '../types';
import { dimensions } from '../data/dimensions';
import { calculateDimensionScores } from '../utils/matching';
import { captureElement, downloadBlob, fetchImageAsDataUrl } from '../utils/exportImage';
import CharacterCard from './CharacterCard';
import NicknameModal from './NicknameModal';
import ExportCard from './ExportCard';
import ExportPreviewModal from './ExportPreviewModal';
import { useLocale } from '../i18n';
import type { TranslationKey } from '../i18n';

interface ResultPageProps {
  results: MatchResult[];
  answers: Record<number, number>;
  confirmingReset: boolean;
  onConfirmReset: () => void;
}

const dimensionOrder: DimensionKey[] = [
  'extraversion', 'emotionalStability', 'assertiveness', 'warmth',
  'openness', 'discipline', 'authenticity', 'optimism',
];

const dimLabelKeys: Record<DimensionKey, TranslationKey> = {
  extraversion: 'dim.extraversion',
  emotionalStability: 'dim.emotionalStability',
  assertiveness: 'dim.assertiveness',
  warmth: 'dim.warmth',
  openness: 'dim.openness',
  discipline: 'dim.discipline',
  authenticity: 'dim.authenticity',
  optimism: 'dim.optimism',
};

const dimShortKeys: Record<DimensionKey, TranslationKey> = {
  extraversion: 'dim.extraversion.short',
  emotionalStability: 'dim.emotionalStability.short',
  assertiveness: 'dim.assertiveness.short',
  warmth: 'dim.warmth.short',
  openness: 'dim.openness.short',
  discipline: 'dim.discipline.short',
  authenticity: 'dim.authenticity.short',
  optimism: 'dim.optimism.short',
};

export default function ResultPage({ results, answers, confirmingReset, onConfirmReset }: ResultPageProps) {
  const navigate = useNavigate();
  const { t } = useLocale();
  const top3 = results.slice(0, 3);
  const best = top3[0];
  const userScores = calculateDimensionScores(answers);
  const [nicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportNickname, setExportNickname] = useState('');
  const [charImageDataUrl, setCharImageDataUrl] = useState<string | undefined>(undefined);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const exportCardRef = useRef<HTMLDivElement>(null);

  const userLabel = t('result.radarUser');
  const dimensionLabels = dimensionOrder.map((key) => t(dimLabelKeys[key]));

  const handleExportConfirm = useCallback(async (nickname: string) => {
    setNicknameModalOpen(false);
    setExporting(true);

    // Fetch character image as data URL first (before mounting ExportCard)
    let imgDataUrl: string | undefined;
    try {
      imgDataUrl = await fetchImageAsDataUrl(best.character.imageUrl);
    } catch {
      // CORS or network error — ExportCard will show fallback
    }

    // Now mount ExportCard with the image ready
    setCharImageDataUrl(imgDataUrl);
    setExportNickname(nickname);

    // Wait for ExportCard to render with the image
    await new Promise((r) => setTimeout(r, 400));

    try {
      if (!exportCardRef.current) throw new Error('ExportCard not mounted');
      const blob = await captureElement(exportCardRef.current);
      const url = URL.createObjectURL(blob);
      setPreviewImageUrl(url);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setExporting(false);
    }
  }, [best]);

  const handlePreviewDownload = useCallback(() => {
    if (!previewImageUrl) return;
    downloadBlob(previewImageUrl, `283-personality-${exportNickname}.png`);
  }, [previewImageUrl, exportNickname]);

  const handlePreviewClose = useCallback(() => {
    if (previewImageUrl) URL.revokeObjectURL(previewImageUrl);
    setPreviewImageUrl(null);
  }, [previewImageUrl]);

  const radarData = dimensionOrder.map((key) => {
    return {
      dimension: t(dimShortKeys[key]),
      [userLabel]: userScores[key],
      [best.character.nameJa]: best.character.dimensions[key],
    };
  });

  return (
    <div className="min-h-screen">
      {/* Light section — Header & Best Match */}
      <div className="px-4 pt-12 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <p className="text-xs tracking-widest text-stone-gray dark:text-warm-silver uppercase mb-4">{t('result.subtitle')}</p>
            <h1 className="font-serif-display text-3xl sm:text-4xl text-near-black dark:text-ivory mb-3" style={{ lineHeight: 1.20 }}>
              {t('result.title')}
            </h1>
            <p className="text-olive-gray dark:text-warm-silver" style={{ lineHeight: 1.60 }}>{t('result.description')}</p>
          </div>

          <div className="mb-10">
            <div className="text-center mb-5 animate-fade-in-up stagger-2">
              <span
                className="inline-block px-4 py-1.5 bg-ivory dark:bg-dark-surface text-terracotta rounded-full text-sm font-medium"
                style={{ boxShadow: 'var(--tag-ring)' }}
              >
                {t('result.bestMatch')}
              </span>
            </div>
            <div className="max-w-sm mx-auto animate-scale-in stagger-3">
              <CharacterCard
                character={best.character}
                rank={1}
                percentage={best.percentage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dark section — Radar Chart */}
      <div className="bg-near-black px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif-display text-xl text-ivory mb-6 text-center" style={{ lineHeight: 1.20 }}>
            {t('result.radarTitle')}
          </h2>
          <div className="rounded-2xl p-3 sm:p-6" style={{ backgroundColor: '#30302e', border: '1px solid #30302e' }}>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData} margin={{ top: 20, right: 50, bottom: 20, left: 50 }}>
                <PolarGrid stroke="#4d4c48" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: '#b0aea5' }} />
                <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 10, fill: '#87867f' }} />
                <Radar
                  name={userLabel}
                  dataKey={userLabel}
                  stroke="#c96442"
                  fill="#c96442"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name={best.character.nameJa}
                  dataKey={best.character.nameJa}
                  stroke="#b0aea5"
                  fill="#b0aea5"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Legend wrapperStyle={{ fontSize: 13, color: '#b0aea5' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Light section — Top 2 & 3, Scores */}
      <div className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {top3.length > 1 && (
            <div className="mb-14">
              <h2 className="font-serif-display text-xl text-near-black dark:text-ivory mb-6 text-center" style={{ lineHeight: 1.20 }}>
                {t('result.otherMatches')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {top3.slice(1).map((result, i) => (
                  <CharacterCard
                    key={result.character.id}
                    character={result.character}
                    rank={i + 2}
                    percentage={result.percentage}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mb-14">
            <span className="block w-16 h-px bg-border-warm dark:bg-dark-warm" />
            <span className="block w-1.5 h-1.5 rounded-full bg-terracotta" />
            <span className="block w-16 h-px bg-border-warm dark:bg-dark-warm" />
          </div>

          {/* User scores */}
          <div
            className="bg-ivory dark:bg-dark-surface rounded-2xl p-6 sm:p-8 mb-12"
            style={{ border: '1px solid var(--card-border-color)', boxShadow: 'var(--card-shadow)' }}
          >
            <h2 className="font-serif-display text-xl text-near-black dark:text-ivory mb-6" style={{ lineHeight: 1.20 }}>
              {t('result.userScores')}
            </h2>
            <div className="space-y-4">
              {dimensions.map((dim) => {
                const label = t(dimLabelKeys[dim.key]);
                return (
                  <div key={dim.key} className="flex items-center gap-3">
                    <span className="w-20 text-sm text-olive-gray dark:text-warm-silver shrink-0">{label}</span>
                    <div className="flex-1 h-2 bg-border-cream dark:bg-dark-warm rounded-full overflow-hidden">
                      <div
                        className="h-full bg-terracotta rounded-full transition-all duration-500"
                        style={{ width: `${userScores[dim.key] * 10}%`, opacity: 0.7 + (userScores[dim.key] / 10) * 0.3 }}
                      />
                    </div>
                    <span className="w-6 text-right text-sm text-stone-gray dark:text-warm-silver">{userScores[dim.key]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setNicknameModalOpen(true)}
                disabled={exporting}
                className="px-8 py-3 bg-terracotta text-ivory rounded-xl text-sm font-medium hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ boxShadow: '#c96442 0px 0px 0px 0px, #c96442 0px 0px 0px 1px' }}
              >
                {exporting ? t('export.exporting') : t('export.button')}
              </button>
              <button
                onClick={onConfirmReset}
                className={`px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-all cursor-pointer ${
                  confirmingReset
                    ? 'bg-[#b53333] text-ivory'
                    : 'bg-dark-surface text-ivory'
                }`}
                style={{
                  boxShadow: confirmingReset
                    ? '#b53333 0px 0px 0px 0px, #b53333 0px 0px 0px 1px'
                    : 'var(--btn-dark-ring)'
                }}
              >
                {confirmingReset ? t('result.confirmClear') : t('result.retake')}
              </button>
            </div>
            <button
              onClick={() => navigate('/characters')}
              className="text-sm text-stone-gray dark:text-warm-silver hover:text-dark-warm dark:hover:text-ivory transition-colors cursor-pointer"
            >
              {t('result.viewAll')}
            </button>
          </div>
        </div>
      </div>

      {/* Nickname modal */}
      <NicknameModal
        open={nicknameModalOpen}
        onConfirm={handleExportConfirm}
        onClose={() => setNicknameModalOpen(false)}
      />

      {/* Preview modal */}
      <ExportPreviewModal
        open={!!previewImageUrl}
        imageUrl={previewImageUrl || ''}
        filename={`283-personality-${exportNickname}.png`}
        onDownload={handlePreviewDownload}
        onClose={handlePreviewClose}
      />

      {/* Hidden export card */}
      {(exporting || exportNickname) && (
        <ExportCard
          ref={exportCardRef}
          nickname={exportNickname}
          character={best.character}
          userScores={userScores}
          percentage={best.percentage}
          dimensionLabels={dimensionLabels}
          characterImageDataUrl={charImageDataUrl}
          brandText={t('export.brand')}
          headlineSuffix={t('export.headlineSuffix')}
          similarityText={t('export.similarity', { name: best.character.nameJa, percentage: best.percentage })}
          siteUrl={t('export.siteUrl')}
        />
      )}
    </div>
  );
}
