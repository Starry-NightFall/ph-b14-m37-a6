import WorkoutDetailClient from "@/components/workouts/WorkoutDetailClient";
import { notFound } from "next/navigation";

const getWorkout = async (id) => {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);
  if (!workout) return { title: "Workout Not Found" };
  return {
    title: `${workout.name} | FitLog`,
    description: workout.description,
  };
}

export default async function WorkoutDetailPage({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) notFound();

  return <WorkoutDetailClient workout={workout} />;
}
