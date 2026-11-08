import React from "react";
import LibraryClient from "./LibraryClient";

const getWorkouts = async () => {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch workouts");
    return await res.json();
  } catch (error) {
    console.error("Error fetching workouts:", error);
    // Fallback to alternative API
    try {
      const altRes = await fetch("https://api.api-store.workers.dev/api/fitlog", {
        next: { revalidate: 3600 },
      });
      if (altRes.ok) return await altRes.json();
    } catch (altError) {
      console.error("Error fetching from alternative API:", altError);
    }
    return [];
  }
};

const Library = async () => {
  const workouts = await getWorkouts();

  return <LibraryClient initialWorkouts={workouts} />;
};

export default Library;
