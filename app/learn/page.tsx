import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto p-12 text-center">
          <Construction className="h-24 w-24 mx-auto mb-6 text-primary" />
          <h1 className="text-3xl font-bold mb-4">Coming Soon</h1>
          <p className="text-muted-foreground">
            We're working hard to bring you AI-generated custom video lessons.
            Stay tuned for updates!
          </p>
        </Card>
      </main>
    </div>
  );
}