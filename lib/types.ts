export type Problem = {
  id: string;
  title: string;
  description: string;
  affected_group: string;
  current_impact: string;
  desired_outcome: string;
  created_at: string;
};

export type AiAnalysis = {
  id: string;
  problem_id: string;
  summary: string;
  theme: ProblemTheme;
  root_cause: string;
  suggested_solution_area: string;
  impact_score: number;
  complexity_score: number;
  affected_personas?: string[];
};

export type ProblemVote = {
  id: string;
  problem_id: string;
  created_at: string;
};

export type ProblemWithAnalysis = Problem & {
  ai_analysis: AiAnalysis | null;
  vote_count: number;
  priority_score: number;
};

export type ProblemTheme =
  | "Data Quality"
  | "Service Improvement"
  | "Manual Processes"
  | "Technology"
  | "Policy"
  | "Communication"
  | "Customer Experience";

export const problemThemes: ProblemTheme[] = [
  "Data Quality",
  "Service Improvement",
  "Manual Processes",
  "Technology",
  "Policy",
  "Communication",
  "Customer Experience"
];

export type RawProblemSubmission = {
  title?: string;
  description: string;
  affected_group: string;
  current_impact: string;
  desired_outcome: string;
};
