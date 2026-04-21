export interface CategoryInfo {
  name: string;
  description: string;
}

export const BUDGET_CATEGORIES: CategoryInfo[] = [
  { name: "Software & Licences", description: "ERP, M365, design tools, cloud storage, site apps" },
  { name: "Equipment & Plant", description: "Rig hire, fuel, maintenance, small tools, insurance" },
  { name: "Labour & Subcontractors", description: "OT, levies, subcon mark-ups, agency fees, training" },
  { name: "Materials & Logistics", description: "Concrete, steel, diesel, transport, waste disposal" },
  { name: "Admin & Overheads", description: "Office rental, printing, travel, bank charges, legal fees" },
  { name: "Compliance & Safety", description: "DOSH, PPE, safety officer, bonds, environmental" },
];

export const FIVE_WHY_PROMPTS = [
  "Why is this cost high?",
  "Why does that happen?",
  "Why is that the case?",
  "Why does that occur?",
  "Root cause — why ultimately?",
] as const;

export const IMPROVEMENT_AREAS: { name: string; description: string }[] = [
  { name: "Communication", description: "Information flow between site, office, and management" },
  { name: "Planning & Scheduling", description: "How well work is sequenced and tracked ahead of time" },
  { name: "Cost Discipline", description: "How consistently teams stick to budgets and flag variance" },
  { name: "Decision Speed", description: "How quickly teams act without escalating everything" },
  { name: "Accountability", description: "Whether ownership is clear and follow-through is reliable" },
  { name: "Collaboration", description: "How well the team works across functions" },
  { name: "Quality & Rework", description: "Reducing errors, snagging, and corrections" },
  { name: "Morale & Motivation", description: "Team energy and commitment during tough periods" },
];

export const SECTION_TITLES = [
  { number: 1, title: "Identify the Cost Problem", description: "Choose a cost category, propose items, run 5 Whys, and brainstorm solutions.", framework: "5 Whys", time: "15 min" },
  { number: 2, title: "Set a Goal", description: "Translate your root cause into a SMART goal with measurable targets.", framework: "SMART", time: "10 min" },
  { number: 3, title: "Break It Down", description: "Zoom from your 3-month goal into monthly milestones and this-week tasks.", framework: "OKR-lite", time: "15 min" },
  { number: 4, title: "Reflect", description: "Identify the single biggest behaviour change your team needs.", framework: "Reflection", time: "10 min" },
] as const;
