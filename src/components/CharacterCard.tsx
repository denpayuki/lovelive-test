import { useState } from 'react';
import type { CharacterProfile } from '../types';

interface CharacterCardProps {
  character: CharacterProfile;
  rank?: number;
  percentage?: number;
  showDimensions?: boolean;
}

const dimensionLabels: { key: keyof CharacterProfile['dimensions']; label: string }[] = [
  { key: 'extraversion', label: '外向性' },
  { key: 'emotionalStability', label: '情绪稳定' },
  { key: 'assertiveness', label: '自我主张' },
  { key: 'warmth', label: '温暖包容' },
  { key: 'openness', label: '开放性' },
  { key: 'discipline', label: '勤勉性' },
  { key: 'authenticity', label: '真实性' },
  { key: 'optimism', label: '乐观性' },
];

export default function CharacterCard({ character, rank, percentage, showDimensions }: CharacterCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="bg-ivory rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-2px]"
      style={{
        border: '1px solid #f0eee6',
        boxShadow: 'rgba(0,0,0,0.05) 0px 4px 24px',
      }}
    >
      {/* Image area */}
      <div className="relative aspect-square bg-parchment flex items-center justify-center overflow-hidden">
        {imgError ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <span className="text-4xl mb-2 text-near-black">{character.nameJa.charAt(0)}</span>
            <span className="text-sm text-stone-gray">立绘待添加</span>
          </div>
        ) : (
          <img
            src={`/images/characters/${character.imageFile}`}
            alt={`${character.nameJa} 角色立绘`}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
        {rank && (
          <div
            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-ivory/90 backdrop-blur-sm flex items-center justify-center text-sm font-medium text-near-black"
            style={{ boxShadow: '0px 0px 0px 1px #e8e6dc' }}
            aria-label={`排名第 ${rank}`}
          >
            {rank}
          </div>
        )}
        {percentage !== undefined && (
          <div
            className="absolute top-3 right-3 px-3 py-1 rounded-full bg-ivory/90 backdrop-blur-sm text-sm font-medium text-terracotta"
            style={{ boxShadow: '0px 0px 0px 1px #e8e6dc' }}
            aria-label={`相似度 ${percentage}%`}
          >
            相似度 {percentage}%
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-serif-display text-lg text-near-black" style={{ lineHeight: 1.20 }}>
          {character.nameJa}
        </h3>
        <div className="flex items-center gap-2 mt-1.5 mb-3">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: character.unitColor }}
            aria-hidden="true"
          />
          <span className="text-sm text-olive-gray">{character.unit}</span>
        </div>
        <p className="text-sm text-olive-gray" style={{ lineHeight: 1.60 }}>{character.description}</p>

        {/* Expand hint — only when used in a list context where showDimensions toggles */}
        {showDimensions === false && (
          <p className="mt-3 text-xs text-stone-gray flex items-center gap-1">
            <span aria-hidden="true">▸</span> 点击查看维度详情
          </p>
        )}

        {showDimensions && (
          <div className="mt-5 pt-4 space-y-2.5" style={{ borderTop: '1px solid #f0eee6' }}>
            {dimensionLabels.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2 text-xs">
                <span className="w-16 text-stone-gray shrink-0">{label}</span>
                <div
                  className="flex-1 h-1.5 bg-border-cream rounded-full overflow-hidden"
                  role="meter"
                  aria-label={label}
                  aria-valuenow={character.dimensions[key]}
                  aria-valuemin={0}
                  aria-valuemax={10}
                >
                  <div
                    className="h-full bg-terracotta rounded-full"
                    style={{
                      width: `${character.dimensions[key] * 10}%`,
                      opacity: 0.5 + (character.dimensions[key] / 10) * 0.5,
                    }}
                  />
                </div>
                <span className="w-5 text-right text-stone-gray">{character.dimensions[key]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
