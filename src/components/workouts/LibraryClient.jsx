"use client";

import React, { useState, useMemo } from "react";
import WorkoutCard from "./WorkoutCard";
import { ChevronDown, ArrowUpDown, Search } from "lucide-react";

export default function LibraryClient({ initialWorkouts = [] }) {
  const [sortBy, setSortBy] = useState("duration"); // "duration" | "calories" | "rating"
  const [searchQuery, setSearchQuery] = useState("");

  const sortedWorkouts = useMemo(() => {
    let list = [...initialWorkouts];

    // Optional Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (w) =>
          w.name?.toLowerCase().includes(q) ||
          w.equipment?.toLowerCase().includes(q) ||
          w.muscleGroups?.some((m) => m.toLowerCase().includes(q))
      );
    }

    // Sort by Duration, Calories, or Rating
    list.sort((a, b) => {
      if (sortBy === "duration") {
        return (Number(a.duration) || 0) - (Number(b.duration) || 0);
      }
      if (sortBy === "calories") {
        return (Number(b.caloriesBurned) || 0) - (Number(a.caloriesBurned) || 0);
      }
      if (sortBy === "rating") {
        return (Number(b.rating) || 0) - (Number(a.rating) || 0);
      }
      return 0;
    });

    return list.slice(0, 12);
  }, [initialWorkouts, sortBy, searchQuery]);

  return (
    <div id="library" className="container w-11/12 mx-auto py-12 scroll-mt-20">
      {/* Section Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-gray-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#ccff00] uppercase mb-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>FEATURED EXERCISES</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black uppercase font-oswald text-white tracking-wide">
            THE LIBRARY
          </h3>
          <p className="text-gray-400 text-sm md:text-base mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-56">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter lifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-sm w-full pl-9 bg-[#181a20] border-gray-800 rounded-xl text-sm focus:border-[#ccff00] focus:outline-none text-white"
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

          {/* C1 Requirement: Sort Dropdown ("Sort By" -> options Duration, Calories, Rating; default Duration, with chevron icon) */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm bg-[#181a20] hover:bg-base-200 border border-gray-800 hover:border-gray-700 text-gray-200 rounded-xl text-xs font-semibold gap-2 flex items-center capitalize"
            >
              <span className="text-gray-400 font-normal">Sort By:</span>
              <span className="text-[#ccff00] font-bold">
                {sortBy === "duration"
                  ? "Duration"
                  : sortBy === "calories"
                  ? "Calories"
                  : "Rating"}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu menu-sm bg-[#181a20] border border-gray-800 rounded-xl z-30 w-44 p-2 shadow-2xl mt-1 gap-1"
            >
              <li>
                <button
                  type="button"
                  onClick={() => setSortBy("duration")}
                  className={`flex items-center justify-between py-2 px-3 rounded-lg text-xs font-medium ${
                    sortBy === "duration"
                      ? "bg-[#ccff00] text-black font-bold"
                      : "text-gray-300 hover:bg-base-200"
                  }`}
                >
                  <span>Duration</span>
                  {sortBy === "duration" && <span className="text-xs">✓</span>}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setSortBy("calories")}
                  className={`flex items-center justify-between py-2 px-3 rounded-lg text-xs font-medium ${
                    sortBy === "calories"
                      ? "bg-[#ccff00] text-black font-bold"
                      : "text-gray-300 hover:bg-base-200"
                  }`}
                >
                  <span>Calories</span>
                  {sortBy === "calories" && <span className="text-xs">✓</span>}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setSortBy("rating")}
                  className={`flex items-center justify-between py-2 px-3 rounded-lg text-xs font-medium ${
                    sortBy === "rating"
                      ? "bg-[#ccff00] text-black font-bold"
                      : "text-gray-300 hover:bg-base-200"
                  }`}
                >
                  <span>Rating</span>
                  {sortBy === "rating" && <span className="text-xs">✓</span>}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3x4 Grid (12 lifts) */}
      {sortedWorkouts.length === 0 ? (
        <div className="text-center py-16 bg-[#181a20] border border-gray-800 rounded-2xl p-8">
          <p className="text-gray-400 text-sm">
            No workouts found matching &quot;{searchQuery}&quot;.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="btn btn-sm btn-ghost text-[#ccff00] mt-3"
          >
            Clear Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
}
