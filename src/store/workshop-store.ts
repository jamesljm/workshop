import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WorkshopData, ActionItem, FiveWhys, SmartGoal, PersonalCommitment } from "@/lib/types";

const emptyFiveWhys: FiveWhys = { w1: "", w2: "", w3: "", w4: "", w5: "" };
const emptySmart: SmartGoal = { specific: "", measurable: "", achievable: "", relevant: "", timeBound: "" };

const initialData: WorkshopData = {
  teamName: "",
  teamMembers: ["", "", "", "", ""],
  section1: { category: "", proposedItems: [], selectedItem: "", fiveWhys: { ...emptyFiveWhys }, solutionIdeas: [] },
  section2: { smart: { ...emptySmart }, goalStatement: "", challenges: [] },
  section3: { objective: "", keyResults: [], actions: [] },
  section4: { improvementArea: "", currentSituation: "", desiredOutcome: "", personalCommitments: [] },
};

function assembleGoal(smart: SmartGoal): string {
  const parts: string[] = [];
  if (smart.specific) parts.push(smart.specific);
  if (smart.measurable) parts.push(`by ${smart.measurable}`);
  if (smart.achievable) parts.push(`(${smart.achievable})`);
  if (smart.timeBound) parts.push(`by ${smart.timeBound}`);
  return parts.join(", ");
}

interface WorkshopStore extends WorkshopData {
  currentSection: number; // 0 = landing, 1-4 = missions, 5 = summary

  setTeamName: (name: string) => void;
  setTeamMember: (index: number, value: string) => void;

  // Section 1
  setCategory: (category: string) => void;
  addProposedItem: (item: string) => void;
  updateProposedItem: (index: number, value: string) => void;
  removeProposedItem: (index: number) => void;
  setSelectedItem: (item: string) => void;
  setFiveWhy: (key: keyof FiveWhys, value: string) => void;
  addSolutionIdea: (idea: string) => void;
  removeSolutionIdea: (index: number) => void;

  // Section 2
  setSmartField: (key: keyof SmartGoal, value: string) => void;
  addChallenge: (challenge: string) => void;
  removeChallenge: (index: number) => void;

  // Section 3
  addKeyResult: (kr: string) => void;
  removeKeyResult: (index: number) => void;
  addAction: (action: ActionItem) => void;
  removeAction: (index: number) => void;

  // Section 4
  setImprovementArea: (area: string) => void;
  setCurrentSituation: (text: string) => void;
  setDesiredOutcome: (text: string) => void;
  updatePersonalCommitment: (index: number, field: keyof PersonalCommitment, value: string) => void;

  // Navigation
  setCurrentSection: (section: number) => void;

  reset: () => void;
  getData: () => WorkshopData;
}

