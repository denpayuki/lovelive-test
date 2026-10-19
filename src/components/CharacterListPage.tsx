import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { characters } from '../data/characters';
import CharacterCard from './CharacterCard';
import { useLocale } from '../i18n';

const unitOrder = ["μ's", "Aqours", "Nijigasaki", "Liella!", "Hasunosora"];
const units = [...new Set(characters.map((character) => character.unit))].sort(
  (a, b) => unitOrder.indexOf(a) - unitOrder.indexOf(b),
);

export default function CharacterListPage() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { t } = useLocale();

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-stone-gray dark:text-warm-silver hover:text-dark-warm dark:hover:text-ivory transition-colors cursor-pointer flex items-center gap-1 mb-5 py-2 px-3 -ml-3"
          >
            {t('charList.back')}
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif-display text-3xl sm:text-4xl text-near-black dark:text-ivory" style={{ lineHeight: 1.20 }}>
                {t('charList.title')}
              </h1>
              <p className="text-sm text-olive-gray dark:text-warm-silver mt-2" style={{ lineHeight: 1.60 }}>
                {t('charList.subtitle', { count: characters.length })}
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2.5 text-sm rounded-lg bg-terracotta text-ivory hover:opacity-90 transition-all cursor-pointer"
              style={{ boxShadow: '#b83f6d 0px 0px 0px 0px, #b83f6d 0px 0px 0px 1px' }}
            >
              {t('charList.start')}
            </button>
          </div>
        </div>

        {/* Units */}
        {units.map((unit) => {
          const unitCharacters = characters
            .filter((character) => character.unit === unit)
            .sort((a, b) => a.id - b.id);
          const unitColor = '#b83f6d';

          return (
            <section key={unit} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: unitColor }}
                />
                <h2 className="font-serif-display text-xl text-near-black dark:text-ivory" style={{ lineHeight: 1.20 }}>
                  {unit}
                </h2>
                <span className="text-sm text-stone-gray dark:text-warm-silver">
                  {t('charList.count', { count: unitCharacters.length })}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {unitCharacters.map((char) => {
                  const isExpanded = expandedId === char.id;
                  return (
                    <div
                      key={char.id}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isExpanded}
                      aria-label={isExpanded
                        ? t('charList.ariaCollapse', { name: char.name })
                        : t('charList.ariaExpand', { name: char.name })
                      }
                      onClick={() => setExpandedId(isExpanded ? null : char.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setExpandedId(isExpanded ? null : char.id);
                        }
                      }}
                      className="cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3898ec] focus-visible:ring-offset-2 focus-visible:ring-offset-parchment dark:focus-visible:ring-offset-near-black"
                    >
                      <CharacterCard
                        character={char}
                        showDimensions={isExpanded}
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
