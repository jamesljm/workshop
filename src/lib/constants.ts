export interface CategoryInfo {
  name: string;
  description: string;
  group: string;
}

export const BUDGET_CATEGORIES: CategoryInfo[] = [
  // MATERIAL
  { name: "Materials", description: "Concrete, steel, rebar, casing, grout, sand, aggregate, pipes, formwork", group: "MATERIAL" },
  { name: "Consumables & Short-life Hardware (<2yr)", description: "PPE, drill bits, blades, filters, small tools", group: "MATERIAL" },
  { name: "Site Assets & Long-life Hardware (>2yr)", description: "Generators (owned), survey instruments, machinery", group: "MATERIAL" },
  // MANPOWER
  { name: "Labour", description: "Direct workers, foreign workers, levies, permits, OT, allowances, agency fees", group: "MANPOWER" },
  { name: "Staff", description: "Headcount, staff overhead efficiency, staff welfare and staff related costs", group: "MANPOWER" },
  // MACHINERY
  { name: "Hiring - Equipment & Plant", description: "Rig, crane, pump, generator, survey equipment hire", group: "MACHINERY" },
  { name: "Logistics", description: "Transport, haulage, mobilisation, fuel for vehicles, site deliveries", group: "MACHINERY" },
  // SUBCONTRACTOR
  { name: "RC Subcontractors", description: "Piling, structural concrete, RC elements", group: "SUBCONTRACTOR" },
  { name: "Non-RC Subcontractors", description: "M&E, waterproofing, landscaping, fencing, etc.", group: "SUBCONTRACTOR" },
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
