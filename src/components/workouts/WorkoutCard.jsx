import Image from "next/image";
import React from "react";
import { Clock, Flame, Star } from "lucide-react";

const WorkoutCard = ({ workout }) => {
  const { name, image, muscleGroups, equipment, duration, caloriesBurned, rating } = workout;

  return (
    <div className="card w-11/12 mx-auto bg-[#181a20] text-white shadow-xl rounded-2xl overflow-hidden border border-gray-800">
      {/* Card Image Header */}
      <figure className="relative h-56 w-full">
        <Image src={image} alt={name} fill className="object-cover" />
      </figure>

      {/* Card Body Details */}
      <div className="card-body p-6 gap-3">
        {/* Muscle Group Badges */}
        <div className="flex flex-wrap gap-2">
          {muscleGroups?.map((group, index) => (
            <span key={index} className="px-3 py-1 bg-[#ccff00] text-black text-xs font-bold uppercase rounded-full tracking-wide">
              {group}
            </span>
          ))}
        </div>

        {/* Title & Subtitle */}
        <div>
          <h2 className="card-title text-xl font-black uppercase tracking-wider text-white">{name}</h2>
          <p className="text-sm text-gray-400 mt-1">{equipment}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-1" />

        {/* Workout Stats Footer */}
        <div className="flex items-center gap-6 text-sm text-gray-300 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-gray-400" />
            <span>{caloriesBurned} kcal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-gray-400" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
