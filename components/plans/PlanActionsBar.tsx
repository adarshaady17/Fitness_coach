"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { GeneratedPlan } from "@/lib/types/plan";
import { generatePlanPDF } from "@/lib/pdf/planToPdf";
import { savePlan } from "@/lib/storage/planStorage";
import Toast from "@/components/common/Toast";

interface PlanActionsBarProps {
  plan: GeneratedPlan;
  onRegenerate?: () => void;
  onListen?: () => void;
}

export default function PlanActionsBar({
  plan,
  onRegenerate,
  onListen,
}: PlanActionsBarProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const pdfBlob = await generatePlanPDF(plan);
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `fitness-plan-${plan.userProfile.name}-${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export PDF:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus({ show: false, type: "success", message: "" });
    
    try {
      await savePlan(plan);
      setSaveStatus({
        show: true,
        type: "success",
        message: "Plan saved successfully! You can view it in History.",
      });
    } catch (error) {
      console.error("Failed to save plan:", error);
      setSaveStatus({
        show: true,
        type: "error",
        message: "Failed to save plan. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Toast
        message={saveStatus.message}
        type={saveStatus.type}
        isVisible={saveStatus.show}
        onClose={() => setSaveStatus({ show: false, type: "success", message: "" })}
      />
      <div className="sticky bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur-sm p-4 dark:border-gray-800 dark:bg-gray-900/95">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3">
          <Button variant="primary" onClick={onListen}>
            🔊 Listen to Plan
          </Button>
          <Button
            variant="outline"
            onClick={handleExportPDF}
            disabled={isExporting}
            isLoading={isExporting}
          >
            📄 Export PDF
          </Button>
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={isSaving}
            isLoading={isSaving}
          >
            {isSaving ? "Saving..." : "💾 Save Plan"}
          </Button>
          <Button variant="secondary" onClick={onRegenerate}>
            🔄 Regenerate
          </Button>
        </div>
      </div>
    </>
  );
}

