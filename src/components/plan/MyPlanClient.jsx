"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useMemo } from "react";
import {
  Clock,
  Flame,
  Star,
  Check,
  X,
  Eye,
  Dumbbell,
  CalendarDays,
  Bookmark,
  Plus,
  ArrowRight,
  Search,
} from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";
import Toast from "@/components/Shared/Toast";

export default function MyPlanClient() {
  const {
    plan,
    saved,
    completedIds,
    isLoaded,
    addToPlan,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
  } = useWorkout();

  const [activeTab, setActiveTab] = useState("plan"); // "plan" | "saved"
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  // Compute Metrics Summary for Today's Plan (starts at 0 and updates live)
  const metrics = useMemo(() => {
    const totalExercises = plan.length;
    const totalMinutes = plan.reduce(
      (sum, item) => sum + (Number(item.duration) || 0),
      0
    );
    const totalCalories = plan.reduce(
      (sum, item) => sum + (Number(item.caloriesBurned) || 0),
      0
    );
    const completedCount = plan.filter((item) =>
      completedIds.includes(item.id)
    ).length;

    return { totalExercises, totalMinutes, totalCalories, completedCount };
  }, [plan, completedIds]);

  // Current list based on active tab & optional search filter
  const currentItems = useMemo(() => {
    const source = activeTab === "plan" ? plan : saved;
    if (!searchQuery.trim()) return source;
    const query = searchQuery.toLowerCase();
    return source.filter(
      (item) =>
        item.name?.toLowerCase().includes(query) ||
        item.equipment?.toLowerCase().includes(query) ||
        item.muscleGroups?.some((g) => g.toLowerCase().includes(query))
    );
  }, [activeTab, plan, saved, searchQuery]);

  const handleMarkAsDone = (workout) => {
    const res = toggleDone(workout.id);
    showToast(res.message, "success");
  };

  const handleRemoveFromPlan = (workout) => {
    const res = removeFromPlan(workout.id);
    showToast(res.message, "success");
  };

  const handleRemoveFromSaved = (workout) => {
    const res = removeFromSaved(workout.id);
    showToast(res.message, "success");
  };

  const handleMoveToPlan = (workout) => {
    const res = addToPlan(workout);
    showToast(res.message, res.success ? "success" : "error");
  };

  return (
    <div className="min-h-screen bg-base-100 py-10">
      <div className="container mx-auto w-11/12 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#ccff00] uppercase mb-1">
            <CalendarDays className="w-4 h-4" />
            <span>DAILY WORKOUT LOG</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wide font-oswald text-white">
            MY PLAN
          </h1>
          <p className="mt-2 text-base-content/70 text-base max-w-2xl">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics Summary Row (Exercises, Minutes, Calories) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {/* Exercises Metric Card */}
          <div className="bg-[#181a20] border border-gray-800 rounded-2xl p-6 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                EXERCISES
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl md:text-4xl font-black font-oswald text-white">
                  {metrics.totalExercises}
                </span>
                <span className="text-xs text-gray-500 font-semibold">
                  / 5 max
                </span>
              </div>
              {metrics.totalExercises > 0 && (
                <p className="text-xs text-[#ccff00] font-medium mt-1">
                  {metrics.completedCount} of {metrics.totalExercises} done
                </p>
              )}
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00]">
              <Dumbbell className="w-6 h-6" />
            </div>
          </div>

          {/* Minutes Metric Card */}
          <div className="bg-[#181a20] border border-gray-800 rounded-2xl p-6 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                MINUTES
              </p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl md:text-4xl font-black font-oswald text-white">
                  {metrics.totalMinutes}
                </span>
                <span className="text-sm text-gray-400 font-semibold">min</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Estimated duration</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Calories Metric Card */}
          <div className="bg-[#181a20] border border-gray-800 rounded-2xl p-6 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                CALORIES
              </p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl md:text-4xl font-black font-oswald text-white">
                  {metrics.totalCalories}
                </span>
                <span className="text-sm text-gray-400 font-semibold">kcal</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Target energy burn</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
              <Flame className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Controls & Optional Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("plan")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all ${
                activeTab === "plan"
                  ? "bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/10"
                  : "bg-base-200/60 text-gray-400 hover:text-white hover:bg-base-200"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Today&apos;s Plan</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === "plan"
                    ? "bg-black/20 text-black font-black"
                    : "bg-gray-800 text-gray-300 font-semibold"
                }`}
              >
                {plan.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all ${
                activeTab === "saved"
                  ? "bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/10"
                  : "bg-base-200/60 text-gray-400 hover:text-white hover:bg-base-200"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === "saved"
                    ? "bg-black/20 text-black font-black"
                    : "bg-gray-800 text-gray-300 font-semibold"
                }`}
              >
                {saved.length}
              </span>
            </button>
          </div>

          {/* Optional Search filter */}
          {((activeTab === "plan" && plan.length > 0) ||
            (activeTab === "saved" && saved.length > 0)) && (
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search plan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-sm w-full pl-9 bg-[#181a20] border-gray-800 rounded-full text-sm focus:border-[#ccff00] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          )}
        </div>

        {/* Content Area */}
        {!isLoaded ? (
          /* Loading State */
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <span className="loading loading-spinner loading-lg text-success mb-4"></span>
            <p className="text-gray-400 text-base font-medium">
              Loading workouts…
            </p>
          </div>
        ) : currentItems.length === 0 ? (
          /* Empty State */
          <div className="bg-[#181a20] border border-gray-800/80 rounded-3xl p-12 text-center my-6 max-w-xl mx-auto flex flex-col items-center shadow-xl">
            <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center text-gray-500 mb-5">
              <Dumbbell className="w-8 h-8 opacity-60" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider font-oswald text-white mb-2">
              NOTHING HERE YET
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-md mb-6 leading-relaxed">
              {searchQuery
                ? `No workouts found matching "${searchQuery}".`
                : activeTab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "Save your favorite lifts to easily queue them for upcoming sessions."}
            </p>
            <Link
              href="/"
              className="btn btn-success uppercase tracking-wider font-bold px-6 gap-2 rounded-full"
            >
              <CompassIcon className="w-4 h-4" />
              Go to workouts
            </Link>
          </div>
        ) : (
          /* Workout Cards List */
          <div className="flex flex-col gap-4">
            {currentItems.map((workout) => {
              const isDone = completedIds.includes(workout.id);
              return (
                <div
                  key={workout.id}
                  className={`bg-[#181a20] border rounded-2xl p-4 md:p-5 transition-all flex flex-col md:flex-row items-center gap-5 shadow-lg ${
                    isDone
                      ? "border-emerald-500/40 bg-[#141a18]"
                      : "border-gray-800 hover:border-gray-700"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-full md:w-36 h-40 md:h-28 rounded-xl overflow-hidden shrink-0 bg-base-300">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className={`object-cover transition-opacity ${
                        isDone ? "opacity-75" : "opacity-100"
                      }`}
                      sizes="(max-width: 768px) 100vw, 150px"
                    />
                    {isDone && (
                      <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="px-2.5 py-1 bg-emerald-500 text-black text-xs font-black uppercase rounded-full tracking-wider flex items-center gap-1 shadow">
                          <Check className="w-3 h-3 stroke-[3]" />
                          DONE
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="flex-1 min-w-0 w-full">
                    {/* Muscle Groups */}
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      {workout.muscleGroups?.map((group, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 bg-[#ccff00]/15 text-[#ccff00] text-[11px] font-bold uppercase rounded-full tracking-wide"
                        >
                          {group}
                        </span>
                      ))}
                    </div>

                    {/* Title & Equipment */}
                    <h3
                      className={`text-xl font-black uppercase tracking-wider font-oswald text-white truncate ${
                        isDone ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {workout.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {workout.equipment}
                    </p>

                    {/* Stats Row with icons */}
                    <div className="flex items-center gap-4 text-xs text-gray-300 font-medium mt-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{workout.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-gray-400" />
                        <span>{workout.caloriesBurned} kcal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        <span>{workout.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-gray-800">
                    {/* View Details button */}
                    <Link
                      href={`/workout/${workout.id}`}
                      className="btn btn-sm btn-ghost border border-gray-700 hover:border-gray-500 text-gray-200 text-xs font-semibold gap-1 rounded-xl"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </Link>

                    {/* Today's Plan Actions */}
                    {activeTab === "plan" && (
                      <button
                        onClick={() => handleMarkAsDone(workout)}
                        className={`btn btn-sm gap-1 text-xs font-bold rounded-xl transition-all ${
                          isDone
                            ? "bg-emerald-500 text-black border-emerald-500 hover:bg-emerald-600"
                            : "btn-outline border-emerald-500/60 text-emerald-400 hover:bg-emerald-500 hover:text-black"
                        }`}
                        title={isDone ? "Mark as Incomplete" : "Mark as Done"}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>{isDone ? "Done" : "Mark as Done"}</span>
                      </button>
                    )}

                    {/* Saved Actions (Move / Add to today's plan) */}
                    {activeTab === "saved" && (
                      <button
                        onClick={() => handleMoveToPlan(workout)}
                        className="btn btn-sm btn-success text-black text-xs font-bold gap-1 rounded-xl"
                        title="Add to today's plan"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Add to Plan</span>
                      </button>
                    )}

                    {/* Remove (X) button */}
                    <button
                      onClick={() =>
                        activeTab === "plan"
                          ? handleRemoveFromPlan(workout)
                          : handleRemoveFromSaved(workout)
                      }
                      className="btn btn-sm btn-ghost text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl p-2"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

function CompassIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
