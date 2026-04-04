import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, ShieldCheck, Users, Code2 } from "lucide-react";
import { toast } from "sonner";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  plan: "free" | "pro";
  createdAt: string;
}

interface MockPrompt {
  id: string;
  userEmail: string;
  prompt: string;
  language: string;
  createdAt: string;
}

const initialUsers: MockUser[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "user", plan: "pro", createdAt: "Jan 15, 2025" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "user", plan: "free", createdAt: "Feb 3, 2025" },
  { id: "3", name: "Admin User", email: "admin@codegenie.ai", role: "admin", plan: "pro", createdAt: "Dec 1, 2024" },
];

const initialPrompts: MockPrompt[] = [
  { id: "1", userEmail: "alice@example.com", prompt: "Create a REST API", language: "JavaScript", createdAt: "2 hours ago" },
  { id: "2", userEmail: "bob@example.com", prompt: "Binary search", language: "Python", createdAt: "5 hours ago" },
  { id: "3", userEmail: "alice@example.com", prompt: "React hook for auth", language: "TypeScript", createdAt: "1 day ago" },
];

export default function AdminPage() {
  const [users, setUsers] = useState<MockUser[]>(initialUsers);
  const [prompts, setPrompts] = useState<MockPrompt[]>(initialPrompts);

  const deleteUser = (id: string) => {
    setUsers((p) => p.filter((u) => u.id !== id));
    toast.success("User deleted");
  };

  const promoteUser = (id: string) => {
    setUsers((p) => p.map((u) => (u.id === id ? { ...u, role: "admin" as const } : u)));
    toast.success("User promoted to admin");
  };

  const deletePrompt = (id: string) => {
    setPrompts((p) => p.filter((pr) => pr.id !== id));
    toast.success("Prompt deleted");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-slide-up">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <ShieldCheck className="h-8 w-8 text-primary" /> Admin Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">Manage users and system content.</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Users</span>
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-2 text-3xl font-bold">{users.length}</div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Prompts</span>
            <Code2 className="h-5 w-5 text-success" />
          </div>
          <div className="mt-2 text-3xl font-bold">{prompts.length}</div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Pro Users</span>
            <ShieldCheck className="h-5 w-5 text-warning" />
          </div>
          <div className="mt-2 text-3xl font-bold">{users.filter((u) => u.plan === "pro").length}</div>
        </div>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="prompts">Prompts</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Plan</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Joined</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{u.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${u.role === "admin" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${u.plan === "pro" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                          {u.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{u.createdAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          {u.role !== "admin" && (
                            <Button variant="ghost" size="sm" onClick={() => promoteUser(u.id)}>Promote</Button>
                          )}
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteUser(u.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="prompts" className="mt-4">
          <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">User</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Prompt</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Language</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Created</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {prompts.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 text-muted-foreground">{p.userEmail}</td>
                      <td className="px-4 py-3 font-medium">{p.prompt}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{p.language}</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{p.createdAt}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deletePrompt(p.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
