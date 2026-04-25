export interface CategoryInfo {
  name: string;
  description: string;
  group: string;
}

export const BUDGET_CATEGORIES: CategoryInfo[] = [
  // MATERIAL
  { name: "Materials", description: "Concrete, steel, aggregates, cement, consumable raw inputs", group: "MATERIAL" },
  { name: "Consumables & Short-life Hardware (<2yr)", description: "Drill bits, casings, tremie pipes, hoses, PPE", group: "MATERIAL" },
  { name: "Site Assets & Long-life Hardware (>2yr)", description: "Rigs, cranes, generators, containers, vehicles", group: "MATERIAL" },
  // MANPOWER
  { name: "Labour", description: "Direct workers — OT, levies, agency fees, training", group: "MANPOWER" },
  { name: "Staff", description: "Salaried site & office personnel, benefits, claims", group: "MANPOWER" },
  // MACHINERY
  { name: "Hiring - Equipment & Plant", description: "Rig hire, crane hire, pump hire, fuel, maintenance", group: "MACHINERY" },
  { name: "Logistics", description: "Transport, mobilisation, waste disposal, site services", group: "MACHINERY" },
  // SUBCONTRACTOR
  { name: "RC Subcontractors", description: "Reinforced-concrete piling subcontractors", group: "SUBCONTRACTOR" },
  { name: "Non-RC Subcontractors", description: "Other specialist subcontractors (testing, survey, etc.)", group: "SUBCONTRACTOR" },
];

export const CATEGORY_GROUPS = ["MATERIAL", "MANPOWER", "MACHINERY", "SUBCONTRACTOR"] as const;

export const FIVE_WHY_PROMPTS = [
  "Why is [your item] a problem right now?",
  "Why does that happen?",
  "Why does that happen?",
  "Why does that happen?",
  "Why does that happen? — This is your root cause.",
] as const;

export const IMPROVEMENT_AREAS: { name: string; description: string }[] = [
  { name: "Communication", description: "Information flow between site, office, and management" },
  { name: "Planning & Scheduling", description: "Work sequencing and tracking ahead of time" },
  { name: "Cost Discipline", description: "Sticking to budgets and flagging variance early" },
  { name: "Decision Speed", description: "Acting quickly without escalating everything" },
  { name: "Accountability", description: "Clear ownership and reliable follow-through" },
  { name: "Collaboration", description: "Working across functions without silos" },
  { name: "Quality & Rework", description: "Reducing errors, snagging, and corrections" },
];

export const MISSION_TITLES = [
  { number: 1, title: "IDENTIFY THE THREAT", description: "Choose a cost category, list items, focus on one, run 5 Whys, brainstorm solutions.", framework: "5 Whys", time: "20 min" },
  { number: 2, title: "LOCK IN THE OBJECTIVE", description: "Translate your root cause into a SMART goal with measurable targets.", framework: "SMART", time: "20 min" },
  { number: 3, title: "PLAN THE ATTACK", description: "Zoom from your 3-month goal into monthly milestones and this-week tasks.", framework: "OKR-lite", time: "20 min" },
  { number: 4, title: "KNOW YOUR WEAKNESS", description: "Identify the single biggest behaviour change and make personal commitments.", framework: "Commitment", time: "10 min" },
] as const;
