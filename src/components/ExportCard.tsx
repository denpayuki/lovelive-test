import { forwardRef, useState, useEffect } from 'react';
import type { CharacterProfile, DimensionScores, DimensionKey } from '../types';

interface ExportCardProps {
  nickname: string;
  character: CharacterProfile;
  userScores: DimensionScores;
  percentage: number;
  dimensionLabels: string[];
  characterImageDataUrl?: string;
  brandText: string;
  headlineSuffix: string;
  similarityText: string;
  siteUrl: string;
}

const dimensionOrder: DimensionKey[] = [
  'energy', 'warmth', 'drive', 'discipline',
  'creativity', 'confidence', 'optimism', 'independence',
];

const ExportCard = forwardRef<HTMLDivElement, ExportCardProps>(function ExportCard(
  { nickname, character, userScores, percentage, dimensionLabels, characterImageDataUrl, brandText, headlineSuffix, similarityText, siteUrl },
  ref,
) {
  const [imgError, setImgError] = useState(false);
  const imageSrc = characterImageDataUrl || character.imageUrl;

  // Reset error state when image source changes (e.g. data URL becomes available)
  useEffect(() => {
    setImgError(false);
  }, [characterImageDataUrl]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -9999,
      }}
    >
      <div
        ref={ref}
        style={{
          width: '1200px',
          height: '900px',
          backgroundColor: '#f5f4ed',
          fontFamily: "Georgia, 'Times New Roman', serif",
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '48px 56px 40px',
          boxSizing: 'border-box',
        }}
      >
        {/* Brand */}
        <div style={{ fontSize: '16px', color: '#6e6d67', fontWeight: 400, marginBottom: '8px', fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
          {brandText}
        </div>

        {/* Headline */}
        <div style={{ fontSize: '40px', fontWeight: 500, color: '#141413', lineHeight: 1.20, marginBottom: '32px' }}>
          <span style={{ color: '#b83f6d' }}>{nickname}</span>
          <span> {headlineSuffix}</span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flex: 1, gap: '48px', minHeight: 0 }}>
          {/* Left: Character image */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <div
              style={{
                width: '340px',
                height: '420px',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#faf9f5',
                border: '1px solid #f0eee6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {!imgError ? (
                <img
                  src={imageSrc}
                  alt={character.name}
                  crossOrigin="anonymous"
                  onError={() => setImgError(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              ) : (
                <span style={{ fontSize: '64px', color: '#141413' }}>{character.name.charAt(0)}</span>
              )}
            </div>
            <div style={{ marginTop: '16px', fontSize: '28px', fontWeight: 500, color: '#b83f6d' }}>
              {character.name}
            </div>
          </div>

          {/* Right: Dimension bars + similarity */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
            {/* Bar chart */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingTop: '8px' }}>
              {dimensionOrder.map((key, i) => {
                const score = userScores[key];
                const pct = score * 10;
                return (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{
                      width: '112px',
                      fontSize: '17px',
                      color: '#5e5d59',
                      flexShrink: 0,
                      textAlign: 'right',
                      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
                      fontWeight: 400,
                    }}>
                      {dimensionLabels[i]}
                    </span>
                    <div style={{
                      flex: 1,
                      height: '20px',
                      backgroundColor: '#e8e6dc',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${pct}%`,
                        backgroundColor: '#b83f6d',
                        borderRadius: '10px',
                        opacity: 0.7 + (score / 10) * 0.3,
                      }} />
                    </div>
                    <span style={{
                      width: '28px',
                      fontSize: '17px',
                      color: '#5e5d59',
                      textAlign: 'right',
                      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
                      fontWeight: 500,
                    }}>
                      {score}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Similarity text */}
            <div style={{ marginTop: '24px' }}>
              <div style={{ fontSize: '22px', fontWeight: 500, color: '#141413', lineHeight: 1.40 }}>
                {(() => {
                  const pctStr = `${percentage}%`;
                  const idx = similarityText.indexOf(pctStr);
                  if (idx === -1) return similarityText;
                  return (
                    <>
                      {similarityText.slice(0, idx)}
                      <span style={{ color: '#b83f6d' }}>{pctStr}</span>
                      {similarityText.slice(idx + pctStr.length)}
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Site URL */}
            <div style={{ textAlign: 'right', fontSize: '18px', color: '#6e6d67', fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif", marginTop: '8px' }}>
              {siteUrl}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ExportCard;
