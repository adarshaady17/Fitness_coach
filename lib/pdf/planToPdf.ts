import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { GeneratedPlan } from "@/lib/types/plan";

// Helper function to remove emojis and special characters for PDF compatibility
function sanitizeTextForPDF(text: string): string {
  return text
    .replace(/💪/g, "")
    .replace(/🏋️/g, "")
    .replace(/🥗/g, "")
    .replace(/💡/g, "")
    .replace(/📊/g, "")
    .replace(/🔊/g, "")
    .replace(/🖼️/g, "")
    .replace(/📄/g, "")
    .replace(/🌗/g, "")
    .replace(/💬/g, "")
    .replace(/🧠/g, "")
    .replace(/🌅/g, "")
    .replace(/☀️/g, "")
    .replace(/🌙/g, "")
    .replace(/🍎/g, "")
    .replace(/🍽️/g, "")
    .replace(/[^\x00-\x7F]/g, "") // Remove any remaining non-ASCII characters
    .trim();
}

export async function generatePlanPDF(plan: GeneratedPlan): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]); // A4 size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let yPosition = 800;
  const margin = 50;
  const lineHeight = 20;
  const sectionSpacing = 30;
  const pageHeight = 842;
  const pageWidth = 595;
  const bottomMargin = 50;

  // Helper function to check if we need a new page
  const checkNewPage = (requiredSpace: number = 50) => {
    if (yPosition < bottomMargin + requiredSpace) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      yPosition = pageHeight - margin;
      return true;
    }
    return false;
  };

  // Helper function to add text with word wrap and line breaks
  const addText = (
    text: string,
    x: number,
    y: number,
    size: number,
    isBold: boolean = false,
    color: [number, number, number] = [0, 0, 0],
    maxWidth?: number
  ): number => {
    const fontToUse = isBold ? boldFont : font;
    const sanitizedText = sanitizeTextForPDF(text);
    if (!sanitizedText) return y; // Skip empty text after emoji removal
    
    const textMaxWidth = maxWidth || (pageWidth - 2 * margin - (x - margin));
    
    try {
      const lines = sanitizedText.split('\n');
      let currentY = y;
      
      for (const line of lines) {
        if (line.trim()) {
          checkNewPage(size + 5);
          page.drawText(line.trim(), {
            x,
            y: currentY,
            size,
            font: fontToUse,
            color: rgb(color[0], color[1], color[2]),
            maxWidth: textMaxWidth,
          });
          currentY -= size + 2;
        } else {
          currentY -= size * 0.5; // Small spacing for empty lines
        }
      }
      
      return currentY;
    } catch (error) {
      // If there's still an encoding issue, try with only ASCII
      const asciiText = sanitizedText.replace(/[^\x00-\x7F]/g, "");
      if (asciiText) {
        checkNewPage(size + 5);
        page.drawText(asciiText, {
          x,
          y,
          size,
          font: fontToUse,
          color: rgb(color[0], color[1], color[2]),
          maxWidth: textMaxWidth,
        });
        return y - size - 2;
      }
      return y;
    }
  };

  // Header Section
  yPosition = addText("AI FITNESS COACH", margin, yPosition, 28, true, [0.2, 0.4, 0.8]);
  yPosition -= 10;
  
  // Draw a line under the title
  page.drawLine({
    start: { x: margin, y: yPosition },
    end: { x: pageWidth - margin, y: yPosition },
    thickness: 2,
    color: rgb(0.2, 0.4, 0.8),
  });
  yPosition -= 20;

  yPosition = addText(
    `Personalized Plan for ${sanitizeTextForPDF(plan.userProfile.name)}`,
    margin,
    yPosition,
    16,
    true
  );
  yPosition -= 15;

  const goalText = sanitizeTextForPDF(plan.userProfile.fitnessGoal.replace(/-/g, ' '));
  const levelText = sanitizeTextForPDF(plan.userProfile.fitnessLevel);
  yPosition = addText(
    `Fitness Goal: ${goalText.charAt(0).toUpperCase() + goalText.slice(1)}`,
    margin,
    yPosition,
    12
  );
  yPosition -= 12;
  
  yPosition = addText(
    `Fitness Level: ${levelText.charAt(0).toUpperCase() + levelText.slice(1)}`,
    margin,
    yPosition,
    12
  );
  yPosition -= 12;

  yPosition = addText(
    `Generated on: ${new Date(plan.generatedAt).toLocaleDateString()}`,
    margin,
    yPosition,
    10,
    false,
    [0.5, 0.5, 0.5]
  );
  yPosition -= sectionSpacing;

  // Workout Plan Section
  checkNewPage(60);
  yPosition = addText("WORKOUT PLAN", margin, yPosition, 18, true, [0.8, 0.2, 0.2]);
  yPosition -= 5;
  
  // Draw a line under section header
  page.drawLine({
    start: { x: margin, y: yPosition },
    end: { x: pageWidth - margin, y: yPosition },
    thickness: 1,
    color: rgb(0.8, 0.2, 0.2),
  });
  yPosition -= 20;

  for (const day of plan.workoutPlan) {
    checkNewPage(80);

    // Day header with background
    const dayText = `${sanitizeTextForPDF(day.dayName)} - ${sanitizeTextForPDF(day.focus)}`;
    yPosition = addText(dayText, margin, yPosition, 14, true, [0.2, 0.2, 0.2]);
    yPosition -= 8;

    if (day.duration) {
      yPosition = addText(`Duration: ${sanitizeTextForPDF(day.duration)}`, margin + 10, yPosition, 10, false, [0.5, 0.5, 0.5]);
      yPosition -= 12;
    }

    // Exercises
    for (const exercise of day.exercises) {
      checkNewPage(40);

      const exerciseName = sanitizeTextForPDF(exercise.name);
      yPosition = addText(`${exerciseName}`, margin + 15, yPosition, 11, true);
      yPosition -= 10;

      const detailsText = `Sets: ${exercise.sets}  |  Reps: ${exercise.reps}  |  Rest: ${sanitizeTextForPDF(exercise.rest)}`;
      yPosition = addText(detailsText, margin + 25, yPosition, 9);
      yPosition -= 10;

      if (exercise.notes) {
        const noteText = sanitizeTextForPDF(exercise.notes);
        if (noteText) {
          yPosition = addText(`Tip: ${noteText}`, margin + 25, yPosition, 8, false, [0.4, 0.4, 0.4]);
          yPosition -= 10;
        }
      }
      yPosition -= 5; // Space between exercises
    }

    yPosition -= 15; // Space between days
  }

  yPosition -= sectionSpacing;

  // Diet Plan Section
  checkNewPage(60);
  yPosition -= 20;
  yPosition = addText("DIET PLAN", margin, yPosition, 18, true, [0.2, 0.6, 0.2]);
  yPosition -= 5;
  
  // Draw a line under section header
  page.drawLine({
    start: { x: margin, y: yPosition },
    end: { x: pageWidth - margin, y: yPosition },
    thickness: 1,
    color: rgb(0.2, 0.6, 0.2),
  });
  yPosition -= 20;

  for (const day of plan.dietPlan) {
    checkNewPage(100);

    // Day header
    yPosition = addText(`Day ${day.day}`, margin, yPosition, 14, true, [0.2, 0.2, 0.2]);
    yPosition -= 8;

    if (day.totalCalories) {
      yPosition = addText(
        `Total Calories: ${day.totalCalories} kcal`,
        margin + 10,
        yPosition,
        11,
        false,
        [0.3, 0.5, 0.3]
      );
      yPosition -= 12;
    }

    // Meals
    for (const meal of day.meals) {
      checkNewPage(50);

      const mealType = meal.mealType.toUpperCase();
      const mealHeader = `${mealType} - ${sanitizeTextForPDF(meal.time)}`;
      yPosition = addText(mealHeader, margin + 15, yPosition, 11, true, [0.2, 0.5, 0.2]);
      yPosition -= 8;

      if (meal.totalCalories) {
        yPosition = addText(
          `Calories: ${meal.totalCalories} kcal`,
          margin + 25,
          yPosition,
          9,
          false,
          [0.4, 0.4, 0.4]
        );
        yPosition -= 10;
      }

      for (const item of meal.items) {
        checkNewPage(15);
        const itemName = sanitizeTextForPDF(item.name);
        const itemQuantity = sanitizeTextForPDF(item.quantity);
        yPosition = addText(
          `• ${itemName}: ${itemQuantity}`,
          margin + 25,
          yPosition,
          9
        );
        yPosition -= 10;
        
        if (item.calories) {
          yPosition = addText(
            `  (${item.calories} kcal)`,
            margin + 35,
            yPosition,
            8,
            false,
            [0.5, 0.5, 0.5]
          );
          yPosition -= 8;
        }
      }

      yPosition -= 8; // Space between meals
    }

    yPosition -= 15; // Space between days
  }

  yPosition -= sectionSpacing;

  // Tips Section
  checkNewPage(100);
  yPosition -= 20;
  yPosition = addText("TIPS & MOTIVATION", margin, yPosition, 18, true, [0.6, 0.4, 0.8]);
  yPosition -= 5;
  
  // Draw a line under section header
  page.drawLine({
    start: { x: margin, y: yPosition },
    end: { x: pageWidth - margin, y: yPosition },
    thickness: 1,
    color: rgb(0.6, 0.4, 0.8),
  });
  yPosition -= 20;

  // Lifestyle Tips
  yPosition = addText("Lifestyle Tips", margin, yPosition, 13, true, [0.3, 0.3, 0.3]);
  yPosition -= 12;

  for (const tip of plan.tips.lifestyleTips) {
    checkNewPage(20);
    const tipText = sanitizeTextForPDF(tip);
    yPosition = addText(`• ${tipText}`, margin + 15, yPosition, 10);
    yPosition -= 12;
  }

  yPosition -= 15;

  // Posture Tips
  yPosition = addText("Posture & Form Tips", margin, yPosition, 13, true, [0.3, 0.3, 0.3]);
  yPosition -= 12;

  for (const tip of plan.tips.postureTips) {
    checkNewPage(20);
    const tipText = sanitizeTextForPDF(tip);
    yPosition = addText(`• ${tipText}`, margin + 15, yPosition, 10);
    yPosition -= 12;
  }

  yPosition -= 15;

  // Daily Motivation
  yPosition = addText("Daily Motivation", margin, yPosition, 13, true, [0.3, 0.3, 0.3]);
  yPosition -= 12;

  for (const line of plan.tips.motivationLines) {
    checkNewPage(20);
    const lineText = sanitizeTextForPDF(line);
    yPosition = addText(`"${lineText}"`, margin + 15, yPosition, 10, false, [0.4, 0.4, 0.4]);
    yPosition -= 12;
  }

  // Footer on all pages
  const totalPages = pdfDoc.getPageCount();
  for (let i = 0; i < totalPages; i++) {
    const currentPage = pdfDoc.getPages()[i];
    const pageNumber = i + 1;
    
    // Footer text
    currentPage.drawText(
      "Generated by AI Fitness Coach",
      {
        x: margin,
        y: 30,
        size: 8,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
      }
    );
    
    // Page number
    currentPage.drawText(
      `Page ${pageNumber} of ${totalPages}`,
      {
        x: pageWidth - margin - 50,
        y: 30,
        size: 8,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
      }
    );
  }

  const pdfBytes = await pdfDoc.save();
  // Create a new Uint8Array to ensure proper type compatibility
  const bytes = new Uint8Array(pdfBytes);
  return new Blob([bytes], { type: "application/pdf" });
}

