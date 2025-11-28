import { UserProfile } from "@/lib/types/user";

export function buildPlanPrompt(userProfile: UserProfile): string {
  const {
    name,
    age,
    gender,
    height,
    weight,
    fitnessGoal,
    fitnessLevel,
    workoutLocation,
    dietType,
    allergies,
    medicalHistory,
    injuries,
    stressLevel,
    sleepHours,
    activityLevel,
    notes,
  } = userProfile;

  // Calculate BMI for context
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  return `You are an expert fitness coach and nutritionist. Generate a comprehensive, personalized fitness plan for the following user:

**USER PROFILE:**
- Name: ${name}
- Age: ${age}
- Gender: ${gender}
- Height: ${height} cm
- Weight: ${weight} kg
- BMI: ${bmi.toFixed(1)}
- Fitness Goal: ${fitnessGoal}
- Current Fitness Level: ${fitnessLevel}
- Workout Location Preference: ${workoutLocation}
- Diet Type: ${dietType}
${allergies ? `- Allergies/Restrictions: ${allergies}` : ""}
${medicalHistory ? `- Medical History: ${medicalHistory}` : ""}
${injuries ? `- Injuries/Limitations: ${injuries}` : ""}
${stressLevel ? `- Stress Level: ${stressLevel}` : ""}
${sleepHours ? `- Sleep Hours: ${sleepHours} hours/night` : ""}
${activityLevel ? `- Activity Level: ${activityLevel}` : ""}
${notes ? `- Additional Notes: ${notes}` : ""}

**REQUIREMENTS:**
Generate a 7-day personalized plan with the following structure. Return ONLY valid JSON, no markdown, no code blocks, no explanations.

**OUTPUT FORMAT (JSON):**
{
  "workoutPlan": [
    {
      "day": 1,
      "dayName": "Monday",
      "focus": "Upper Body Strength",
      "duration": "45 minutes",
      "exercises": [
        {
          "name": "Exercise Name",
          "sets": 3,
          "reps": "10-12",
          "rest": "60 seconds",
          "notes": "Optional form tips"
        }
      ]
    }
  ],
  "dietPlan": [
    {
      "day": 1,
      "meals": [
        {
          "mealType": "breakfast",
          "time": "8:00 AM",
          "items": [
            {
              "name": "Food Item",
              "quantity": "2 eggs",
              "calories": 140,
              "macros": {
                "protein": 12,
                "carbs": 1,
                "fats": 10
              }
            }
          ],
          "totalCalories": 350
        }
      ],
      "totalCalories": 2000,
      "macros": {
        "protein": 150,
        "carbs": 200,
        "fats": 65
      }
    }
  ],
  "tips": {
    "lifestyleTips": [
      "Tip 1",
      "Tip 2"
    ],
    "postureTips": [
      "Posture tip 1",
      "Posture tip 2"
    ],
    "motivationLines": [
      "Motivational quote 1",
      "Motivational quote 2"
    ]
  }
}

**GUIDELINES:**
1. Create a 7-day workout plan appropriate for ${fitnessLevel} level, targeting ${fitnessGoal}
2. Exercises should be suitable for ${workoutLocation} setting
3. Diet plan must follow ${dietType} diet type${allergies ? ` and avoid ${allergies}` : ""}
4. Consider age (${age}), current weight (${weight}kg), and goal (${fitnessGoal})
5. Include proper warm-up and cool-down recommendations in workout notes
6. Provide realistic calorie targets based on goals
7. Make tips practical and actionable
8. Ensure exercises are safe given: ${injuries || "no injuries"}
9. Adjust intensity based on fitness level: ${fitnessLevel}

Generate the complete plan now:`;
}

