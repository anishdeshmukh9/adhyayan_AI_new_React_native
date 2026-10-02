"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Mail, Lock, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from "lucide-react";

const EXAM_OPTIONS = ["JEE Advanced", "NEET-UG", "SAT / GRE", "UPSC", "University STEM"];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedExam, setSelectedExam] = useState("JEE Advanced");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Welcome to Adhyayan AI!");
    }, 1000);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#030712] px-4 py-12 selection:bg-violet-500/30">
      {/* Background Radial Glow Halos */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        {/* Top Brand Logo & Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="glow-violet mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 p-3 backdrop-blur-xl shadow-2xl">
            <Image
              src="/assets/logo.png"
              alt="Adhyayan AI Logo"
              width={48}
              height={48}
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="mb-2 flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-violet-400">
            <Cpu className="h-3.5 w-3.5" />
            INTELLIGENT LEARNING PLATFORM
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Welcome to <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Adhyayan AI</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to access your Socratic AI Tutor & Doubt Resolver.
          </p>
        </div>

        {/* Auth Glass Card */}
        <div className="glass-panel w-full rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Target Exam Selector */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                Target Academic Goal
              </label>
              <div className="flex flex-wrap gap-2">
                {EXAM_OPTIONS.map((exam) => {
                  const isSelected = selectedExam === exam;
                  return (
                    <button
                      type="button"
                      key={exam}
                      onClick={() => setSelectedExam(exam)}
                      className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
                        isSelected
                          ? "border-violet-500 bg-violet-500/20 text-white shadow-sm shadow-violet-500/30"
                          : "border-white/5 bg-white/[0.03] text-slate-400 hover:border-white/15 hover:text-slate-200"
                      }`}
                    >
                      {exam}
                      {isSelected && <CheckCircle2 className="h-3 w-3 text-violet-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="scholar@adhyayan.ai"
                  className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 pl-10 pr-4 text-sm text-white placeholder-slate-600 transition-all focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-violet-400 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative flex items-center">
                <Lock className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="h-11 w-full rounded-xl border border-white/10 bg-slate-950/60 pl-10 pr-4 text-sm text-white placeholder-slate-600 transition-all focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="glow-violet mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-white transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isSubmitting ? "Authenticating..." : "Sign In to Workspace"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Social Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-wider text-slate-500">or</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          {/* 1-Tap Google Button */}
          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium text-slate-200 transition-all hover:bg-white/[0.08]"
          >
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Secured with Supabase Row-Level Security</span>
        </div>
      </div>
    </div>
  );
}