export const useWorkshopStore = create<WorkshopStore>()(
  persist(
    (set, get) => ({
      ...initialData,
      currentSection: 0,

      setTeamName: (name) => set({ teamName: name }),
      setTeamMember: (index, value) =>
        set((state) => {
          const members = [...state.teamMembers];
          members[index] = value;
          // Sync personal commitments names
          const commitments = [...state.section4.personalCommitments];
          if (commitments[index]) {
            commitments[index] = { ...commitments[index], name: value };
          }
          return { teamMembers: members, section4: { ...state.section4, personalCommitments: commitments } };
        }),

      // Section 1
      setCategory: (category) =>
        set((state) => ({
          section1: { ...state.section1, category, proposedItems: [], selectedItem: "", fiveWhys: { ...emptyFiveWhys }, solutionIdeas: [] },
        })),
      addProposedItem: (item) =>
        set((state) => ({
          section1: { ...state.section1, proposedItems: [...state.section1.proposedItems, item] },
        })),
      updateProposedItem: (index, value) =>
        set((state) => ({
          section1: {
            ...state.section1,
            proposedItems: state.section1.proposedItems.map((it, i) => (i === index ? value : it)),
            selectedItem: state.section1.selectedItem === state.section1.proposedItems[index] ? value : state.section1.selectedItem,
          },
        })),
      removeProposedItem: (index) =>
        set((state) => {
          const removed = state.section1.proposedItems[index];
          const newItems = state.section1.proposedItems.filter((_, i) => i !== index);
          const wasSelected = state.section1.selectedItem === removed;
          return {
            section1: {
              ...state.section1,
              proposedItems: newItems,
              selectedItem: wasSelected ? "" : state.section1.selectedItem,
              fiveWhys: wasSelected ? { ...emptyFiveWhys } : state.section1.fiveWhys,
              solutionIdeas: wasSelected ? [] : state.section1.solutionIdeas,
            },
          };
        }),
      setSelectedItem: (item) =>
        set((state) => ({
          section1: { ...state.section1, selectedItem: item, fiveWhys: { ...emptyFiveWhys }, solutionIdeas: [] },
        })),
      setFiveWhy: (key, value) =>
        set((state) => ({
          section1: { ...state.section1, fiveWhys: { ...state.section1.fiveWhys, [key]: value } },
        })),
      addSolutionIdea: (idea) =>
        set((state) => ({
          section1: { ...state.section1, solutionIdeas: [...state.section1.solutionIdeas, idea] },
        })),
      removeSolutionIdea: (index) =>
        set((state) => ({
          section1: { ...state.section1, solutionIdeas: state.section1.solutionIdeas.filter((_, i) => i !== index) },
        })),

      // Section 2
      setSmartField: (key, value) =>
        set((state) => {
          const newSmart = { ...state.section2.smart, [key]: value };
          const goalStatement = assembleGoal(newSmart);
          return {
            section2: { ...state.section2, smart: newSmart, goalStatement },
            section3: { ...state.section3, objective: goalStatement },
          };
        }),
      addChallenge: (challenge) =>
        set((state) => ({
          section2: { ...state.section2, challenges: [...state.section2.challenges, challenge] },
        })),
      removeChallenge: (index) =>
        set((state) => ({
          section2: { ...state.section2, challenges: state.section2.challenges.filter((_, i) => i !== index) },
        })),

      // Section 3
      addKeyResult: (kr) =>
        set((state) => ({
          section3: { ...state.section3, keyResults: [...state.section3.keyResults, kr] },
        })),
      removeKeyResult: (index) =>
        set((state) => ({
          section3: { ...state.section3, keyResults: state.section3.keyResults.filter((_, i) => i !== index) },
        })),
      addAction: (action) =>
        set((state) => ({
          section3: { ...state.section3, actions: [...state.section3.actions, action] },
        })),
      removeAction: (index) =>
        set((state) => ({
          section3: { ...state.section3, actions: state.section3.actions.filter((_, i) => i !== index) },
        })),

      // Section 4
      setImprovementArea: (area) =>
        set((state) => ({
          section4: { ...state.section4, improvementArea: area },
        })),
      setCurrentSituation: (text) =>
        set((state) => ({
          section4: { ...state.section4, currentSituation: text },
        })),
      setDesiredOutcome: (text) =>
        set((state) => ({
          section4: { ...state.section4, desiredOutcome: text },
        })),
      updatePersonalCommitment: (index, field, value) =>
        set((state) => {
          const commitments = [...state.section4.personalCommitments];
          // Ensure array has enough entries
          while (commitments.length <= index) {
            const memberName = state.teamMembers[commitments.length] || "";
            commitments.push({ name: memberName, role: "", commitment: "" });
          }
          commitments[index] = { ...commitments[index], [field]: value };
          return { section4: { ...state.section4, personalCommitments: commitments } };
        }),

      setCurrentSection: (section) => set({ currentSection: section }),

      reset: () => set({ ...initialData, currentSection: 0 }),

      getData: () => {
        const state = get();
        return {
          teamName: state.teamName,
          teamMembers: state.teamMembers,
          section1: state.section1,
          section2: state.section2,
          section3: state.section3,
          section4: state.section4,
        };
      },
    }),
    {
      name: "workshop-storage-v4",
    }
  )
);
