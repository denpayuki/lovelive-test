import { useEffect, useRef } from 'react';

interface DisclaimerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DisclaimerModal({ open, onClose }: DisclaimerModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-near-black/40 dark:bg-black/60" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-ivory dark:bg-dark-surface rounded-2xl p-6 sm:p-8 animate-scale-in"
        style={{ boxShadow: 'rgba(0,0,0,0.05) 0px 4px 24px' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="关闭"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-stone-gray dark:text-warm-silver hover:text-near-black dark:hover:text-ivory transition-colors cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Title */}
        <h2
          className="font-serif-display text-xl text-near-black dark:text-ivory mb-5"
          style={{ lineHeight: 1.20 }}
        >
          关于本项目
        </h2>

        {/* Content */}
        <div className="space-y-4 text-sm text-olive-gray dark:text-warm-silver" style={{ lineHeight: 1.70 }}>
          <div className="flex gap-3">
            <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-terracotta/15 dark:bg-terracotta/25 flex items-center justify-center">
              <span className="block w-1.5 h-1.5 rounded-full bg-terracotta" />
            </span>
            <p>
              本项目代码与数据搜集 100% 由{' '}
              <span className="font-medium text-near-black dark:text-ivory">Claude Opus 4.6</span>{' '}
              驱动生成，不含人工编写成分。AI 生成内容可能存在偏差或错误，测试结果仅供娱乐参考。
            </p>
          </div>

          <div className="flex gap-3">
            <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-terracotta/15 dark:bg-terracotta/25 flex items-center justify-center">
              <span className="block w-1.5 h-1.5 rounded-full bg-terracotta" />
            </span>
            <p>
              本项目为<span className="font-medium text-near-black dark:text-ivory">粉丝个人作品</span>，与 Bandai Namco Entertainment、Project ShinyColors 及相关官方无任何关联。
            </p>
          </div>

          <div className="flex gap-3">
            <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-terracotta/15 dark:bg-terracotta/25 flex items-center justify-center">
              <span className="block w-1.5 h-1.5 rounded-full bg-terracotta" />
            </span>
            <p>
              项目中使用的角色图片及相关素材的版权归原版权方所有。如有侵权，请联系作者删除。
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-border-cream dark:border-dark-warm">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-sm rounded-lg bg-warm-sand dark:bg-dark-warm text-charcoal-warm dark:text-ivory hover:opacity-90 transition-all cursor-pointer"
            style={{ boxShadow: 'var(--btn-secondary-ring)' }}
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
}
