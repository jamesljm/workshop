export interface ActionItem {
  description: string;
  owner: string;
  dueDate: string;
}

export interface Module1Data {
  category: string;
  selectedItem: string;
  ideas: string[];
}

export interface Module2Data {
  area: string;
  currentSituation: string;
  desiredOutcome: string;
}

export interface Module3Data {
  goal: string;
  challenges: string[];
}

export interface Module4Data {
  bigGoal: string;
  subGoals: string[];
  actions: ActionItem[];
}

export interface WorkshopData {
  teamName: string;
  module1: Module1Data;
  module2: Module2Data;
  module3: Module3Data;
  module4: Module4Data;
}
