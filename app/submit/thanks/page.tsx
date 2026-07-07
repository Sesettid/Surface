import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ThanksPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-5 text-3xl font-semibold tracking-normal">Thank you for the signal.</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Your problem was submitted and analyzed. If you added an email, we may reach out for
            more context if the problem becomes a top opportunity.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/explore">Explore problems</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/submit">Submit another</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
