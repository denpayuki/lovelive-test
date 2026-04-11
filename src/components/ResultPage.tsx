import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import type { MatchResult, DimensionKey } from '../types';
import { dimensions } from '../data/dimensions';
import { calculateDimensionScores } from '../utils/matching';
import CharacterCard from './CharacterCard';

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

export default function ResultPage({ results, answers, confirmingReset, onConfirmReset }: ResultPageProps) {
  const navigate = useNavigate();
  const top3 = results.slice(0, 3);
  const best = top3[0];
  const userScores = calculateDimensionScores(answers);
  const [shareState, setShareState] = useState<'idle' | 'copied'>('idle');

  const handleShare = useCallback(async () => {
    const text = `我在闪耀色彩性格测试中匹配到了 ${best.character.nameJa}，相似度 ${best.percentage}%！`;
    try {
      if (navigator.share) {
        await navigator.share({ title: '闪耀色彩性格测试结果', text });
      } else {
        await navigator.clipboard.writeText(text);
        setShareState('copied');
        setTimeout(() => setShareState('idle'), 2000);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        setShareState('copied');
        setTimeout(() => setShareState('idle'), 2000);
      } catch { /* user denied */ }
    }
  }, [best]);

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
            <p className="text-xs tracking-widest text-stone-gray dark:text-warm-silver uppercase mb-4">Result</p>
            <h1 className="font-serif-display text-3xl sm:text-4xl text-near-black dark:text-ivory mb-3" style={{ lineHeight: 1.20 }}>
              测试结果
            </h1>
            <p className="text-olive-gray dark:text-warm-silver" style={{ lineHeight: 1.60 }}>与你最相似的闪耀色彩角色</p>
          </div>

          <div className="mb-10">
            <div className="text-center mb-5 animate-fade-in-up stagger-2">
              <span
                className="inline-block px-4 py-1.5 bg-ivory dark:bg-dark-surface text-terracotta rounded-full text-sm font-medium"
                style={{ boxShadow: 'var(--tag-ring)' }}
              >
                最佳匹配
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
            维度对比
          </h2>
          <div className="rounded-2xl p-6" style={{ backgroundColor: '#30302e', border: '1px solid #30302e' }}>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#4d4c48" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 14, fill: '#b0aea5' }} />
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
              <h2 className="font-serif-display text-xl text-near-black dark:text-ivory mb-6 text-center" style={{ lineHeight: 1.20 }}>
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
              你的维度分数
            </h2>
            <div className="space-y-4">
              {dimensions.map((dim) => (
                <div key={dim.key} className="flex items-center gap-3">
                  <span className="w-20 text-sm text-olive-gray dark:text-warm-silver shrink-0">{dim.label}</span>
                  <div className="flex-1 h-2 bg-border-cream dark:bg-dark-warm rounded-full overflow-hidden">
                    <div
                      className="h-full bg-terracotta rounded-full transition-all duration-500"
                      style={{ width: `${userScores[dim.key] * 10}%`, opacity: 0.7 + (userScores[dim.key] / 10) * 0.3 }}
                    />
                  </div>
                  <span className="w-6 text-right text-sm text-stone-gray dark:text-warm-silver">{userScores[dim.key]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center gap-3">
              <button
                onClick={handleShare}
                className="px-8 py-3 bg-terracotta text-ivory rounded-xl text-sm font-medium hover:opacity-90 transition-all cursor-pointer"
                style={{ boxShadow: '#c96442 0px 0px 0px 0px, #c96442 0px 0px 0px 1px' }}
              >
                {shareState === 'copied' ? '已复制到剪贴板' : '分享结果'}
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
                {confirmingReset ? '确认清除？' : '重新测试'}
              </button>
            </div>
            <button
              onClick={() => navigate('/characters')}
              className="text-sm text-stone-gray dark:text-warm-silver hover:text-dark-warm dark:hover:text-ivory transition-colors cursor-pointer"
            >
              查看所有角色 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
