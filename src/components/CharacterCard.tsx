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
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Image area */}
      <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={`/images/characters/${character.imageFile}`}
          alt={character.nameJa}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent && !parent.querySelector('.placeholder')) {
              const div = document.createElement('div');
              div.className = 'placeholder flex flex-col items-center justify-center w-full h-full';
              div.innerHTML = `<span class="text-4xl mb-2">${character.nameJa.charAt(0)}</span><span class="text-sm text-gray-400">立绘待添加</span>`;
              parent.appendChild(div);
            }
          }}
        />
        {rank && (
          <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-sm font-bold text-gray-700 shadow-sm">
            {rank}
          </div>
        )}
        {percentage !== undefined && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-700 shadow-sm">
            {percentage}%
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{character.nameJa}</h3>
        <div className="flex items-center gap-2 mt-1 mb-3">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: character.unitColor }}
          />
          <span className="text-sm text-gray-500">{character.unit}</span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{character.description}</p>

        {showDimensions && (
          <div className="mt-4 space-y-2">
            {dimensionLabels.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2 text-xs">
                <span className="w-16 text-gray-500 shrink-0">{label}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-300 to-sky-300 rounded-full"
                    style={{ width: `${character.dimensions[key] * 10}%` }}
                  />
                </div>
                <span className="w-5 text-right text-gray-400">{character.dimensions[key]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
