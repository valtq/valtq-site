import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ProjectBudgetSchema,
  ProjectTimelineSchema,
  ProjectTypeSchema,
  type ProjectBudget,
  type ProjectTimeline,
  type ProjectType,
} from '@valtq/types';

const STORAGE_KEY = 'valtq-discovery-v1';
const TOTAL_STEPS = 6;
const MAX_IMPLEMENTED_STEP = 6;

function normalizeStep(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 1;
  }

  return Math.max(
    1,
    Math.min(Math.trunc(value), MAX_IMPLEMENTED_STEP),
  );
}

function normalizeNavigationDirection(
  value: unknown,
): 'forward' | 'backward' {
  return value === 'backward' ? 'backward' : 'forward';
}

/**
 * Rehydrate a persisted enum field. Returns the value only when it still
 * matches the current enum; otherwise null so the user re-selects instead of
 * submitting a stale value that would fail schema validation (e.g. old
 * budget/timeline ranges persisted in localStorage).
 */
function safeEnumValue<T>(
  value: unknown,
  schema: { safeParse: (input: unknown) => { success: boolean } },
): T | null {
  if (value === undefined || value === null) return null;
  return schema.safeParse(value).success ? (value as T) : null;
}

interface DiscoveryState {
  currentStep: number;
  navigationDirection: 'forward' | 'backward';
  projectType: ProjectType | null;
  description: string;
  budget: ProjectBudget | null;
  timeline: ProjectTimeline | null;
  features: string[];
  name: string;
  email: string;
  company: string;
  leadId: string | null;
  hasHydrated: boolean;
}

interface DiscoveryActions {
  setProjectType: (type: ProjectType) => void;
  setDescription: (description: string) => void;
  setBudget: (budget: ProjectBudget) => void;
  setTimeline: (timeline: ProjectTimeline) => void;
  setFeatures: (features: string[]) => void;
  setContactField: <K extends 'name' | 'email' | 'company'>(
    field: K,
    value: string,
  ) => void;
  setLeadId: (leadId: string | null) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
  setHasHydrated: (hydrated: boolean) => void;
}

const initialState: DiscoveryState = {
  currentStep: 1,
  navigationDirection: 'forward',
  projectType: null,
  description: '',
  budget: null,
  timeline: null,
  features: [],
  name: '',
  email: '',
  company: '',
  leadId: null,
  hasHydrated: false,
};

export const useDiscoveryStore = create<DiscoveryState & DiscoveryActions>()(
  persist(
    (set) => ({
      ...initialState,

      setProjectType: (projectType) =>
        set({ projectType, leadId: null }),

      setDescription: (description) =>
        set({ description, leadId: null }),

      setBudget: (budget) => set({ budget, leadId: null }),

      setTimeline: (timeline) => set({ timeline, leadId: null }),

      setFeatures: (features) => set({ features, leadId: null }),

      setContactField: (field, value) =>
        set({ [field]: value, leadId: null }),

      setLeadId: (leadId) => set({ leadId }),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(
            normalizeStep(state.currentStep) + 1,
            TOTAL_STEPS,
          ),
          navigationDirection: 'forward',
        })),

      previousStep: () =>
        set((state) => ({
          currentStep: Math.max(
            normalizeStep(state.currentStep) - 1,
            1,
          ),
          navigationDirection: 'backward',
        })),

      goToStep: (step) =>
        set((state) => {
          const normalizedTarget = normalizeStep(step);
          const normalizedCurrent = normalizeStep(state.currentStep);
          return {
            currentStep: normalizedTarget,
            navigationDirection:
              normalizedTarget > normalizedCurrent ? 'forward' : 'backward',
          };
        }),

      reset: () =>
        set((state) => ({
          ...initialState,
          hasHydrated: state.hasHydrated,
        })),

      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        currentStep: state.currentStep,
        navigationDirection: state.navigationDirection,
        projectType: state.projectType,
        description: state.description,
        budget: state.budget,
        timeline: state.timeline,
        features: state.features,
        name: state.name,
        email: state.email,
        company: state.company,
        leadId: state.leadId,
      }),
      merge: (persistedState, currentState) => {
        const persisted =
          persistedState !== null &&
          typeof persistedState === 'object'
            ? (persistedState as Record<string, unknown>)
            : {};
        const merged: DiscoveryState & DiscoveryActions = {
          ...currentState,
          currentStep: normalizeStep(persisted.currentStep),
          navigationDirection: normalizeNavigationDirection(
            persisted.navigationDirection,
          ),
          projectType:
            safeEnumValue<ProjectType>(persisted.projectType, ProjectTypeSchema) ??
            currentState.projectType,
          description:
            typeof persisted.description === 'string'
              ? persisted.description
              : currentState.description,
          budget:
            safeEnumValue<ProjectBudget>(persisted.budget, ProjectBudgetSchema) ??
            currentState.budget,
          timeline:
            safeEnumValue<ProjectTimeline>(persisted.timeline, ProjectTimelineSchema) ??
            currentState.timeline,
          features: Array.isArray(persisted.features)
            ? (persisted.features as unknown[]).filter(
                (feature): feature is string =>
                  typeof feature === 'string' && feature.trim().length > 0,
              )
            : currentState.features,
          name:
            typeof persisted.name === 'string'
              ? persisted.name
              : currentState.name,
          email:
            typeof persisted.email === 'string'
              ? persisted.email
              : currentState.email,
          company:
            typeof persisted.company === 'string'
              ? persisted.company
              : currentState.company,
          leadId:
            typeof persisted.leadId === 'string'
              ? persisted.leadId
              : currentState.leadId,
          hasHydrated: currentState.hasHydrated,
        };
        return merged;
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    },
  ),
);
