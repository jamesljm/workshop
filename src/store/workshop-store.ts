import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WorkshopData, ActionItem } from "@/lib/types";

const initialData: WorkshopData = {
  teamName: "",
  module1: { category: "", selectedItem: "", ideas: [] },
  module2: { area: "", currentSituation: "", desiredOutcome: "" },
  module3: { goal: "", challenges: [] },
  module4: { bigGoal: "", subGoals: [], actions: [] },
};

interface WorkshopStore extends WorkshopData {
  currentModule: number; // 0 = landing, 1-4 = modules, 5 = summary

  // Landing
  setTeamName: (name: string) => void;

  // Module 1
  setCategory: (category: string) => void;
  setSelectedItem: (item: string) => void;
  addIdea: (idea: string) => void;
  removeIdea: (index: number) => void;

  // Module 2
  setArea: (area: string) => void;
  setCurrentSituation: (text: string) => void;
  setDesiredOutcome: (text: string) => void;

  // Module 3
  setGoal: (goal: string) => void;
  addChallenge: (challenge: string) => void;
  removeChallenge: (index: number) => void;

  // Module 4
  addSubGoal: (subGoal: string) => void;
  removeSubGoal: (index: number) => void;
  addAction: (action: ActionItem) => void;
  removeAction: (index: number) => void;

  // Navigation
  setCurrentModule: (module: number) => void;

  // Reset
  reset: () => void;

  // Get full data for PDF
  getData: () => WorkshopData;
}

export const useWorkshopStore = create<WorkshopStore>()(
  persist(
    (set, get) => ({
      ...initialData,
      currentModule: 0,

      setTeamName: (name) => set({ teamName: name }),

      setCategory: (category) =>
        set((state) => ({
          module1: { ...state.module1, category, selectedItem: "", ideas: [] },
        })),
      setSelectedItem: (item) =>
        set((state) => ({
          module1: { ...state.module1, selectedItem: item, ideas: [] },
        })),
      addIdea: (idea) =>
        set((state) => ({
          module1: { ...state.module1, ideas: [...state.module1.ideas, idea] },
        })),
      removeIdea: (index) =>
        set((state) => ({
          module1: {
            ...state.module1,
            ideas: state.module1.ideas.filter((_, i) => i !== index),
          },
        })),

      setArea: (area) =>
        set((state) => ({
          module2: { ...state.module2, area },
        })),
      setCurrentSituation: (text) =>
        set((state) => ({
          module2: { ...state.module2, currentSituation: text },
        })),
      setDesiredOutcome: (text) =>
        set((state) => ({
          module2: { ...state.module2, desiredOutcome: text },
        })),

      setGoal: (goal) =>
        set((state) => ({
          module3: { ...state.module3, goal },
          module4: { ...state.module4, bigGoal: goal },
        })),
      addChallenge: (challenge) =>
        set((state) => ({
          module3: {
            ...state.module3,
            challenges: [...state.module3.challenges, challenge],
          },
        })),
      removeChallenge: (index) =>
        set((state) => ({
          module3: {
            ...state.module3,
            challenges: state.module3.challenges.filter((_, i) => i !== index),
          },
        })),

      addSubGoal: (subGoal) =>
        set((state) => ({
          module4: {
            ...state.module4,
            subGoals: [...state.module4.subGoals, subGoal],
          },
        })),
      removeSubGoal: (index) =>
        set((state) => ({
          module4: {
            ...state.module4,
            subGoals: state.module4.subGoals.filter((_, i) => i !== index),
          },
        })),
      addAction: (action) =>
        set((state) => ({
          module4: {
            ...state.module4,
            actions: [...state.module4.actions, action],
          },
        })),
      removeAction: (index) =>
        set((state) => ({
          module4: {
            ...state.module4,
            actions: state.module4.actions.filter((_, i) => i !== index),
          },
        })),

      setCurrentModule: (module) => set({ currentModule: module }),

      reset: () => set({ ...initialData, currentModule: 0 }),

      getData: () => {
        const state = get();
        return {
          teamName: state.teamName,
          module1: state.module1,
          module2: state.module2,
          module3: state.module3,
          module4: state.module4,
        };
      },
    }),
    {
      name: "workshop-storage",
    }
  )
);
