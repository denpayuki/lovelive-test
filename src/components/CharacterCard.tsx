import { useState } from 'react';
import type { CharacterProfile, DimensionKey } from '../types';
import { useLocale } from '../i18n';
import type { TranslationKey } from '../i18n';
import { characterDescriptions } from '../i18n/description';

interface CharacterCardProps {
  character: CharacterProfile;
  rank?: number;
  percentage?: number;
  showDimensions?: boolean;
}

const dimensionKeys: { key: DimensionKey; labelKey: TranslationKey }[] = [
  { key: 'energy', labelKey: 'dim.energy.short' },
  { key: 'warmth', labelKey: 'dim.warmth.short' },
  { key: 'drive', labelKey: 'dim.drive.short' },
  { key: 'discipline', labelKey: 'dim.discipline.short' },
  { key: 'creativity', labelKey: 'dim.creativity.short' },
  { key: 'confidence', labelKey: 'dim.confidence.short' },
  { key: 'optimism', labelKey: 'dim.optimism.short' },
  { key: 'independence', labelKey: 'dim.independence.short' },
];

export default function CharacterCard({ character, rank, percentage, showDimensions }: CharacterCardProps) {
  const [imgError, setImgError] = useState(false);
  const { t } = useLocale();
  const description = characterDescriptions[character.id];

  return (
    <div
      className="bg-ivory dark:bg-dark-surface rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-2px]"
      style={{
        border: '1px solid var(--card-border-color)',
        boxShadow: 'var(--card-shadow)',
      }}
    >
      {/* Image area */}
      <div className="relative aspect-square bg-parchment dark:bg-near-black flex items-center justify-center overflow-hidden">
        {imgError ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <span className="text-4xl mb-2 text-near-black dark:text-ivory">{character.name.charAt(0)}</span>
            <span className="text-sm text-stone-gray dark:text-warm-silver">{t('charCard.noImage')}</span>
          </div>
        ) : (
          <img
            src={character.imageUrl}
            alt={`${character.name}`}
            className="w-full h-full object-cover object-top"
            onError={() => setImgError(true)}
          />
        )}
        {rank && (
          <div
            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-ivory/90 dark:bg-dark-surface/90 backdrop-blur-sm flex items-center justify-center text-sm font-medium text-near-black dark:text-ivory"
            style={{ boxShadow: 'var(--badge-ring)' }}
            aria-label={t('charCard.rankAria', { rank })}
          >
            {rank}
          </div>
        )}
        {percentage !== undefined && (
          <div
            className="absolute top-3 right-3 px-3 py-1 rounded-full bg-ivory/90 dark:bg-dark-surface/90 backdrop-blur-sm text-sm font-medium text-terracotta"
            style={{ boxShadow: 'var(--badge-ring)' }}
            aria-label={t('charCard.similarity', { percentage })}
          >
            {t('charCard.similarity', { percentage })}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-serif-display text-lg text-near-black dark:text-ivory" style={{ lineHeight: 1.20 }}>
          {character.name}
        </h3>
        <div className="flex items-center gap-2 mt-1.5 mb-3">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: character.color }}
            aria-hidden="true"
          />
          <span className="text-sm text-olive-gray dark:text-warm-silver">{character.unit}</span>
        </div>
        <p className="text-sm text-olive-gray dark:text-warm-silver" style={{ lineHeight: 1.60 }}>{description}</p>

        {/* Expand hint — only when used in a list context where showDimensions toggles */}
        {showDimensions === false && (
          <p className="mt-3 text-xs text-stone-gray dark:text-warm-silver flex items-center gap-1">
            <span aria-hidden="true">▸</span> {t('charList.expandHint')}
          </p>
        )}

        {showDimensions && (
          <div className="mt-5 pt-4 space-y-2.5" style={{ borderTop: '1px solid var(--dim-separator)' }}>
            {dimensionKeys.map(({ key, labelKey }) => {
              const label = t(labelKey);
              return (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <span className="w-16 text-stone-gray dark:text-warm-silver shrink-0">{label}</span>
                  <div
                    className="flex-1 h-1.5 bg-border-cream dark:bg-dark-warm rounded-full overflow-hidden"
                    role="meter"
                    aria-label={label}
                    aria-valuenow={character.scores[key]}
                    aria-valuemin={0}
                    aria-valuemax={10}
                  >
                    <div
                      className="h-full bg-terracotta rounded-full"
                      style={{
                        width: `${character.scores[key] * 10}%`,
                        opacity: 0.5 + (character.scores[key] / 10) * 0.5,
                      }}
                    />
                  </div>
                  <span className="w-5 text-right text-stone-gray dark:text-warm-silver">{character.scores[key]}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
