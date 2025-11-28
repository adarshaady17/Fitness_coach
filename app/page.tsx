"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import MotivationQuote from "@/components/common/MotivationQuote";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 text-center">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        {/* Floating Shapes Animation */}
        {mounted && (
          <>
            <motion.div
              className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl"
              animate={{
                x: [0, -100, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}

        {/* Hero Content - Always visible, animate only when mounted */}
        <div className="relative z-10 max-w-4xl">
          {mounted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white md:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                💪 AI Fitness Coach
              </motion.h1>
              <motion.p
                className="mb-8 text-xl text-gray-600 dark:text-gray-300 md:text-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Your personalized workout and diet plans powered by AI
              </motion.p>
              <motion.p
                className="mb-10 text-lg text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Get custom exercise routines, meal plans, and expert tips tailored to your goals, preferences, and lifestyle.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Link href="/plans/create">
                  <Button size="lg" className="text-lg px-8 py-6">
                    Start Your Plan →
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <div>
              <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white md:text-7xl">
                💪 AI Fitness Coach
              </h1>
              <p className="mb-8 text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
                Your personalized workout and diet plans powered by AI
              </p>
              <p className="mb-10 text-lg text-gray-500 dark:text-gray-400">
                Get custom exercise routines, meal plans, and expert tips tailored to your goals, preferences, and lifestyle.
              </p>
              <Link href="/plans/create">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Your Plan →
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Why Choose AI Fitness Coach?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "🧠",
                title: "AI-Powered Plans",
                description: "Personalized workout and diet plans generated by advanced AI based on your unique profile.",
              },
              {
                icon: "🔊",
                title: "Voice Features",
                description: "Listen to your plans with natural voice narration powered by ElevenLabs TTS.",
              },
              {
                icon: "🖼️",
                title: "Visual Guides",
                description: "See realistic images of exercises and meals generated by AI image models.",
              },
              {
                icon: "📄",
                title: "Export & Save",
                description: "Export your plans as PDF, save them locally, and access them anytime.",
              },
              {
                icon: "🌗",
                title: "Dark Mode",
                description: "Beautiful dark and light themes for comfortable viewing at any time.",
              },
              {
                icon: "💬",
                title: "Daily Motivation",
                description: "Get daily AI-generated motivational quotes to keep you inspired.",
              },
            ].map((feature, index) =>
              mounted ? (
                <motion.div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ) : (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800"
                >
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Daily Motivation Quote */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-4xl">
          <MotivationQuote />
        </div>
      </section>
    </div>
  );
}

