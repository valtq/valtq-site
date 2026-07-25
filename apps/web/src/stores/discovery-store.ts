import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProjectType, ProjectBudget, ProjectTimeline } from '@valtq/types';

const STORAGE_KEY = 'valtq-discovery-v1';
const TOTAL_STEPS = 6;
const MAX_IMPLEMENTED_STEP = 5;

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
          currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS),
          navigationDirection: 'forward',
        })),

      previousStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
          navigationDirection: 'backward',
        })),

      goToStep: (step) =>
        set((state) => ({
          currentStep: Math.max(1, Math.min(step, TOTAL_STEPS)),
          navigationDirection: step > state.currentStep ? 'forward' : 'backward',
        })),

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
        const merged = { ...currentState, ...(persistedState as Partial<DiscoveryState>) };
        if (merged.currentStep > MAX_IMPLEMENTED_STEP) {
          merged.currentStep = MAX_IMPLEMENTED_STEP;
          merged.navigationDirection = 'backward';
        }
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
