'use client';

import { useCallback, useState, useTransition } from 'react';
import { DiscoverySubmissionSchema } from '@valtq/types';
import { discoveryCopy, type Locale } from '@/content/discovery-copy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApiError, submitDiscovery } from '@/lib/api';
import { useDiscoveryStore } from '@/stores/discovery-store';

interface ContactInformationScreenProps {
  locale: Locale;
}

/**
 * Screen 5: Contact Information form.
 * Validates contact fields, submits the full discovery payload to the API,
 * then advances to booking with the returned leadId.
 */
function ContactInformationScreen({ locale }: ContactInformationScreenProps) {
  const copy = discoveryCopy[locale];
  const name = useDiscoveryStore((s) => s.name);
  const email = useDiscoveryStore((s) => s.email);
  const company = useDiscoveryStore((s) => s.company);
  const projectType = useDiscoveryStore((s) => s.projectType);
  const description = useDiscoveryStore((s) => s.description);
  const budget = useDiscoveryStore((s) => s.budget);
  const timeline = useDiscoveryStore((s) => s.timeline);
  const features = useDiscoveryStore((s) => s.features);
  const leadId = useDiscoveryStore((s) => s.leadId);
  const setContactField = useDiscoveryStore((s) => s.setContactField);
  const setLeadId = useDiscoveryStore((s) => s.setLeadId);
  const previousStep = useDiscoveryStore((s) => s.previousStep);
  const nextStep = useDiscoveryStore((s) => s.nextStep);

  const [touchedFields, setTouchedFields] = useState<{
    name: boolean;
    email: boolean;
    company: boolean;
  }>({ name: false, email: false, company: false });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isNameValid = DiscoverySubmissionSchema.shape.name.safeParse(name.trim()).success;
  const isEmailValid = DiscoverySubmissionSchema.shape.email.safeParse(email.trim()).success;
  const isCompanyValid = DiscoverySubmissionSchema.shape.company.safeParse(company).success;
  const isFormValid = isNameValid && isEmailValid && isCompanyValid;
  const busy = isSubmitting || isPending;

  const showNameError = touchedFields.name && !isNameValid;
  const showEmailError = touchedFields.email && !isEmailValid;
  const showCompanyError = touchedFields.company && !isCompanyValid;

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubmitError(null);
      setContactField('name', e.target.value);
    },
    [setContactField],
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubmitError(null);
      setContactField('email', e.target.value);
    },
    [setContactField],
  );

  const handleCompanyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubmitError(null);
      setContactField('company', e.target.value);
    },
    [setContactField],
  );

  const handleNameBlur = useCallback(() => {
    setTouchedFields((prev) => ({ ...prev, name: true }));
  }, []);

  const handleEmailBlur = useCallback(() => {
    setTouchedFields((prev) => ({ ...prev, email: true }));
  }, []);

  const handleCompanyBlur = useCallback(() => {
    setTouchedFields((prev) => ({ ...prev, company: true }));
  }, []);

  const handleContinue = useCallback(() => {
    if (!isFormValid || busy) {
      return;
    }

    if (!projectType || !budget || !timeline) {
      setSubmitError(copy.contactInformation.submitIncompleteError);
      return;
    }

    if (leadId) {
      startTransition(() => {
        nextStep();
      });
      return;
    }

    const parsed = DiscoverySubmissionSchema.safeParse({
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || undefined,
      projectType,
      budget,
      timeline,
      description: description.trim(),
      features: features.length > 0 ? features : undefined,
    });

    if (!parsed.success) {
      setSubmitError(copy.contactInformation.submitIncompleteError);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    void (async () => {
      try {
        const result = await submitDiscovery(parsed.data);

        setLeadId(result.leadId);
        startTransition(() => {
          nextStep();
        });
      } catch (error) {
        if (error instanceof ApiError) {
          setSubmitError(
            error.statusCode >= 500
              ? copy.contactInformation.submitError
              : error.message || copy.contactInformation.submitError,
          );
        } else {
          setSubmitError(copy.contactInformation.submitError);
        }
      } finally {
        setIsSubmitting(false);
      }
    })();
  }, [
    isFormValid,
    busy,
    projectType,
    budget,
    timeline,
    leadId,
    name,
    email,
    company,
    description,
    features,
    copy.contactInformation.submitIncompleteError,
    copy.contactInformation.submitError,
    setLeadId,
    nextStep,
  ]);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
          <span className="h-2 w-2 rounded-full bg-tertiary" aria-hidden="true" />
          {copy.contactInformation.phaseLabel}
        </span>
        <h1 className="font-display text-balance text-3xl font-bold leading-tight tracking-tight text-on-surface sm:text-4xl">
          {copy.contactInformation.heading}
        </h1>
        <p className="text-lg leading-relaxed text-on-surface-variant">
          {copy.contactInformation.description}
        </p>
      </div>

      <div className="mx-auto w-full max-w-lg space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="text-base font-semibold text-on-surface"
          >
            {copy.contactInformation.nameLabel}
          </label>
          <Input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            placeholder={copy.contactInformation.namePlaceholder}
            aria-required="true"
            aria-invalid={showNameError || undefined}
            aria-describedby={showNameError ? 'contact-name-error' : undefined}
            disabled={busy}
          />
          {showNameError && (
            <p
              id="contact-name-error"
              role="alert"
              className="text-sm font-medium text-destructive"
            >
              {copy.contactInformation.nameRequiredError}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="text-base font-semibold text-on-surface"
          >
            {copy.contactInformation.emailLabel}
          </label>
          <Input
            id="contact-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            dir="ltr"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            placeholder={copy.contactInformation.emailPlaceholder}
            aria-required="true"
            aria-invalid={showEmailError || undefined}
            aria-describedby={showEmailError ? 'contact-email-error' : undefined}
            disabled={busy}
          />
          {showEmailError && (
            <p
              id="contact-email-error"
              role="alert"
              className="text-sm font-medium text-destructive"
            >
              {email.trim().length === 0
                ? copy.contactInformation.emailRequiredError
                : copy.contactInformation.emailInvalidError}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="contact-company"
            className="flex items-center gap-2 text-base font-semibold text-on-surface"
          >
            {copy.contactInformation.companyLabel}
            <span className="text-xs font-normal text-on-surface-variant">
              ({copy.contactInformation.optionalFieldLabel})
            </span>
          </label>
          <Input
            id="contact-company"
            type="text"
            autoComplete="organization"
            value={company}
            onChange={handleCompanyChange}
            onBlur={handleCompanyBlur}
            placeholder={copy.contactInformation.companyPlaceholder}
            aria-invalid={showCompanyError || undefined}
            disabled={busy}
          />
        </div>

        {submitError && (
          <p role="alert" className="text-sm font-medium text-destructive">
            {submitError}
          </p>
        )}
      </div>

      <div className="flex flex-col-reverse items-stretch gap-3 pt-4 sm:flex-row sm:justify-end">
        <Button
          variant="secondary"
          size="lg"
          className="min-h-12 sm:w-auto"
          onClick={previousStep}
          disabled={busy}
        >
          {copy.actions.back}
        </Button>
        <Button size="lg" className="min-h-12 sm:w-auto" disabled={!isFormValid || busy} onClick={handleContinue}>
          {busy
            ? copy.contactInformation.submittingLabel
            : copy.actions.continue}
        </Button>
      </div>
    </div>
  );
}

export { ContactInformationScreen };
