import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, ChevronRight, ArrowRight, Package, Workflow, BadgeCheck, Building2, Mail } from 'lucide-react';

const navLinks = [
  { href: '#produkty',    label: 'Produkty',    Icon: Package },
  { href: '#proces',      label: 'Proces',      Icon: Workflow },
  { href: '#certyfikaty', label: 'Certyfikaty', Icon: BadgeCheck },
  { href: '#o-firmie',    label: 'O firmie',    Icon: Building2 },
  { href: '#kontakt',     label: 'Kontakt',     Icon: Mail },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [navEl, setNavEl] = useState<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNavEl(document.getElementById('site-nav'));
  }, []);

  // Animate drawer + sync nav background colour
  useEffect(() => {
    const el = drawerRef.current;
    if (!el) return;
    el.style.maxHeight = open ? el.scrollHeight + 'px' : '0';
    document.getElementById('site-nav')?.classList.toggle('nav-menu-open', open);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onOutside(e: MouseEvent) {
      const nav = document.getElementById('site-nav');
      if (nav && !nav.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onOutside);
    return () => document.removeEventListener('click', onOutside);
  }, [open]);

  const drawer = (
    <div
      ref={drawerRef}
      id="mobile-menu"
      aria-hidden={!open}
      className="absolute top-full left-0 right-0 lg:hidden overflow-hidden transition-all duration-300 ease-out bg-graphite-dark"
      style={{ maxHeight: 0 }}
    >
      <nav className="container-site py-6 flex flex-col gap-4" aria-label="Menu mobilne">
        {navLinks.map(({ href, label, Icon }) => (
          <a
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between font-display font-semibold text-lg text-white/90 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-3">
              <Icon className="w-4 h-4 text-white/50" />
              {label}
            </span>
            <ChevronRight className="w-4 h-4 text-white/30" />
          </a>
        ))}
        <a
          href="#kontakt"
          onClick={() => setOpen(false)}
          className="mt-2 inline-flex items-center gap-2 h-11 px-6 bg-gold text-ink font-display font-semibold text-sm tracking-tight w-fit"
        >
          Zapytaj o wycenę
          <ArrowRight className="w-4 h-4" />
        </a>
      </nav>
    </div>
  );

  return (
    <>
      <button
        aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(v => !v)}
        className="mobile-nav-trigger lg:hidden flex items-center justify-center w-10 h-10 -mr-1 text-white focus:outline-none"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {navEl && createPortal(drawer, navEl)}
    </>
  );
}
