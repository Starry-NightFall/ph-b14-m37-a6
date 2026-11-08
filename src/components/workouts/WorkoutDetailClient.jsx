"use client";

import Image from "next/image";
import { CalendarDays, Bookmark } from "lucide-react";
import { useState, useCallback } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import Toast from "@/components/Shared/Toast";

export default function WorkoutDetailClient({ workout }) {
  const {
    name,
    image,
    description,
    muscleGroups,
    equipment,
    difficulty,
    sets,
    reps,
    duration,
    caloriesBurned,
    rating,
    instructions = [],
  } = workout;

  const { addToPlan, addToSaved } = useWorkout();
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type) => {
    setToast({ message, type });
  }, []);

  const handleAddToPlan = () => {
    const result = addToPlan(workout);
    showToast(result.message, result.success ? "success" : "error");
  };

  const handleSaveForLater = () => {
    const result = addToSaved(workout);
    showToast(result.message, result.success ? "success" : "error");
  };

  const specs = [
    { label: "EQUIPMENT", value: equipment },
    { label: "DIFFICULTY", value: difficulty },
    { label: "SETS", value: sets },
    { label: "REPS", value: reps },
    { label: "DURATION", value: `${duration} min` },
    { label: "CALORIES", value: `${caloriesBurned} kcal` },
    { label: "RATING", value: rating },
  ];

  return (
    <>
      <div className="min-h-screen bg-base-100">
        <div className="container mx-auto w-11/12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* ── Left: Image ── */}
            <div className="relative w-full aspect-[4/4.5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* ── Right: Details ── */}
            <div className="flex flex-col gap-5">

              {/* Title & Description */}
              <div>
                <h1 className="text-4xl font-black uppercase tracking-wide font-oswald">
                  {name}
                </h1>
                <p className="mt-2 text-base-content/70 text-base leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Muscle Group Badges */}
              <div className="flex flex-wrap gap-2">
                {muscleGroups?.map((group, i) => (
                  <span
                    key={i}
                    className="px-4 py-1 bg-[#ccff00] text-black text-sm font-bold uppercase rounded-full tracking-wide"
                  >
                    {group}
                  </span>
                ))}
              </div>

              {/* Key Specs Table */}
              <div className="rounded-xl overflow-hidden border border-base-content/10">
                {specs.map((spec, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center px-5 py-3.5 ${
                      i !== specs.length - 1 ? "border-b border-base-content/10" : ""
                    } bg-base-200/60`}
                  >
                    <span className="text-xs font-bold tracking-widest text-base-content/50 uppercase">
                      {spec.label}
                    </span>
                    <span className="text-sm font-semibold text-base-content">
                      {spec.value ?? "—"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              {instructions.length > 0 && (
                <div>
                  <h2 className="text-lg font-black uppercase tracking-widest mb-3">
                    Instructions
                  </h2>
                  <ol className="flex flex-col gap-2.5 list-decimal list-inside">
                    {instructions.map((step, i) => (
                      <li key={i} className="text-base-content/80 text-sm leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mt-2">
                <button
                  onClick={handleAddToPlan}
                  className="btn btn-success gap-2 uppercase tracking-wider font-bold px-6"
                >
                  <CalendarDays size={17} />
                  Add to today&apos;s plan
                </button>
                <button
                  onClick={handleSaveForLater}
                  className="btn btn-outline gap-2 uppercase tracking-wider font-semibold px-6"
                >
                  <Bookmark size={17} />
                  Save for later
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
