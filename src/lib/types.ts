export interface FiveWhys {
  w1: string;
  w2: string;
  w3: string;
  w4: string;
  w5: string;
}

export interface Section1Data {
  category: string;
  proposedItems: string[];
  selectedItem: string;
  fiveWhys: FiveWhys;
  solutionIdeas: string[];
}

export interface SmartGoal {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
}

export interface Section2Data {
  smart: SmartGoal;
  goalStatement: string;
  challenges: string[];
}

export interface ActionItem {
  description: string;
  owner: string;
  dueDate: string;
}

export interface Section3Data {
  objective: string;
  keyResults: string[];
  actions: ActionItem[];
}

export interface PersonalCommitment {
  name: string;
  role: string;
  commitment: string;
}

export interface Section4Data {
  improvementArea: string;
  currentSituation: string;
  desiredOutcome: string;
  personalCommitments: PersonalCommitment[];
}

export interface WorkshopData {
  teamName: string;
  teamMembers: string[];
  section1: Section1Data;
  section2: Section2Data;
  section3: Section3Data;
  section4: Section4Data;
}
