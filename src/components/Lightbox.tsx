import { useEffect, useState, useCallback } from 'react';

interface LightboxImage {
  src: string;
  alt: string;
}

export default function Lightbox() {
  const [active, setActive] = useState<LightboxImage | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    // Intercept clicks on data-lightbox images
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest('[data-lightbox]') as HTMLElement | null;
      if (!target) return;
      const src = target.getAttribute('data-lightbox') || (target as HTMLImageElement).src;
      const alt = target.getAttribute('data-lightbox-alt') || (target as HTMLImageElement).alt || '';
      if (src) setActive({ src, alt });
    }

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close]);

  if (!active) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Powiększone zdjęcie: ${active.alt}`}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-graphite-dark/95 backdrop-blur-sm" aria-hidden="true" />

      {/* Image */}
      <div className="relative max-w-[92vw] max-h-[90svh] z-10" onClick={(e) => e.stopPropagation()}>
        <img
          src={active.src}
          alt={active.alt}
          className="max-w-full max-h-[85svh] object-contain"
          style={{ display: 'block' }}
        />
        {active.alt && (
          <p className="mt-3 text-center text-sm text-white/60">{active.alt}</p>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={close}
        aria-label="Zamknij"
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
