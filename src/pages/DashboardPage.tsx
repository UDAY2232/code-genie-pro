import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Zap, History, ArrowRight, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { label: "Prompts Today", value: "3", max: user?.plan === "free" ? "/5" : "∞", icon: Code2, color: "text-primary" },
    { label: "Total Generated", value: "47", icon: TrendingUp, color: "text-success" },
    { label: "Plan", value: user?.plan === "pro" ? "Pro" : "Free", icon: Zap, color: "text-warning" },
  ];

  const recentPrompts = [
    { prompt: "Create a REST API in Node.js with Express", language: "JavaScript", time: "2 hours ago" },
    { prompt: "Binary search implementation", language: "Python", time: "5 hours ago" },
    { prompt: "React custom hook for debounce", language: "JavaScript", time: "1 day ago" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-slide-up">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name} 👋</h1>
        <p className="mt-1 text-muted-foreground">Here's an overview of your coding activity.</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="mt-2 text-3xl font-bold">
              {stat.value}<span className="text-lg text-muted-foreground">{stat.max}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <Link to="/generate" className="group rounded-xl border border-primary/20 bg-primary/5 p-6 transition-all hover:bg-primary/10 hover:shadow-glow">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <Code2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Generate Code</h3>
              <p className="text-sm text-muted-foreground">Create new code with AI</p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 text-primary opacity-0 transition-all group-hover:opacity-100" />
          </div>
        </Link>
        <Link to="/history" className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <History className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">View History</h3>
              <p className="text-sm text-muted-foreground">Browse past generations</p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
          </div>
        </Link>
      </div>

      {/* Recent Prompts */}
      <div className="rounded-xl border border-border/50 bg-card">
        <div className="border-b border-border/50 p-4">
          <h2 className="font-semibold">Recent Prompts</h2>
        </div>
        <div className="divide-y divide-border/50">
          {recentPrompts.map((p, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">{p.prompt}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{p.time}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{p.language}</span>
            </div>
          ))}
        </div>
      </div>

      {user?.plan === "free" && (
        <div className="mt-8 rounded-xl border border-warning/30 bg-warning/5 p-6 text-center">
          <p className="font-medium">You've used 3 of 5 free prompts today</p>
          <p className="mt-1 text-sm text-muted-foreground">Upgrade to Pro for unlimited generations</p>
          <Link to="/pricing"><Button variant="hero" size="sm" className="mt-4">Upgrade to Pro</Button></Link>
        </div>
      )}
    </div>
  );
}
