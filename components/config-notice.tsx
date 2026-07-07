import { AlertCircle, CheckCircle2 } from "lucide-react";

export function ConfigNotice({ context }: { context: "read" | "submit" }) {
  const hasPublicSupabase = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const hasServiceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const hasOpenAi = Boolean(process.env.OPENAI_API_KEY);

  if (hasPublicSupabase && hasServiceRole && hasOpenAi) return null;

  if (hasPublicSupabase && hasServiceRole && !hasOpenAi) {
    return (
      <div className="mb-6 flex gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Supabase is connected. Surface is using free local analysis for themes and scores.
        </p>
      </div>
    );
  }

  if (hasPublicSupabase && !hasServiceRole) {
    return (
      <div className="mb-6 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Supabase reads are connected. Add <span className="font-mono">SUPABASE_SERVICE_ROLE_KEY</span>{" "}
          in Vercel to persist analysis after new submissions.
        </p>
      </div>
    );
  }

  const message =
    context === "submit"
      ? "Supabase is not connected yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel before collecting real submissions."
      : "Showing demo insight data until Supabase environment variables are connected in Vercel.";

  return (
    <div className="mb-6 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}
