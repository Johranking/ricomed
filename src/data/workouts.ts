export type Exercise = {
  exercise: string;
  sets: (number | string)[];
};

export type WorkoutDay = {
  id: string;
  dayNumber: number;
  weekday: string;
  title: string;
  subtitle: string;
  isRest?: boolean;
  exercises: Exercise[];
  videoQuery: string;
};

export const WORKOUT_PLAN: WorkoutDay[] = [
  {
    id: "chest-triceps",
    dayNumber: 1,
    weekday: "Monday",
    title: "Chest + Triceps",
    subtitle: "Push power & lockout strength",
    videoQuery: "chest triceps workout hypertrophy",
    exercises: [
      { exercise: "Flat Bench Press", sets: [8, 10, 8, 6] },
      { exercise: "Incline Dumbbell Press", sets: [10, 10, 8, 8] },
      { exercise: "Cable Fly / Pec Deck", sets: [15, 12, 12, 10] },
      { exercise: "Tricep Pushdown", sets: [12, 10, 10, 8] },
      { exercise: "Overhead Dumbbell Extension", sets: [12, 10, 8] },
      { exercise: "Dips", sets: ["3 sets — to failure / assisted"] },
    ],
  },
  {
    id: "back-biceps",
    dayNumber: 2,
    weekday: "Tuesday",
    title: "Back + Biceps",
    subtitle: "Pull volume & vertical width",
    videoQuery: "back biceps workout pull day",
    exercises: [
      { exercise: "Pull-Ups / Lat Pulldown", sets: [12, 10, 10, 8] },
      { exercise: "Barbell Row", sets: [10, 8, 8, 6] },
      { exercise: "Seated Cable Row", sets: [12, 10, 8, 8] },
      { exercise: "Dumbbell Pullover", sets: [12, 10, 8] },
      { exercise: "Barbell Curl", sets: [10, 8, 8, 6] },
      { exercise: "Incline Dumbbell Curl", sets: [12, 10, 8] },
    ],
  },
  {
    id: "shoulders-abs",
    dayNumber: 3,
    weekday: "Wednesday",
    title: "Shoulders + Abs",
    subtitle: "Caps, capping & core stability",
    videoQuery: "shoulder workout abs core",
    exercises: [
      { exercise: "Seated Shoulder Press", sets: [10, 8, 8, 6] },
      { exercise: "Dumbbell Lateral Raise", sets: [15, 12, 12, 10] },
      { exercise: "Reverse Pec Deck", sets: [15, 12, 12, 10] },
      { exercise: "Upright Row", sets: [10, 10, 8] },
      { exercise: "Hanging Leg Raise", sets: [15, 15, 12] },
      { exercise: "Cable Crunch", sets: [20, 15, 15] },
    ],
  },
  {
    id: "legs",
    dayNumber: 4,
    weekday: "Thursday",
    title: "Legs",
    subtitle: "Quads, hamstrings & calves",
    videoQuery: "leg day quad hamstring workout",
    exercises: [
      { exercise: "Barbell Squat / Leg Press", sets: [10, 8, 8, 6] },
      { exercise: "Walking Lunges", sets: ["12 each leg × 3"] },
      { exercise: "Leg Extension", sets: [15, 12, 10, 10] },
      { exercise: "Lying Leg Curl", sets: [12, 10, 10, 8] },
      { exercise: "Romanian Deadlift", sets: [10, 8, 8] },
      { exercise: "Standing Calf Raise", sets: [20, 15, 15] },
    ],
  },
  {
    id: "arms",
    dayNumber: 5,
    weekday: "Friday",
    title: "Arms",
    subtitle: "Bi & tri specialization",
    videoQuery: "arm workout biceps triceps mass",
    exercises: [
      { exercise: "Close-Grip Bench Press", sets: [10, 8, 8, 6] },
      { exercise: "Tricep Pushdown", sets: [12, 10, 10, 8] },
      { exercise: "Skull Crushers", sets: [10, 8, 8] },
      { exercise: "Barbell Curl", sets: [10, 8, 8, 6] },
      { exercise: "Hammer Curl", sets: [12, 10, 10] },
      { exercise: "Preacher Curl", sets: [12, 10, 8] },
    ],
  },
  {
    id: "saturday",
    dayNumber: 6,
    weekday: "Saturday",
    title: "Cardio + Core",
    subtitle: "Optional active recovery",
    isRest: false,
    videoQuery: "cardio core hiit 20 minute",
    exercises: [
      { exercise: "Incline Treadmill Walk", sets: ["20–30 min @ 12% incline"] },
      { exercise: "Plank Variations", sets: ["3 × 60s"] },
      { exercise: "Russian Twist", sets: [20, 20, 15] },
    ],
  },
  {
    id: "sunday",
    dayNumber: 7,
    weekday: "Sunday",
    title: "Complete Rest",
    subtitle: "Recover. Refuel. Reload.",
    isRest: true,
    videoQuery: "mobility recovery stretching",
    exercises: [],
  },
];

export const getDayByWeekday = (weekday: string) =>
  WORKOUT_PLAN.find((d) => d.weekday === weekday);

export const getTodaysWorkout = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  return getDayByWeekday(today) ?? WORKOUT_PLAN[0];
};
