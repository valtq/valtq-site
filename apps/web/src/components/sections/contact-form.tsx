'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/cn';
import { ApiError, submitContact } from '@/lib/api';
import {
  CONTACT_FORM_DEFAULT_VALUES,
  type ContactFormField,
  type ContactFormValues,
} from '@/lib/contact-form-schema';
import type { Dictionary } from '@/i18n/get-dictionary';

type FieldRef = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const FIRST_INVALID_FIELDS: ContactFormField[] = [
  'name',
  'email',
  'summary',
  'message',
  'productUrl',
];

const inputBase =
  'h-12 w-full rounded-lg border border-input bg-surface-container-lowest px-4 text-base text-on-surface placeholder:text-on-surface-variant/60 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50';

function SelectBase({
  id,
  value,
  onChange,
  placeholder,
  options,
  invalid,
  disabled,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: string[];
  invalid?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        className={cn(
          inputBase,
          'appearance-none pe-10',
          invalid && 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20',
          !value && 'text-on-surface-variant/70',
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="text-sm font-medium text-destructive">
      {children}
    </p>
  );
}

interface ContactFormProps {
  dict: Dictionary;
}

export function ContactForm({ dict }: ContactFormProps) {
  const copy = dict.contactPage;
  const [values, setValues] = useState<ContactFormValues>(CONTACT_FORM_DEFAULT_VALUES);
  const [touched, setTouched] = useState<Partial<Record<ContactFormField, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const fieldRefs = useRef<Partial<Record<ContactFormField, FieldRef | null>>>({});
  const submitLockedRef = useRef(false);

  const setField = useCallback((field: ContactFormField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (status === 'error') setStatus('idle');
  }, [status]);

  const markTouched = useCallback((field: ContactFormField) => {
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  }, []);

  const errors = useMemo(() => {
    const result: Partial<Record<ContactFormField, string>> = {};
    if (!values.name.trim()) result.name = copy.nameRequiredError;
    if (!values.email.trim()) {
      result.email = copy.emailRequiredError;
    } else if (!z.string().email().safeParse(values.email.trim()).success) {
      result.email = copy.emailInvalidError;
    }
    if (
      values.productUrl.trim().length > 0 &&
      !z.string().url().safeParse(values.productUrl.trim()).success
    ) {
      result.productUrl = copy.urlInvalidError;
    }
    if (!values.summary.trim()) {
      result.summary = copy.summaryRequiredError;
    } else if (values.summary.trim().length > 200) {
      result.summary = copy.summaryLengthError;
    }
    if (!values.message.trim()) {
      result.message = copy.messageRequiredError;
    } else if (values.message.trim().length < 10) {
      result.message = copy.messageLengthError;
    }
    return result;
  }, [values, copy]);

  const hasErrors = Object.keys(errors).length > 0;

  const showErrorFor = (field: ContactFormField) =>
    (touched[field] || submitAttempted) ? errors[field] : undefined;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (submitLockedRef.current || status === 'submitting' || status === 'success') return;

      if (hasErrors) {
        setSubmitAttempted(true);
        const firstInvalid = FIRST_INVALID_FIELDS.find((field) => errors[field]);
        if (firstInvalid) {
          fieldRefs.current[firstInvalid]?.focus();
        }
        return;
      }

      submitLockedRef.current = true;
      setSubmitAttempted(false);
      setStatus('submitting');

      void (async () => {
        try {
          await submitContact(values);
          setStatus('success');
        } catch (error) {
          if (error instanceof ApiError && error.statusCode >= 500) {
            setStatus('error');
          } else {
            setStatus('error');
          }
        } finally {
          submitLockedRef.current = false;
        }
      })();
    },
    [errors, hasErrors, status, values],
  );

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-[24rem] flex-col items-center justify-center rounded-2xl border border-border bg-surface-container-lowest px-6 py-16 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-tertiary/20 bg-tertiary/10 text-tertiary">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 6 9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="font-display mt-6 text-2xl font-bold tracking-tight text-on-surface">
          {copy.successTitle}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
          {copy.successMessage}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={copy.formLabel}
      className="space-y-8 rounded-2xl border border-border bg-surface-container-lowest p-5 sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-on-surface-variant">{copy.requiredLabel}</p>
        <p className="text-sm font-medium text-on-surface-variant">{copy.optionalLabel}</p>
      </div>

      {submitAttempted && hasErrors && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3"
        >
          <p className="flex items-start gap-2 text-sm font-medium leading-relaxed text-destructive">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v5M12 16.5h.01" />
            </svg>
            <span>{copy.errorSummary}</span>
          </p>
        </div>
      )}

      {status === 'error' && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-4"
        >
          <p className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-destructive">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v5M12 16.5h.01" />
            </svg>
            <span>{copy.errorTitle}</span>
          </p>
          <p className="mt-1 ps-6 text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
            {copy.errorMessage}
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="contact-name" className="flex items-center gap-2 text-base font-semibold text-on-surface">
              {copy.nameLabel}
              <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <Input
              ref={(el) => {
                fieldRefs.current.name = el;
              }}
              id="contact-name"
              type="text"
              autoComplete="name"
              maxLength={200}
              value={values.name}
              onChange={(e) => setField('name', e.target.value)}
              onBlur={() => markTouched('name')}
              placeholder={copy.namePlaceholder}
              aria-required="true"
              aria-invalid={showErrorFor('name') ? true : undefined}
              aria-describedby={showErrorFor('name') ? 'contact-name-error' : undefined}
              disabled={status === 'submitting'}
            />
            {showErrorFor('name') && <FieldError id="contact-name-error">{errors.name}</FieldError>}
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-email" className="flex items-center gap-2 text-base font-semibold text-on-surface">
              {copy.emailLabel}
              <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <Input
              ref={(el) => {
                fieldRefs.current.email = el;
              }}
              id="contact-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              dir="ltr"
              maxLength={320}
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              onBlur={() => markTouched('email')}
              placeholder={copy.emailPlaceholder}
              aria-required="true"
              aria-invalid={showErrorFor('email') ? true : undefined}
              aria-describedby={showErrorFor('email') ? 'contact-email-error' : undefined}
              disabled={status === 'submitting'}
            />
            {showErrorFor('email') && <FieldError id="contact-email-error">{errors.email}</FieldError>}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="contact-company" className="flex items-center gap-2 text-base font-semibold text-on-surface">
              {copy.companyLabel}
              <span className="text-xs font-normal text-on-surface-variant">({copy.optionalLabel})</span>
            </label>
            <Input
              id="contact-company"
              type="text"
              autoComplete="organization"
              maxLength={200}
              value={values.company}
              onChange={(e) => setField('company', e.target.value)}
              placeholder={copy.companyPlaceholder}
              disabled={status === 'submitting'}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-phone" className="flex items-center gap-2 text-base font-semibold text-on-surface">
              {copy.phoneLabel}
              <span className="text-xs font-normal text-on-surface-variant">({copy.optionalLabel})</span>
            </label>
            <Input
              id="contact-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              dir="ltr"
              maxLength={50}
              value={values.phone}
              onChange={(e) => setField('phone', e.target.value)}
              placeholder={copy.phonePlaceholder}
              disabled={status === 'submitting'}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="contact-serviceArea" className="block text-base font-semibold text-on-surface">
              {copy.serviceLabel}
              <span className="text-xs font-normal text-on-surface-variant">({copy.optionalLabel})</span>
            </label>
            <SelectBase
              id="contact-serviceArea"
              value={values.serviceArea}
              onChange={(value) => setField('serviceArea', value)}
              placeholder={copy.servicePlaceholder}
              options={copy.serviceOptions}
              disabled={status === 'submitting'}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-productStage" className="block text-base font-semibold text-on-surface">
              {copy.stageLabel}
              <span className="text-xs font-normal text-on-surface-variant">({copy.optionalLabel})</span>
            </label>
            <SelectBase
              id="contact-productStage"
              value={values.productStage}
              onChange={(value) => setField('productStage', value)}
              placeholder={copy.stagePlaceholder}
              options={copy.stageOptions}
              disabled={status === 'submitting'}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="contact-preferredChannel" className="block text-base font-semibold text-on-surface">
              {copy.channelLabel}
              <span className="text-xs font-normal text-on-surface-variant">({copy.optionalLabel})</span>
            </label>
            <SelectBase
              id="contact-preferredChannel"
              value={values.preferredChannel}
              onChange={(value) => setField('preferredChannel', value)}
              placeholder={copy.channelPlaceholder}
              options={copy.channelOptions}
              disabled={status === 'submitting'}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-timing" className="block text-base font-semibold text-on-surface">
              {copy.timingLabel}
              <span className="text-xs font-normal text-on-surface-variant">({copy.optionalLabel})</span>
            </label>
            <SelectBase
              id="contact-timing"
              value={values.timing}
              onChange={(value) => setField('timing', value)}
              placeholder={copy.timingPlaceholder}
              options={copy.timingOptions}
              disabled={status === 'submitting'}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="contact-productUrl" className="block text-base font-semibold text-on-surface">
              {copy.urlLabel}
              <span className="text-xs font-normal text-on-surface-variant">({copy.optionalLabel})</span>
            </label>
            <Input
              ref={(el) => {
                fieldRefs.current.productUrl = el;
              }}
              id="contact-productUrl"
              type="url"
              inputMode="url"
              dir="ltr"
              autoComplete="url"
              maxLength={500}
              value={values.productUrl}
              onChange={(e) => setField('productUrl', e.target.value)}
              onBlur={() => markTouched('productUrl')}
              placeholder={copy.urlPlaceholder}
              aria-invalid={showErrorFor('productUrl') ? true : undefined}
              aria-describedby={showErrorFor('productUrl') ? 'contact-productUrl-error' : undefined}
              disabled={status === 'submitting'}
            />
            {showErrorFor('productUrl') && (
              <FieldError id="contact-productUrl-error">{errors.productUrl}</FieldError>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-budget" className="block text-base font-semibold text-on-surface">
              {copy.budgetLabel}
              <span className="text-xs font-normal text-on-surface-variant">({copy.optionalLabel})</span>
            </label>
            <SelectBase
              id="contact-budget"
              value={values.budget}
              onChange={(value) => setField('budget', value)}
              placeholder={copy.budgetPlaceholder}
              options={copy.budgetOptions}
              disabled={status === 'submitting'}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-summary" className="flex items-center gap-2 text-base font-semibold text-on-surface">
            {copy.summaryLabel}
            <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <Input
            ref={(el) => {
              fieldRefs.current.summary = el;
            }}
            id="contact-summary"
            type="text"
            maxLength={200}
            value={values.summary}
            onChange={(e) => setField('summary', e.target.value)}
            onBlur={() => markTouched('summary')}
            placeholder={copy.summaryPlaceholder}
            aria-required="true"
            aria-invalid={showErrorFor('summary') ? true : undefined}
            aria-describedby={showErrorFor('summary') ? 'contact-summary-error' : undefined}
            disabled={status === 'submitting'}
          />
          {showErrorFor('summary') && (
            <FieldError id="contact-summary-error">{errors.summary}</FieldError>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-message" className="flex items-center gap-2 text-base font-semibold text-on-surface">
            {copy.messageLabel}
            <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <Textarea
            ref={(el) => {
              fieldRefs.current.message = el;
            }}
            id="contact-message"
            maxLength={5000}
            value={values.message}
            onChange={(e) => setField('message', e.target.value)}
            onBlur={() => markTouched('message')}
            placeholder={copy.messagePlaceholder}
            aria-required="true"
            aria-invalid={showErrorFor('message') ? true : undefined}
            aria-describedby={showErrorFor('message') ? 'contact-message-error' : undefined}
            disabled={status === 'submitting'}
          />
          {showErrorFor('message') && (
            <FieldError id="contact-message-error">{errors.message}</FieldError>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          size="lg"
          className="w-full min-h-12 px-8 sm:w-auto"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? copy.submittingLabel : copy.submitLabel}
        </Button>
        <p className="text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.9]">
          {copy.privacyNote}
        </p>
      </div>
    </form>
  );
}
