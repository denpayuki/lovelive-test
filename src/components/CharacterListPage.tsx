import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { characters } from '../data/characters';
import CharacterCard from './CharacterCard';

const units = [
  'illumination STARS',
  "L'Antica",
  'ALSTROEMERIA',
  '放課後クライマックスガールズ',
  'Straylight',
  'noctchill',
  'SHHis',
  'CoMETIK',
];

export default function CharacterListPage() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-stone-gray hover:text-dark-warm transition-colors cursor-pointer flex items-center gap-1 mb-5"
          >
            ← 返回首页
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif-display text-3xl sm:text-4xl text-near-black" style={{ lineHeight: 1.20 }}>
                角色一览
              </h1>
              <p className="text-sm text-olive-gray mt-2" style={{ lineHeight: 1.60 }}>
                シャイニーカラーズ 全28人
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2.5 text-sm rounded-lg bg-terracotta text-ivory hover:opacity-90 transition-all cursor-pointer"
              style={{ boxShadow: '#c96442 0px 0px 0px 0px, #c96442 0px 0px 0px 1px' }}
            >
              开始测试
            </button>
          </div>
        </div>

        {/* Units */}
        {units.map((unit) => {
          const unitCharacters = characters.filter((c) => c.unit === unit);
          const unitColor = unitCharacters[0]?.unitColor || '#87867f';

          return (
            <section key={unit} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: unitColor }}
                />
                <h2 className="font-serif-display text-xl text-near-black" style={{ lineHeight: 1.20 }}>
                  {unit}
                </h2>
                <span className="text-sm text-stone-gray">{unitCharacters.length}人</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {unitCharacters.map((char) => (
                  <div
                    key={char.id}
                    onClick={() => setExpandedId(expandedId === char.id ? null : char.id)}
                    className="cursor-pointer"
                  >
                    <CharacterCard
                      character={char}
                      showDimensions={expandedId === char.id}
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
