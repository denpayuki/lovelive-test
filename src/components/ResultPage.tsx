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
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">测试结果</h1>
          <p className="text-gray-500">与你最相似的闪耀色彩角色</p>
        </div>

        {/* Top 1 - Featured */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
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

        {/* Radar Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="text-base font-semibold text-gray-700 mb-4 text-center">维度对比</h2>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <Radar
                name="你"
                dataKey="你"
                stroke="#f43f5e"
                fill="#f43f5e"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Radar
                name={best.character.nameJa}
                dataKey={best.character.nameJa}
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Legend wrapperStyle={{ fontSize: 13 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Top 2 & 3 */}
        {top3.length > 1 && (
          <div className="mb-8">
            <h2 className="text-base font-semibold text-gray-700 mb-4 text-center">也很相似的角色</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        {/* User scores */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="text-base font-semibold text-gray-700 mb-4">你的维度分数</h2>
          <div className="space-y-3">
            {dimensions.map((dim) => (
              <div key={dim.key} className="flex items-center gap-3">
                <span className="w-20 text-sm text-gray-500 shrink-0">{dim.label}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-400 to-sky-400 rounded-full transition-all"
                    style={{ width: `${userScores[dim.key] * 10}%` }}
                  />
                </div>
                <span className="w-6 text-right text-sm text-gray-500">{userScores[dim.key]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onRestart}
            className="px-8 py-3 bg-gray-800 text-white rounded-full text-sm font-medium hover:bg-gray-700 transition-colors cursor-pointer"
          >
            重新测试
          </button>
        </div>
      </div>
    </div>
  );
}
