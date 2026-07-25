'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import type { Locale } from '@/content/discovery-copy';
import { discoveryCopy } from '@/content/discovery-copy';
import { useDiscoveryStore } from '@/stores/discovery-store';
import { WizardShell } from './wizard-shell';
import { IntroScreen } from './intro-screen';
import { ProjectTypeScreen } from './project-type-screen';
import { ProjectBriefScreen } from './project-brief-screen';
import { BudgetTimelineScreen } from './budget-timeline-screen';
import { ContactInformationScreen } from './contact-information-screen';
import { BookingScreen } from './booking-screen';

const TOTAL_STEPS = 6;

/**
 * Build RTL-aware slide variants.
 * In LTR forward: enter from end (+x), exit to start (-x).
 * In RTL forward: enter from start (-x), exit to end (+x).
 * Backward is the inverse.
 */
function createSlideVariants(isRtl: boolean): Variants {
  const dir = isRtl ? -1 : 1;
  return {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? 80 * dir : -80 * dir,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? -80 * dir : 80 * dir,
      opacity: 0,
    }),
  };
}

interface DiscoveryWizardProps {
  locale: Locale;
}

/**
 * Discovery wizard. Client component that manages screen rendering,
 * hydration, and animated transitions between steps.
 * Screens 1–6 are implemented in Phase 1, Phase 2, Phase 3, and Phase 4.
 */
function DiscoveryWizard({ locale }: DiscoveryWizardProps) {
  const copy = discoveryCopy[locale];
  const currentStep = useDiscoveryStore((s) => s.currentStep);
  const navigationDirection = useDiscoveryStore((s) => s.navigationDirection);
  const hasHydrated = useDiscoveryStore((s) => s.hasHydrated);

  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isReady = mounted && hasHydrated;

  const safeCurrentStep =
    Number.isFinite(currentStep) &&
    Number.isInteger(currentStep) &&
    currentStep >= 1 &&
    currentStep <= TOTAL_STEPS
      ? currentStep
      : 1;

  const showBack = safeCurrentStep > 1;
  const previousStep = useDiscoveryStore((s) => s.previousStep);

  const isRtl = locale === 'ar';
  const slideVariants = useMemo(() => createSlideVariants(isRtl), [isRtl]);

  // Reduced motion: use instant fade instead of slide
  const transition = useMemo(
    () =>
      prefersReducedMotion
        ? { x: { duration: 0 }, opacity: { duration: 0.15 } }
        : {
            x: { type: 'tween' as const, duration: 0.25, ease: 'easeInOut' as const },
            opacity: { duration: 0.2, ease: 'easeInOut' as const },
          },
    [prefersReducedMotion],
  );

  const subLabels: Record<number, string> = {
    1: copy.intro.subLabel,
    2: copy.projectType.subLabel,
    3: copy.projectBrief.subLabel,
    4: copy.budgetTimeline.heading,
    5: copy.contactInformation.subLabel,
    6: copy.booking.subLabel,
  };

  const stepText = copy.stepCounter(safeCurrentStep, TOTAL_STEPS, locale);
  const progressAriaLabel = copy.progressAriaLabel;

  const renderScreen = () => {
    switch (safeCurrentStep) {
      case 1:
        return <IntroScreen locale={locale} />;
      case 2:
        return <ProjectTypeScreen locale={locale} />;
      case 3:
        return <ProjectBriefScreen locale={locale} />;
      case 4:
        return <BudgetTimelineScreen locale={locale} />;
      case 5:
        return <ContactInformationScreen locale={locale} />;
      case 6:
        return <BookingScreen locale={locale} />;
      default:
        return <IntroScreen locale={locale} />;
    }
  };

  const screenKey = `screen-${safeCurrentStep}`;

  return (
    <WizardShell
      currentStep={safeCurrentStep}
      totalSteps={TOTAL_STEPS}
      locale={locale}
      progressLabel={copy.progressLabel}
      progressAriaLabel={progressAriaLabel}
      subLabel={subLabels[safeCurrentStep] ?? ''}
      stepText={stepText}
      showBack={showBack}
      onBack={previousStep}
      backLabel={copy.actions.back}
    >
      {!isReady ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <AnimatePresence mode="wait" custom={navigationDirection}>
          <motion.div
            key={screenKey}
            custom={navigationDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      )}
    </WizardShell>
  );
}

export { DiscoveryWizard };
