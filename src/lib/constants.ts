export const BUDGET_CATEGORIES: Record<string, string[]> = {
  "Software & Licences": [
    "Unused or underused software subscriptions",
    "Duplicate tools across departments",
    "Premium plans where basic would suffice",
    "Legacy systems with costly maintenance",
    "Auto-renewed contracts not reviewed annually",
  ],
  "Equipment & Plant": [
    "Idle equipment sitting on-site",
    "Excessive hire periods vs actual usage",
    "Poor maintenance leading to breakdowns",
    "Over-specifying equipment for simple tasks",
    "No shared equipment register across projects",
  ],
  "Labour & Subcontractors": [
    "Overtime caused by poor planning",
    "Rework due to unclear instructions",
    "Underutilised skilled workers",
    "Late starts and early finishes on-site",
    "Subcontractor variations from scope creep",
  ],
  "Materials & Logistics": [
    "Over-ordering materials (no re-use system)",
    "Damage and waste from poor storage",
    "Rush deliveries from last-minute orders",
    "No bulk-buy or framework agreements",
    "Theft or untracked material usage",
  ],
  "Admin & Overheads": [
    "Printing and paper-based processes",
    "Unnecessary travel (could be virtual)",
    "Duplicated reporting across teams",
    "Manual data entry that could be automated",
    "Excessive meeting culture with no outcomes",
  ],
  "Compliance & Safety": [
    "Re-inspections from failed audits",
    "Fines from late or missed filings",
    "Training repeated due to poor record-keeping",
    "Incident costs from near-miss inaction",
    "Over-engineering safety for low-risk tasks",
  ],
};

export const IMPROVEMENT_AREAS = [
  "Communication",
  "Planning & Scheduling",
  "Cost Discipline",
  "Decision Speed",
  "Accountability",
  "Collaboration",
  "Quality & Rework",
  "Morale & Motivation",
] as const;

export const MODULE_TITLES = [
  { number: 1, title: "Fighting Cost Waste", description: "Identify one area where your team can cut unnecessary spending." },
  { number: 2, title: "One Thing to Improve", description: "Pick one operational area and describe how it should look." },
  { number: 3, title: "Goal & Challenges", description: "Set a clear goal and list the challenges standing in the way." },
  { number: 4, title: "Breakdown & Action Plan", description: "Break your goal into sub-goals and assign concrete actions." },
] as const;
