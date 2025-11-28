"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getPlanHistory, deletePlanFromHistory, PlanHistoryItem } from "@/lib/storage/planStorage";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function PlanHistoryPage() {
  const [history, setHistory] = useState<PlanHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadHistory = async () => {
      setIsLoading(true);
      const plans = await getPlanHistory();
      setHistory(plans);
      setIsLoading(false);
    };
    loadHistory();
  }, []);

  const handleLoadPlan = (plan: PlanHistoryItem) => {
    // Save as current plan and redirect
    if (typeof window !== "undefined") {
      localStorage.setItem("currentPlan", JSON.stringify(plan.plan));
      router.push("/plans/view");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      await deletePlanFromHistory(id);
      const updatedHistory = await getPlanHistory();
      setHistory(updatedHistory);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading plans...</p>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Plan History
          </h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            No saved plans yet. Create your first plan to get started!
          </p>
          <Link href="/plans/create">
            <Button size="lg">Create Your First Plan</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
              Plan History
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage your saved fitness plans
            </p>
          </div>
          <Link href="/plans/create">
            <Button>Create New Plan</Button>
          </Link>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {item.plan.userProfile.name}&apos;s Plan
                </h3>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  <strong>Goal:</strong> {item.plan.userProfile.fitnessGoal}
                </p>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  <strong>Level:</strong> {item.plan.userProfile.fitnessLevel}
                </p>
                <p className="mb-4 text-xs text-gray-500 dark:text-gray-500">
                  Saved: {new Date(item.savedAt).toLocaleDateString()}
                </p>
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    <strong>{item.plan.workoutPlan.length}</strong> workout days
                  </p>
                  <p>
                    <strong>{item.plan.dietPlan.length}</strong> diet days
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleLoadPlan(item)}
                  className="flex-1"
                >
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  Delete
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

