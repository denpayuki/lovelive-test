import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import type { MatchResult, DimensionKey } from '../types';
import { dimensions } from '../data/dimensions';
import { calculateDimensionScores } from '../utils/matching';
import CharacterCard from './CharacterCard';

interface ResultPageProps {
  results: MatchResult[];
  answers: Record<number, number>;
  onRestart: () => void;
}

const dimensionOrder: DimensionKey[] = [
  'extraversion', 'emotionalStability', 'assertiveness', 'warmth',
  'openness', 'discipline', 'authenticity', 'optimism',
];

export default function ResultPage({ results, answers, onRestart }: ResultPageProps) {
  const top3 = results.slice(0, 3);
  const best = top3[0];
  const userScores = calculateDimensionScores(answers);

  const radarData = dimensionOrder.map((key) => {
    const meta = dimensions.find((d) => d.key === key)!;
    return {
      dimension: meta.label,
      你: userScores[key],
      [best.character.nameJa]: best.character.dimensions[key],
    };
  });

  return (
    <div className="min-h-screen">
      {/* Light section — Header & Best Match */}
      <div className="px-4 pt-12 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <p className="text-xs tracking-widest text-stone-gray uppercase mb-4">Result</p>
            <h1 className="font-serif-display text-3xl sm:text-4xl text-near-black mb-3" style={{ lineHeight: 1.20 }}>
              测试结果
            </h1>
            <p className="text-olive-gray" style={{ lineHeight: 1.60 }}>与你最相似的闪耀色彩角色</p>
          </div>

          <div className="mb-10 animate-fade-in-up stagger-2">
            <div className="text-center mb-5">
              <span
                className="inline-block px-4 py-1.5 bg-ivory text-terracotta rounded-full text-sm font-medium"
                style={{ boxShadow: '#f0eee6 0px 0px 0px 0px, #e8e6dc 0px 0px 0px 1px' }}
              >
                最佳匹配
              </span>
            </div>
            <div className="max-w-sm mx-auto">
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
            维度对比
          </h2>
          <div className="rounded-2xl p-6" style={{ backgroundColor: '#30302e', border: '1px solid #30302e' }}>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#4d4c48" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12, fill: '#b0aea5' }} />
                <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 10, fill: '#87867f' }} />
                <Radar
                  name="你"
                  dataKey="你"
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
              <h2 className="font-serif-display text-xl text-near-black mb-6 text-center" style={{ lineHeight: 1.20 }}>
                也很相似的角色
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
            <span className="block w-16 h-px bg-border-warm" />
            <span className="block w-1.5 h-1.5 rounded-full bg-terracotta" />
            <span className="block w-16 h-px bg-border-warm" />
          </div>

          {/* User scores */}
          <div
            className="bg-ivory rounded-2xl p-6 sm:p-8 mb-12"
            style={{ border: '1px solid #f0eee6', boxShadow: 'rgba(0,0,0,0.05) 0px 4px 24px' }}
          >
            <h2 className="font-serif-display text-xl text-near-black mb-6" style={{ lineHeight: 1.20 }}>
              你的维度分数
            </h2>
            <div className="space-y-4">
              {dimensions.map((dim) => (
                <div key={dim.key} className="flex items-center gap-3">
                  <span className="w-20 text-sm text-olive-gray shrink-0">{dim.label}</span>
                  <div className="flex-1 h-2 bg-border-cream rounded-full overflow-hidden">
                    <div
                      className="h-full bg-terracotta rounded-full transition-all duration-500"
                      style={{ width: `${userScores[dim.key] * 10}%`, opacity: 0.7 + (userScores[dim.key] / 10) * 0.3 }}
                    />
                  </div>
                  <span className="w-6 text-right text-sm text-stone-gray">{userScores[dim.key]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onRestart}
              className="px-8 py-3 bg-dark-surface text-ivory rounded-xl text-sm font-medium hover:opacity-90 transition-all cursor-pointer"
              style={{ boxShadow: '#30302e 0px 0px 0px 0px, #30302e 0px 0px 0px 1px' }}
            >
              重新测试
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
