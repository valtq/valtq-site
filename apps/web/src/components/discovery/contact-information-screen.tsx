'use client';

import { useCallback, useState } from 'react';
import { DiscoverySubmissionSchema } from '@valtq/types';
import { discoveryCopy, type Locale } from '@/content/discovery-copy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDiscoveryStore } from '@/stores/discovery-store';

interface ContactInformationScreenProps {
  locale: Locale;
}

/**
 * Screen 5: Contact Information form.
 * Validates name (required) and email (required) using the shared
 * DiscoverySubmissionSchema field schemas. Company is optional.
 * Continue is disabled until Screen 6 (Cal.com Booking) is implemented in Phase 4.
 */
function ContactInformationScreen({ locale }: ContactInformationScreenProps) {
  const copy = discoveryCopy[locale];
  const name = useDiscoveryStore((s) => s.name);
  const email = useDiscoveryStore((s) => s.email);
  const company = useDiscoveryStore((s) => s.company);
  const setContactField = useDiscoveryStore((s) => s.setContactField);
  const previousStep = useDiscoveryStore((s) => s.previousStep);

  const [touchedFields, setTouchedFields] = useState<{
    name: boolean;
    email: boolean;
    company: boolean;
  }>({ name: false, email: false, company: false });

  const isNameValid = DiscoverySubmissionSchema.shape.name.safeParse(name.trim()).success;
  const isEmailValid = DiscoverySubmissionSchema.shape.email.safeParse(email.trim()).success;
  const isCompanyValid = DiscoverySubmissionSchema.shape.company.safeParse(company).success;

  const showNameError = touchedFields.name && !isNameValid;
  const showEmailError = touchedFields.email && !isEmailValid;
  const showCompanyError = touchedFields.company && !isCompanyValid;

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setContactField('name', e.target.value);
    },
    [setContactField],
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setContactField('email', e.target.value);
    },
    [setContactField],
  );

  const handleCompanyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
          {copy.contactInformation.phaseLabel}
        </span>
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-on-surface">
          {copy.contactInformation.heading}
        </h2>
        <p className="text-lg leading-relaxed text-on-surface-variant">
          {copy.contactInformation.description}
        </p>
      </div>

      {/* Form fields */}
      <div className="mx-auto w-full max-w-lg space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="text-sm font-medium text-on-surface"
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

        {/* Business Email */}
        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="text-sm font-medium text-on-surface"
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

        {/* Company */}
        <div className="space-y-2">
          <label
            htmlFor="contact-company"
            className="flex items-center gap-2 text-sm font-medium text-on-surface"
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
          />
        </div>
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Button variant="secondary" size="lg" onClick={previousStep}>
          {copy.actions.back}
        </Button>
        {/* Screen 6 (Cal.com Booking) is implemented in Phase 4 */}
        <Button size="lg" disabled>
          {copy.actions.continue}
        </Button>
      </div>
    </div>
  );
}

export { ContactInformationScreen };
