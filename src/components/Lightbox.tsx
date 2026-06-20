import { useEffect, useState, useCallback, useRef } from 'react';

interface LightboxImage {
  src: string;
  alt: string;
}

export default function Lightbox() {
  const [active, setActive] = useState<LightboxImage | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const open = useCallback((src: string, alt: string) => {
    lastActiveRef.current = document.activeElement as HTMLElement;
    setActive({ src, alt });
  }, []);

  const close = useCallback(() => setActive(null), []);

  // Intercept clicks and Enter/Space keypresses on [data-lightbox] triggers
  useEffect(() => {
    function handleTrigger(el: HTMLElement) {
      const src = el.getAttribute('data-lightbox') || (el as HTMLImageElement).src;
      const alt = el.getAttribute('data-lightbox-alt') || (el as HTMLImageElement).alt || '';
      if (src) open(src, alt);
    }

    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest('[data-lightbox]') as HTMLElement | null;
      if (target) handleTrigger(target);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const target = (e.target as HTMLElement).closest('[data-lightbox]') as HTMLElement | null;
      if (!target) return;
      e.preventDefault();
      handleTrigger(target);
    }

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // Focus management, Escape key, and focus trap when modal is open
  useEffect(() => {
    if (!active) {
      lastActiveRef.current?.focus();
      return;
    }

    closeBtnRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close();
        return;
      }

      if (e.key === 'Tab') {
        const modal = modalRef.current;
        if (!modal) return;
        const focusable = Array.from(
          modal.querySelectorAll<HTMLElement>('button, [tabindex]:not([tabindex="-1"])')
        );
        if (focusable.length < 2) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
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
      ref={modalRef}
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
        ref={closeBtnRef}
        onClick={close}
        aria-label="Zamknij podgląd (Esc)"
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>

      {/* Screen reader announcement */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        Podgląd zdjęcia otwarty. Naciśnij Escape aby zamknąć.
      </div>
    </div>
  );
}
