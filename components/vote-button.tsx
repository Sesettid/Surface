"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function VoteButton({ problemId, initialVotes }: { problemId: string; initialVotes: number }) {
  const router = useRouter();
  const [votes, setVotes] = useState(initialVotes);
  const [isVoting, setIsVoting] = useState(false);
  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const isDemoProblem = problemId.startsWith("00000000-");
  
  function getDeviceId() {
  let id = localStorage.getItem("surface_device_id");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("surface_device_id", id);
  }

  return id;
}

  async function vote() {
    if (!isConfigured || isDemoProblem) {
      setVotes((current) => current + 1);
      return;
    }

    setIsVoting(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.from("problem_votes").insert({ problem_id: problemId });
      if (error) throw error;
      setVotes((current) => current + 1);
      router.refresh();
    } finally {
      setIsVoting(false);
    }
  }

  return (
    <Button onClick={vote} variant="outline" size="sm" disabled={isVoting}>
      <ThumbsUp className="h-4 w-4" />
      I have this problem too
      <span className="rounded-md bg-secondary px-2 py-0.5 text-xs">{votes}</span>
    </Button>
  );
}
