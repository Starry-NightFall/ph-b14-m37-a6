import React from "react";
import WorkoutCard from "./WorkoutCard";

const getWorkouts = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const data = await res.json();
  return data;
};

const Library = async () => {
  const workouts = await getWorkouts();
  console.log(workouts);
  return (
    <div>
      <h3 className="text-2xl font-bold">THE LIBRARY</h3>
      <p>Twelve lifts covering every major muscle group.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        {workouts.slice(0, 12).map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
};

export default Library;
