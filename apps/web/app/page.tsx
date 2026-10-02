"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, Lock, CheckCircle2, ArrowRight } from "lucide-react";

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
    }, 800);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#09090b] px-4 py-12 text-[#fafafa] selection:bg-orange-500/20">
      <div className="flex w-full max-w-md flex-col items-center">
        {/* Logo & Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#27272a] bg-[#18181b] p-2.5 shadow-sm">
            <Image
              src="/assets/logo.png"
              alt="Adhyayan AI"
              width={40}
              height={40}
              className="h-auto w-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#fafafa]">
            Sign in to Adhyayan AI
          </h1>
          <p className="mt-1.5 text-sm text-[#a1a1aa]">
            Your intelligent AI tutor & doubt resolution workspace.
          </p>
        </div>

        {/* Auth Card */}
        <div className="w-full rounded-2xl border border-[#27272a] bg-[#18181b] p-7 shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Target Academic Goal */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
                Target Exam / Goal
              </label>
              <div className="flex flex-wrap gap-2">
                {EXAM_OPTIONS.map((exam) => {
                  const isSelected = selectedExam === exam;
                  return (
                    <button
                      type="button"
                      key={exam}
                      onClick={() => setSelectedExam(exam)}
                      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                        isSelected
                          ? "border-orange-500 bg-orange-500/10 text-orange-400 font-semibold"
                          : "border-[#27272a] bg-[#09090b] text-[#a1a1aa] hover:border-[#3f3f46] hover:text-[#fafafa]"
                      }`}
                    >
                      {exam}
                      {isSelected && <CheckCircle2 className="h-3 w-3 text-orange-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#71717a]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@adhyayan.ai"
                  className="h-10 w-full rounded-lg border border-[#27272a] bg-[#09090b] pl-10 pr-3.5 text-sm text-[#fafafa] placeholder-[#71717a] transition-colors focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-orange-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative flex items-center">
                <Lock className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#71717a]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="h-10 w-full rounded-lg border border-[#27272a] bg-[#09090b] pl-10 pr-3.5 text-sm text-[#fafafa] placeholder-[#71717a] transition-colors focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 text-sm font-semibold text-white transition-colors hover:bg-orange-600 active:scale-[0.99] disabled:opacity-50"
            >
              <span>{isSubmitting ? "Signing In..." : "Continue to Workspace"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-[#27272a]" />
            <span className="text-xs uppercase tracking-wider text-[#71717a]">or</span>
            <div className="h-[1px] flex-1 bg-[#27272a]" />
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#27272a] bg-[#09090b] text-sm font-medium text-[#fafafa] transition-colors hover:bg-[#27272a]"
          >
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#71717a]">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
