import type { ProblemWithAnalysis } from "@/lib/types";

export const demoProblems: ProblemWithAnalysis[] = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    title: "Teams manually rebuild the same status reports every week",
    description:
      "Several teams spend hours collecting updates from spreadsheets, email threads, and chat messages just to prepare weekly leadership reports.",
    affected_group:
      "Program leads, managers, and analysts are impacted. They lose time chasing updates, leaders see inconsistent numbers, and decisions are delayed because the story changes depending on the source.",
    current_impact:
      "Program leads, managers, and analysts are impacted. They lose time chasing updates, leaders see inconsistent numbers, and decisions are delayed because the story changes depending on the source.",
    desired_outcome:
      "Teams would have one reliable operating view, reporting would take minutes instead of hours, and leaders could spend more time on decisions than reconciliation.",
    created_at: "2026-07-01T14:00:00.000Z",
    ai_analysis: {
      id: "10000000-0000-4000-8000-000000000001",
      problem_id: "00000000-0000-4000-8000-000000000001",
      summary:
        "Manual reporting work is consuming delivery capacity and creating inconsistent leadership visibility.",
      theme: "Manual Processes",
      root_cause: "Operational data is fragmented across tools without an agreed source of truth.",
      suggested_solution_area: "Automated portfolio reporting and shared operating metrics",
      impact_score: 9,
      complexity_score: 5,
      affected_personas: ["Program leads", "Managers", "Analysts"]
    },
    vote_count: 12,
    priority_score: 108
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    title: "Service teams cannot trust customer profile data",
    description:
      "Customer records often contain stale contact information, duplicated profiles, and conflicting service history.",
    affected_group:
      "Frontline service employees and customers are impacted. Employees spend extra time validating details, customers repeat information, and follow-up work is routed incorrectly.",
    current_impact:
      "Frontline service employees and customers are impacted. Employees spend extra time validating details, customers repeat information, and follow-up work is routed incorrectly.",
    desired_outcome:
      "Employees would have confidence in the customer record, customers would not need to repeat themselves, and service handoffs would be cleaner.",
    created_at: "2026-07-02T10:30:00.000Z",
    ai_analysis: {
      id: "10000000-0000-4000-8000-000000000002",
      problem_id: "00000000-0000-4000-8000-000000000002",
      summary:
        "Low data quality is slowing service delivery and increasing customer frustration across channels.",
      theme: "Data Quality",
      root_cause: "Customer data ownership, validation, and deduplication rules are unclear.",
      suggested_solution_area: "Master data governance and customer profile cleanup",
      impact_score: 8,
      complexity_score: 7,
      affected_personas: ["Service employees", "Customers", "Operations managers"]
    },
    vote_count: 9,
    priority_score: 72
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    title: "Policy changes are hard to find and interpret",
    description:
      "Employees are not sure which policy version is current, and teams interpret guidance differently when serving customers.",
    affected_group:
      "Employees, managers, and external partners are impacted. Work slows down while people search for clarification, and customers receive inconsistent answers.",
    current_impact:
      "Employees, managers, and external partners are impacted. Work slows down while people search for clarification, and customers receive inconsistent answers.",
    desired_outcome:
      "People would find the right guidance quickly, understand what changed, and apply policy consistently across service channels.",
    created_at: "2026-07-03T16:15:00.000Z",
    ai_analysis: {
      id: "10000000-0000-4000-8000-000000000003",
      problem_id: "00000000-0000-4000-8000-000000000003",
      summary:
        "Policy knowledge is fragmented, creating inconsistent interpretation and slower service decisions.",
      theme: "Policy",
      root_cause: "Policy updates lack a single searchable home and practical change summaries.",
      suggested_solution_area: "Policy knowledge base with change impact summaries",
      impact_score: 7,
      complexity_score: 4,
      affected_personas: ["Employees", "Managers", "External partners"]
    },
    vote_count: 7,
    priority_score: 49
  }
];
