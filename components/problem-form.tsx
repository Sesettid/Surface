"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function ProblemForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!isConfigured) {
      setError("Supabase is not connected yet. Add environment variables before submitting problems.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const description = String(formData.get("description") ?? "").trim();
    const impact = String(formData.get("impact") ?? "").trim();
    const desiredOutcome = String(formData.get("desired_outcome") ?? "").trim();
    const title = description.length > 84 ? `${description.slice(0, 81)}...` : description;

    try {
      const supabase = createBrowserSupabaseClient();
      const { data, error: insertError } = await supabase
        .from("problems")
        .insert({
          title,
          description,
          affected_group: impact,
          current_impact: impact,
          desired_outcome: desiredOutcome
        })
        .select("id,title,description,affected_group,current_impact,desired_outcome")
        .single();

      if (insertError) throw insertError;

      const response = await fetch("/api/analyze-problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem_id: data.id, ...data })
      });

      if (!response.ok && response.status !== 202) {
        throw new Error("The problem was saved, but AI analysis could not be completed.");
      }

      router.push("/submit/thanks");
      router.refresh();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong while submitting the problem."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={onSubmit} className="space-y-7">
          <div className="space-y-2">
            <Label htmlFor="description">
              1. What is a problem, frustration, or opportunity you think is worth solving?
            </Label>
            <Textarea
              id="description"
              name="description"
              required
              className="min-h-40"
              placeholder="Describe the problem, friction, bottleneck, missed opportunity, or recurring frustration."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="impact">2. Who is impacted, and what happens because of this problem?</Label>
            <Textarea
              id="impact"
              name="impact"
              required
              className="min-h-36"
              placeholder="Name the people affected and explain what happens today: delays, rework, confusion, risk, cost, or missed outcomes."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="desired_outcome">3. If this problem was solved, what would improve?</Label>
            <Textarea
              id="desired_outcome"
              name="desired_outcome"
              required
              className="min-h-36"
              placeholder="Describe what would become faster, easier, clearer, safer, or more effective."
            />
          </div>

          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Submit problem
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
