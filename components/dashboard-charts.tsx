"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis
} from "recharts";
import type { ProblemWithAnalysis } from "@/lib/types";

export function ProblemsByThemeChart({ data }: { data: { theme: string; count: number }[] }) {
  if (!data.length) {
    return <EmptyChartState label="Theme distribution appears after the first analyzed submission." />;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="theme" tick={{ fontSize: 12 }} interval={0} angle={-18} textAnchor="end" height={70} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ImpactComplexityMatrix({ problems }: { problems: ProblemWithAnalysis[] }) {
  const data = problems
    .filter((problem) => problem.ai_analysis)
    .map((problem) => ({
      name: problem.title,
      impact: problem.ai_analysis?.impact_score,
      complexity: problem.ai_analysis?.complexity_score,
      priority: problem.priority_score
    }));

  if (!data.length) {
    return <EmptyChartState label="Impact and complexity points appear after AI analysis runs." />;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="complexity" name="Complexity" domain={[0, 10]} />
          <YAxis type="number" dataKey="impact" name="Impact" domain={[0, 10]} />
          <ZAxis type="number" dataKey="priority" range={[80, 380]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={data} fill="hsl(var(--accent))" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

function EmptyChartState({ label }: { label: string }) {
  return (
    <div className="flex h-72 w-full items-center justify-center rounded-md border border-dashed bg-background">
      <p className="max-w-xs text-center text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
