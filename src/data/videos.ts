// Curated YouTube videos per training focus.
// These are real, well-known fitness creator videos.
export type VideoLink = {
  title: string;
  channel: string;
  youtubeId: string;
  category: string;
};

export const VIDEOS: VideoLink[] = [
  // Chest + Triceps
  { title: "How To Build A BIGGER Chest (Best Exercises)", channel: "Jeff Nippard", youtubeId: "Mxn5Sk2lJWk", category: "Chest + Triceps" },
  { title: "Perfect Tricep Workout (Push, Extend, Overhead)", channel: "ATHLEAN-X", youtubeId: "-xa-6cQaZKY", category: "Chest + Triceps" },

  // Back + Biceps
  { title: "How To Build A Bigger BACK (Science-Based)", channel: "Jeff Nippard", youtubeId: "0AUGkch3tGc", category: "Back + Biceps" },
  { title: "The PERFECT Bicep Workout Sets and Reps Included", channel: "ATHLEAN-X", youtubeId: "9efgcAjQe7E", category: "Back + Biceps" },

  // Shoulders + Abs
  { title: "How To Build BOULDER Shoulders (4 Exercises)", channel: "Jeff Nippard", youtubeId: "lJ_RGSXlKgI", category: "Shoulders + Abs" },
  { title: "6 Pack Abs Workout (NO REST NEEDED!)", channel: "ATHLEAN-X", youtubeId: "DHD1-2P94DI", category: "Shoulders + Abs" },

  // Legs
  { title: "How To Build BIGGER LEGS (Quads + Hamstrings)", channel: "Jeff Nippard", youtubeId: "H7yk71Z2CpE", category: "Legs" },
  { title: "Perfect Leg Workout for Mass and Strength", channel: "ATHLEAN-X", youtubeId: "RjexvOAsVtI", category: "Legs" },

  // Arms
  { title: "Best Science-Based ARM Workout for Mass", channel: "Jeremy Ethier", youtubeId: "JnhJfLnAOLk", category: "Arms" },
  { title: "Perfect Arm Workout for SIZE (Bi & Tri)", channel: "ATHLEAN-X", youtubeId: "ykJmrZ5v0Oo", category: "Arms" },

  // Recovery
  { title: "Full Body Mobility Routine (10 minutes)", channel: "Tom Merrick", youtubeId: "v7AYKMP6rOE", category: "Recovery" },
  { title: "Best Stretches For Recovery After Workouts", channel: "ATHLEAN-X", youtubeId: "L_xrDAtykMI", category: "Recovery" },
];
