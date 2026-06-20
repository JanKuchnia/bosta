import { useState, type FormEvent } from 'react';
import { Toaster, toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Send, Loader2, User, Building2, Mail, Phone, MessageSquare, ShieldCheck,
} from 'lucide-react';

const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

interface FormState {
  name: string;
  institution: string;
  email: string;
  phone: string;
  message: string;
}

const emptyForm: FormState = { name: '', institution: '', email: '', phone: '', message: '' };

function Field({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-[2.1rem] w-4 h-4 text-ink-muted/60 pointer-events-none z-10" />
      <div className="[&_input]:pl-10 [&_textarea]:pl-10">{children}</div>
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Nowe zapytanie o wycenę — BOSTA',
          from_name: form.name,
          name: form.name,
          email: form.email,
          phone: form.phone,
          institution: form.institution,
          message: form.message,
          botcheck: '',
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Wiadomość wysłana!', {
          description: 'Odpiszemy w godzinach pracy (pn–pt 06:00–15:00).',
        });
        setForm(emptyForm);
      } else {
        throw new Error(data.message || 'Błąd wysyłki');
      }
    } catch {
      toast.error('Wystąpił błąd', {
        description: 'Spróbuj ponownie lub napisz bezpośrednio na adres e-mail.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Toaster richColors position="top-right" />

      <div className="bg-canvas border border-border-subtle p-8 lg:p-10">
        {/* Form header */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border-subtle">
          <div className="flex items-center justify-center w-9 h-9 bg-cta/10 text-cta">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <p className="font-display font-bold text-ink text-sm leading-tight">Formularz zapytania</p>
            <p className="text-xs text-ink-muted">Odpowiadamy w ciągu 1 dnia roboczego</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

          {/* Row 1 */}
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <Field icon={User}>
              <Label htmlFor="name">Imię i nazwisko *</Label>
              <Input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={set('name')}
                placeholder="Jan Kowalski"
                autoComplete="name"
              />
            </Field>
            <Field icon={Building2}>
              <Label htmlFor="institution">Instytucja / firma *</Label>
              <Input
                id="institution"
                name="institution"
                required
                value={form.institution}
                onChange={set('institution')}
                placeholder="Szkoła Podstawowa nr 1"
              />
            </Field>
          </div>

          {/* Row 2 */}
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <Field icon={Mail}>
              <Label htmlFor="email">Adres e-mail *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={set('email')}
                placeholder="jan@szkola.pl"
                autoComplete="email"
              />
            </Field>
            <Field icon={Phone}>
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder="+48 123 456 789"
                autoComplete="tel"
              />
            </Field>
          </div>

          {/* Message */}
          <div className="relative mb-8">
            <MessageSquare className="absolute left-3 top-[2.35rem] w-4 h-4 text-ink-muted/60 pointer-events-none z-10" />
            <Label htmlFor="message">Wiadomość *</Label>
            <Textarea
              id="message"
              name="message"
              required
              value={form.message}
              onChange={set('message')}
              className="pl-10 min-h-[140px]"
              placeholder="Opisz placówkę, zakres wyposażenia, liczbę pomieszczeń, preferowany termin realizacji…"
            />
          </div>

          {/* Footer row */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-6 border-t border-border-subtle">
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full sm:w-auto"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Wysyłanie…
                </>
              ) : (
                <>
                  Wyślij zapytanie
                  <Send className="w-4 h-4" />
                </>
              )}
            </Button>
            <p className="flex items-start gap-1.5 text-xs text-ink-muted leading-relaxed max-w-xs">
              <ShieldCheck className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-cta" />
              Dane przekazywane bezpiecznie. Nie udostępniamy ich osobom trzecim.
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
