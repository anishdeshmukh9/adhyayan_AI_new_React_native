"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, Lock, Mail, CheckCircle2 } from "lucide-react";

const EXAMS = [
  "JEE Advanced",
  "NEET-UG",
  "SAT / GRE",
  "UPSC",
  "University STEM"
];

export default function WebLoginPage() {
  const [selectedExam, setSelectedExam] = useState("JEE Advanced");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="w-full max-w-[440px] flex flex-col items-center">
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[var(--card)] border border-[var(--card-border)] flex items-center justify-center mb-4 shadow-sm">
            <Image
              src="/assets/logo.png"
              alt="Adhyayan AI"
              width={44}
              height={44}
              className="rounded-lg"
              priority
            />
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-light)] border border-[var(--accent-border)] text-[var(--accent)] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Socratic AI Learning Platform</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Sign in to Adhyayan AI
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1.5 max-w-[320px]">
            Your intelligent AI tutor & doubt resolution workspace.
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full pro-card rounded-2xl p-6 sm:p-8 bg-[var(--card)]">
          {/* Target Goal Selector */}
          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2.5">
              Target Academic Goal
            </label>
            <div className="flex flex-wrap gap-2">
              {EXAMS.map((exam) => {
                const isSelected = selectedExam === exam;
                return (
                  <button
                    key={exam}
                    type="button"
                    onClick={() => setSelectedExam(exam)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      isSelected
                        ? "bg-[var(--primary-light)] text-[var(--primary)] border-[var(--primary-border)] font-semibold"
                        : "bg-[var(--secondary)] text-[var(--secondary-foreground)] border-[var(--card-border)] hover:bg-[var(--muted)]"
                    }`}
                  >
                    <span>{exam}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-[var(--muted-foreground)]" />
                <input
                  type="email"
                  placeholder="student@adhyayan.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-9 pr-3 rounded-lg bg-[var(--input-bg)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Password
                </label>
                <a
                  href="#forgot"
                  className="text-xs text-[var(--primary)] hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-[var(--muted-foreground)]" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-9 pr-3 rounded-lg bg-[var(--input-bg)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors mt-2"
            >
              <span>Continue to Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[var(--card)] px-3 text-[var(--muted-foreground)] font-medium">
                Or
              </span>
            </div>
          </div>

          {/* Social Auth */}
          <button
            type="button"
            className="w-full h-11 rounded-lg bg-[var(--card)] border border-[var(--border)] text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-[var(--muted-foreground)] text-center mt-6 max-w-[320px]">
          By continuing, you agree to our Terms of Service & Privacy Policy.
        </p>
      </div>
    </main>
  );
}
