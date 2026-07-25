import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProjectType, ProjectBudget, ProjectTimeline } from '@valtq/types';

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
  hasHydrated: false,
};

export const useDiscoveryStore = create<DiscoveryState & DiscoveryActions>()(
  persist(
    (set) => ({
      ...initialState,

      setProjectType: (projectType) => set({ projectType }),

      setDescription: (description) => set({ description }),

      setBudget: (budget) => set({ budget }),

      setTimeline: (timeline) => set({ timeline }),

      setFeatures: (features) => set({ features }),

      setContactField: (field, value) => set({ [field]: value }),

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
          projectType: (persisted.projectType as ProjectType | null) ?? currentState.projectType,
          description:
            typeof persisted.description === 'string'
              ? persisted.description
              : currentState.description,
          budget: (persisted.budget as ProjectBudget | null) ?? currentState.budget,
          timeline: (persisted.timeline as ProjectTimeline | null) ?? currentState.timeline,
          features: Array.isArray(persisted.features)
            ? (persisted.features as string[])
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
