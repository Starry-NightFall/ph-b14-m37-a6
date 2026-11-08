"use client";

import { createContext, useContext, useState, useEffect } from "react";

const WorkoutContext = createContext(null);

export const WorkoutProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  // Persist to localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");
    if (storedPlan) setPlan(JSON.parse(storedPlan));
    if (storedSaved) setSaved(JSON.parse(storedSaved));
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout) => {
    if (plan.length >= 5) return { success: false, message: "Plan is full! Max 5 lifts." };
    if (plan.find((w) => w.id === workout.id)) return { success: false, message: "Already in today's plan." };
    setPlan((prev) => [...prev, workout]);
    return { success: true, message: `${workout.name} added to today's plan!` };
  };

  const addToSaved = (workout) => {
    if (saved.find((w) => w.id === workout.id)) return { success: false, message: "Already saved." };
    setSaved((prev) => [...prev, workout]);
    return { success: true, message: `${workout.name} saved for later!` };
  };

  const removeFromPlan = (id) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
  };

  const removeFromSaved = (id) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <WorkoutContext.Provider
      value={{ plan, saved, addToPlan, addToSaved, removeFromPlan, removeFromSaved }}
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
