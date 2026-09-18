"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-[2rem] bg-white p-8 sm:p-10 card-shadow">
        <div className="w-12 h-12 rounded-2xl bg-navy-900 flex items-center justify-center">
          <Lock className="w-5 h-5 text-gold-400" />
        </div>
        <h1 className="mt-6 font-display text-2xl text-navy-900">Admin Login</h1>
        <p className="mt-2 text-navy-700/70 text-sm">
          Enter the admin password to view RSVP submissions.
        </p>

        <form action={formAction} className="mt-8 space-y-4">
          <div>
            <label className="text-sm text-navy-800 font-medium">Password</label>
            <input
              required
              autoFocus
              name="password"
              type="password"
              className="mt-2 w-full rounded-xl border border-navy-900/10 bg-ocean-50 px-4 py-3 text-navy-900 focus:outline-none focus:ring-2 focus:ring-ocean-400 transition-shadow"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-navy-900 hover:bg-navy-800 disabled:opacity-60 text-white font-semibold px-8 py-3.5 text-sm tracking-wide transition-all duration-300"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
