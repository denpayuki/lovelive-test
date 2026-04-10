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
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer flex items-center gap-1 mb-4"
          >
            ← 返回首页
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">角色一览</h1>
              <p className="text-sm text-gray-500 mt-1">シャイニーカラーズ 全28人</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2 text-sm rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors cursor-pointer"
            >
              开始测试
            </button>
          </div>
        </div>

        {/* Units */}
        {units.map((unit) => {
          const unitCharacters = characters.filter((c) => c.unit === unit);
          const unitColor = unitCharacters[0]?.unitColor || '#888';

          return (
            <section key={unit} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: unitColor }}
                />
                <h2 className="text-lg font-semibold text-gray-700">{unit}</h2>
                <span className="text-sm text-gray-400">{unitCharacters.length}人</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
