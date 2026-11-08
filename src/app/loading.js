import React from "react";
import { Dumbbell } from "lucide-react";

export default function Loading() {
  return (
    <div className="container w-11/12 mx-auto py-16 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full border-4 border-gray-800 border-t-[#ccff00] animate-spin flex items-center justify-center" />
        <div className="absolute inset-0 flex items-center justify-center text-[#ccff00]">
          <Dumbbell className="w-6 h-6 animate-pulse" />
        </div>
      </div>
      <h3 className="text-xl font-bold font-oswald uppercase tracking-wider text-white">
        LOADING WORKOUTS…
      </h3>
      <p className="text-gray-400 text-sm mt-1">
        Getting your training routine ready.
      </p>

      {/* Skeleton grid preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-12 opacity-30">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-[#181a20] rounded-2xl border border-gray-800 p-6 flex flex-col gap-4 animate-pulse"
          >
            <div className="w-full h-44 bg-gray-800/60 rounded-xl" />
            <div className="w-24 h-5 bg-gray-800/80 rounded-full" />
            <div className="w-3/4 h-6 bg-gray-800/80 rounded" />
            <div className="w-1/2 h-4 bg-gray-800/50 rounded" />
            <div className="w-full h-8 bg-gray-800/40 rounded-xl mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
