import { AlertCircle } from "lucide-react";

export function ConfigNotice({ context }: { context: "read" | "submit" }) {
  const hasSupabase = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  const hasOpenAi = Boolean(process.env.OPENAI_API_KEY);

  if (hasSupabase && hasOpenAi) return null;

  if (hasSupabase && !hasOpenAi) {
    return (
      <div className="mb-6 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Supabase is connected. Add an OpenAI API key when you are ready to generate themes and
          impact scores.
        </p>
      </div>
    );
  }

  const message =
    context === "submit"
      ? "Supabase is not connected yet. Add environment variables before collecting real submissions."
      : "Showing demo insight data until Supabase is connected.";

  return (
    <div className="mb-6 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}
