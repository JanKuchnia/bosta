import { useState, type FormEvent } from 'react';
import { Toaster, toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// ── Replace with your Web3Forms access key from https://web3forms.com ──
const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

interface FormState {
  name: string;
  institution: string;
  email: string;
  phone: string;
  message: string;
}

const emptyForm: FormState = {
  name: '',
  institution: '',
  email: '',
  phone: '',
  message: '',
};

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
    } catch (err) {
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
      <form onSubmit={handleSubmit} noValidate>
        {/* Bot trap — hidden from humans */}
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
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
          </div>
          <div>
            <Label htmlFor="institution">Instytucja / firma *</Label>
            <Input
              id="institution"
              name="institution"
              required
              value={form.institution}
              onChange={set('institution')}
              placeholder="Szkoła Podstawowa nr 1"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
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
          </div>
          <div>
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
          </div>
        </div>

        <div className="mb-8">
          <Label htmlFor="message">Wiadomość *</Label>
          <Textarea
            id="message"
            name="message"
            required
            value={form.message}
            onChange={set('message')}
            placeholder="Opisz placówkę, zakres wyposażenia, liczbę pomieszczeń, preferowany termin realizacji…"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full sm:w-auto"
          >
            {submitting ? 'Wysyłanie…' : 'Wyślij zapytanie'}
          </Button>
          <p className="text-xs text-ink-muted leading-relaxed max-w-xs">
            Odpowiadamy w ciągu 1 dnia roboczego. Dane przekazywane bezpiecznie przez Web3Forms.
          </p>
        </div>
      </form>
    </>
  );
}
