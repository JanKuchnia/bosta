import { useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import type { CatalogCategory, CatalogProduct, ProductVariant } from '@/data/catalog';
import { CATALOG_EMAIL } from '@/data/catalog';

function WarrantyBadge({ warranty }: { warranty: string }) {
  return (
    <span
      className="inline-block mt-1.5 px-2 py-0.5 font-display font-bold text-[10px] tracking-widest uppercase"
      style={{
        background: 'oklch(69.20% 0.137 100.07 / 0.12)',
        color: 'var(--cta-hover)',
      }}
    >
      Gwarancja {warranty}
    </span>
  );
}

function VariantRow({ variant, isLast }: { variant: ProductVariant; isLast: boolean }) {
  return (
    <div
      className={`flex items-start gap-4 px-4 py-3 ${!isLast ? 'border-b border-[var(--border-subtle)]' : ''}`}
      style={{ background: variant.isAddon ? 'var(--canvas)' : 'white' }}
    >
      <div className="flex-1 min-w-0">
        {variant.isAddon ? (
          <p className="text-xs text-[var(--ink-muted)] leading-snug">
            <span className="font-display font-bold text-[9px] uppercase tracking-widest mr-1.5 text-[var(--ink-muted)]">Opcja</span>
            {variant.description}
          </p>
        ) : (
          <p className="text-sm text-[var(--ink)] leading-snug">{variant.description}</p>
        )}
        {variant.warranty && <WarrantyBadge warranty={variant.warranty} />}
      </div>

      <div className="text-right shrink-0" style={{ minWidth: '5.5rem' }}>
        {variant.price > 0 ? (
          <>
            <div className="font-display font-black text-base text-[var(--ink)] tabular-nums whitespace-nowrap leading-none">
              {variant.price.toLocaleString('pl-PL')}
              <span className="text-xs font-normal text-[var(--ink-muted)] ml-0.5">PLN</span>
            </div>
            {variant.originalPrice && (
              <div className="text-xs text-[var(--ink-muted)] line-through tabular-nums mt-1">
                {variant.originalPrice.toLocaleString('pl-PL')} PLN
              </div>
            )}
          </>
        ) : (
          <span className="text-xs text-[var(--ink-muted)] font-display font-medium italic">na zapytanie</span>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <article className="overflow-hidden border border-[var(--border-subtle)]">
      {/* Spec-sheet header */}
      <header className="flex items-baseline justify-between gap-4 px-4 py-3 bg-[var(--ink)]">
        <h3 className="font-display font-bold text-sm md:text-base text-white leading-snug">
          {product.name}
        </h3>
        <span
          className="font-display font-medium text-[10px] uppercase tracking-widest shrink-0 whitespace-nowrap"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          cena brutto
        </span>
      </header>

      <div className="flex flex-col sm:flex-row">
        {/* Product image */}
        <div
          className="sm:w-40 shrink-0 flex items-center justify-center p-4 sm:border-r border-b sm:border-b-0 border-[var(--border-subtle)] bg-white"
          style={{ minHeight: '9rem' }}
        >
          <img
            src={product.image}
            alt={product.imageAlt}
            className="max-h-36 sm:max-h-40 w-auto max-w-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Variants */}
        <div className="flex-1 min-w-0">
          {product.variants.map((variant, i) => (
            <VariantRow
              key={i}
              variant={variant}
              isLast={i === product.variants.length - 1}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

function pluralProducts(n: number): string {
  if (n === 1) return 'produkt';
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'produkty';
  return 'produktów';
}

interface Props {
  categories: CatalogCategory[];
}

export default function CategoryCatalog({ categories }: Props) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? '');
  const [visible, setVisible] = useState(true);
  const active = categories.find(c => c.id === activeId) ?? categories[0];

  if (!active) return null;

  const handleCategoryChange = (id: string) => {
    if (id === activeId) return;
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setActiveId(id);
      return;
    }
    setVisible(false);
    setTimeout(() => {
      setActiveId(id);
      setVisible(true);
    }, 150);
  };

  return (
    <div className="container-site py-10 md:py-12">
      <div className="flex items-start gap-0">

        {/* Desktop sidebar */}
        <aside
          className="hidden md:flex flex-col w-56 lg:w-64 shrink-0 sticky border-r border-[var(--border-subtle)]"
          style={{ top: '7rem', maxHeight: 'calc(100vh - 8rem)', overflowY: 'auto' }}
          aria-label="Kategorie produktów"
        >
          <ul>
            {categories.map(cat => {
              const isActive = activeId === cat.id;
              return (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center justify-between w-full text-left px-3 py-2 text-sm transition-colors duration-100 ${
                      isActive
                        ? 'bg-[var(--ink)] text-white font-display font-semibold'
                        : 'text-[var(--ink)] hover:bg-[var(--border-subtle)] font-body'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="leading-snug">{cat.name}</span>
                    <span
                      className="tabular-nums text-xs font-display font-bold ml-2 shrink-0"
                      style={{ color: isActive ? 'var(--cta)' : 'var(--ink-muted)' }}
                    >
                      {cat.products.length}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Sidebar quote CTA */}
          <div className="mt-6 mx-3 mb-4 border-t border-[var(--border-subtle)] pt-5">
            <a
              href={`mailto:${CATALOG_EMAIL}`}
              className="bg-gold flex items-center gap-2 w-full px-3 py-2.5 font-display font-semibold text-xs text-[var(--ink)] tracking-tight"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              Zapytaj o wycenę
            </a>
          </div>
        </aside>

        {/* Mobile category selector */}
        <div className="md:hidden w-full mb-6">
          <label htmlFor="cat-select" className="sr-only">Wybierz kategorię</label>
          <div className="relative">
            <select
              id="cat-select"
              value={activeId}
              onChange={e => handleCategoryChange(e.target.value)}
              className="w-full appearance-none border border-[var(--border-subtle)] bg-white px-4 py-3 pr-10 text-sm font-display font-semibold text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--cta)]"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.products.length})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Products area */}
        <main className="flex-1 min-w-0 md:pl-8 lg:pl-10">
          {/* Category header */}
          <div className="mb-6 pb-5 border-b border-[var(--border-subtle)]">
            <h2 className="font-display font-black text-2xl text-[var(--ink)]">{active.name}</h2>
            <p className="mt-1 text-xs font-display text-[var(--ink-muted)]">
              {active.products.length} {pluralProducts(active.products.length)} · Zapytania:{' '}
              <a
                href={`mailto:${CATALOG_EMAIL}`}
                className="text-[var(--cta)] hover:underline"
              >
                {CATALOG_EMAIL}
              </a>
            </p>
          </div>

          {/* Products list */}
          <div
            className="space-y-4"
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.15s ease',
            }}
          >
            {active.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom quote CTA */}
          <div className="mt-10 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-display font-semibold text-sm text-[var(--ink)]">Zainteresowany?</p>
              <p className="text-sm text-[var(--ink-muted)]">
                Odpiszemy z wyceną w ciągu jednego dnia roboczego.
              </p>
            </div>
            <a
              href={`mailto:${CATALOG_EMAIL}?subject=Zapytanie o wycenę — ${active.name}`}
              className="bg-gold inline-flex items-center gap-2 shrink-0 px-5 py-3 font-display font-semibold text-sm text-[var(--ink)]"
            >
              Wyślij zapytanie
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
