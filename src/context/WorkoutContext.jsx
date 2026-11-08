"use client";

import { createContext, useContext, useState, useEffect } from "react";

const WorkoutContext = createContext(null);

export const WorkoutProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");
      const storedCompleted = localStorage.getItem("fitlog-completed");
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
      if (storedCompleted) setCompletedIds(JSON.parse(storedCompleted));
    } catch (e) {
      console.error("Failed to load fitlog data from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }
  }, [plan, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [saved, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog-completed", JSON.stringify(completedIds));
    }
  }, [completedIds, isLoaded]);

  const addToPlan = (workout) => {
    if (plan.length >= 5) {
      return { success: false, message: "Plan is full! Maximum cap of 5 lifts reached." };
    }
    if (plan.find((w) => w.id === workout.id)) {
      return { success: false, message: `"${workout.name}" is already in today's plan.` };
    }
    setPlan((prev) => [...prev, workout]);
    return { success: true, message: `"${workout.name}" added to today's plan!` };
  };

  const addToSaved = (workout) => {
    if (saved.find((w) => w.id === workout.id)) {
      return { success: false, message: `"${workout.name}" is already saved.` };
    }
    setSaved((prev) => [...prev, workout]);
    return { success: true, message: `"${workout.name}" saved for later!` };
  };

  const removeFromPlan = (id) => {
    const workout = plan.find((w) => w.id === id);
    setPlan((prev) => prev.filter((w) => w.id !== id));
    setCompletedIds((prev) => prev.filter((item) => item !== id));
    return {
      success: true,
      message: workout ? `"${workout.name}" removed from today's plan.` : "Removed from today's plan.",
    };
  };

  const removeFromSaved = (id) => {
    const workout = saved.find((w) => w.id === id);
    setSaved((prev) => prev.filter((w) => w.id !== id));
    return {
      success: true,
      message: workout ? `"${workout.name}" removed from saved lifts.` : "Removed from saved.",
    };
  };

  const toggleDone = (id) => {
    const workout = plan.find((w) => w.id === id);
    const isDone = completedIds.includes(id);
    if (isDone) {
      setCompletedIds((prev) => prev.filter((item) => item !== id));
      return {
        success: true,
        message: workout ? `"${workout.name}" marked as incomplete.` : "Marked as incomplete.",
        status: false,
      };
    } else {
      setCompletedIds((prev) => [...prev, id]);
      return {
        success: true,
        message: workout ? `"${workout.name}" marked as done! Great work!` : "Marked as done!",
        status: true,
      };
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        completedIds,
        isLoaded,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error("useWorkout must be used within WorkoutProvider");
  return ctx;
};
