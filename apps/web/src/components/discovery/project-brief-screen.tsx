'use client';

import { useCallback, useRef, useState } from 'react';
import { DiscoverySubmissionSchema } from '@valtq/types';
import { discoveryCopy, type Locale } from '@/content/discovery-copy';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useDiscoveryStore } from '@/stores/discovery-store';

interface ProjectBriefScreenProps {
  locale: Locale;
}

/**
 * Screen 3: Project Brief with a single textarea for project description.
 * Validates using the shared DiscoverySubmissionSchema.shape.description.
 * Visual reference: Stitch "Discovery: Project Details" screen.
 */
function ProjectBriefScreen({ locale }: ProjectBriefScreenProps) {
  const copy = discoveryCopy[locale];
  const description = useDiscoveryStore((s) => s.description);
  const setDescription = useDiscoveryStore((s) => s.setDescription);
  const previousStep = useDiscoveryStore((s) => s.previousStep);
  const nextStep = useDiscoveryStore((s) => s.nextStep);

  const [touched, setTouched] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isValid = DiscoverySubmissionSchema.shape.description.safeParse(description.trim()).success;
  const showError = (touched || attempted) && !isValid;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
      if (!touched) setTouched(true);
    },
    [setDescription, touched],
  );

  const handleContinue = useCallback(() => {
    if (!isValid) {
      setAttempted(true);
      textareaRef.current?.focus();
      return;
    }
    nextStep();
  }, [isValid, nextStep]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
          {copy.projectBrief.phaseLabel}
        </span>
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-on-surface">
          {copy.projectBrief.heading}
        </h2>
        <p className="text-lg leading-relaxed text-on-surface-variant">
          {copy.projectBrief.description}
        </p>
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <label
          htmlFor="project-brief-textarea"
          className="text-sm font-medium text-on-surface"
        >
          {copy.projectBrief.textareaLabel}
        </label>
        <Textarea
          ref={textareaRef}
          id="project-brief-textarea"
          value={description}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          placeholder={copy.projectBrief.textareaPlaceholder}
          aria-invalid={showError || undefined}
          aria-describedby={showError ? 'project-brief-error' : 'project-brief-guidance'}
          rows={7}
        />
        {showError ? (
          <p
            id="project-brief-error"
            role="alert"
            className="text-sm font-medium text-destructive"
          >
            {copy.projectBrief.validationMessage}
          </p>
        ) : (
          <p
            id="project-brief-guidance"
            className="text-sm text-on-surface-variant"
          >
            {copy.projectBrief.characterGuidance}
          </p>
        )}
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Button variant="secondary" size="lg" onClick={previousStep}>
          {copy.actions.back}
        </Button>
        <Button size="lg" disabled={!isValid} onClick={handleContinue}>
          {copy.actions.continue}
        </Button>
      </div>
    </div>
  );
}

export { ProjectBriefScreen };
