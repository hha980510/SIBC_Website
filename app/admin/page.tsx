import { Users, UserCheck, CalendarClock, LogOut, AlertTriangle } from "lucide-react";
import { isAdminConfigured, isAuthed } from "@/lib/admin-auth";
import { getRedis, RSVP_LIST_KEY, type RsvpRecord } from "@/lib/redis";
import { logoutAction } from "./actions";
import LoginForm from "./LoginForm";
import ExportCsvButton from "./ExportCsvButton";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

async function getRecords(): Promise<{ records: RsvpRecord[]; error?: string }> {
  try {
    const redis = getRedis();
    const raw = await redis.lrange<string>(RSVP_LIST_KEY, 0, -1);
    const records = raw
      .map((entry) => {
        try {
          // The Upstash SDK sometimes auto-parses JSON strings already.
          return typeof entry === "string" ? (JSON.parse(entry) as RsvpRecord) : (entry as unknown as RsvpRecord);
        } catch {
          return null;
        }
      })
      .filter((r): r is RsvpRecord => r !== null);
    return { records };
  } catch (err) {
    return {
      records: [],
      error: err instanceof Error ? err.message : "Failed to load RSVPs.",
    };
  }
}

export default async function AdminPage() {
  if (!isAdminConfigured()) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-[2rem] bg-white p-10 card-shadow text-center">
          <AlertTriangle className="w-10 h-10 text-gold-500 mx-auto" />
          <h1 className="mt-5 font-display text-xl text-navy-900">
            Admin password not set
          </h1>
          <p className="mt-3 text-navy-700/70 text-sm leading-relaxed">
            Add an <code className="px-1.5 py-0.5 rounded bg-ocean-50 text-navy-900">ADMIN_PASSWORD</code>{" "}
            environment variable in your Vercel project settings (and
            .env.local for local dev), then reload this page.
          </p>
        </div>
      </div>
    );
  }

  const authed = await isAuthed();
  if (!authed) {
    return <LoginForm />;
  }

  const { records, error } = await getRecords();
  const totalGuests = records.reduce((sum, r) => sum + (r.guests || 1), 0);

  return (
    <div className="min-h-screen bg-ocean-50">
      <header className="bg-navy-950 text-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-6 flex items-center justify-between">
          <div>
            <p className="font-accent eyebrow uppercase text-gold-400 text-xs">
              {siteConfig.churchName}
            </p>
            <h1 className="mt-1 font-display text-2xl">RSVP Admin</h1>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white/90 hover:bg-white/10 px-4 py-2 text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-10">
        {error && (
          <div className="mb-8 rounded-2xl bg-red-50 border border-red-200 text-red-700 px-6 py-4 text-sm">
            Couldn&rsquo;t load RSVPs: {error}
          </div>
        )}

        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <div className="rounded-3xl bg-white p-6 card-shadow ring-1 ring-navy-900/5">
            <div className="w-10 h-10 rounded-xl bg-ocean-50 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-ocean-600" />
            </div>
            <p className="mt-4 text-3xl font-display text-navy-900">{records.length}</p>
            <p className="mt-1 text-sm text-navy-700/60">RSVP submissions</p>
          </div>
          <div className="rounded-3xl bg-white p-6 card-shadow ring-1 ring-navy-900/5">
            <div className="w-10 h-10 rounded-xl bg-ocean-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-ocean-600" />
            </div>
            <p className="mt-4 text-3xl font-display text-navy-900">{totalGuests}</p>
            <p className="mt-1 text-sm text-navy-700/60">Total guests</p>
          </div>
          <div className="rounded-3xl bg-white p-6 card-shadow ring-1 ring-navy-900/5">
            <div className="w-10 h-10 rounded-xl bg-ocean-50 flex items-center justify-center">
              <CalendarClock className="w-5 h-5 text-ocean-600" />
            </div>
            <p className="mt-4 text-sm font-medium text-navy-900">
              {records[0] ? new Date(records[0].createdAt).toLocaleString() : "—"}
            </p>
            <p className="mt-1 text-sm text-navy-700/60">Latest submission</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-navy-900">Submissions</h2>
          {records.length > 0 && <ExportCsvButton records={records} />}
        </div>

        <div className="rounded-3xl bg-white card-shadow ring-1 ring-navy-900/5 overflow-hidden">
          {records.length === 0 ? (
            <div className="py-16 text-center text-navy-700/60">
              No RSVPs yet. They&rsquo;ll show up here as people sign up.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-navy-700/50 text-xs uppercase tracking-wider border-b border-navy-900/5">
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Phone</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Guests</th>
                    <th className="px-6 py-4 font-medium">Message</th>
                    <th className="px-6 py-4 font-medium whitespace-nowrap">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r.id} className="border-b border-navy-900/5 last:border-none hover:bg-ocean-50/50">
                      <td className="px-6 py-4 font-medium text-navy-900 whitespace-nowrap">{r.name}</td>
                      <td className="px-6 py-4 text-navy-700/80 whitespace-nowrap">{r.phone}</td>
                      <td className="px-6 py-4 text-navy-700/80">{r.email || "—"}</td>
                      <td className="px-6 py-4 text-navy-700/80">{r.guests}</td>
                      <td className="px-6 py-4 text-navy-700/70 max-w-xs truncate" title={r.message}>
                        {r.message || "—"}
                      </td>
                      <td className="px-6 py-4 text-navy-700/60 whitespace-nowrap">
                        {new Date(r.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
