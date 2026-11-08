import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | FitLog",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-20 h-20 rounded-3xl bg-[#181a20] border border-gray-800 flex items-center justify-center text-[#ccff00] mb-6 shadow-2xl">
        <Dumbbell className="w-10 h-10 -rotate-45" />
      </div>

      <div className="text-xs font-bold tracking-widest text-[#ccff00] uppercase mb-2">
        ERROR 404
      </div>

      <h1 className="text-5xl md:text-6xl font-black uppercase tracking-wide font-oswald text-white mb-3">
        PAGE NOT FOUND
      </h1>

      <p className="text-gray-400 text-base max-w-md mb-8 leading-relaxed">
        Looks like you wandered off the workout plan. This routine or page
        doesn&apos;t exist in the FitLog library.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="btn btn-success gap-2 uppercase tracking-wider font-bold px-6 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Workouts
        </Link>
        <Link
          href="/my-plan"
          className="btn btn-outline border-gray-700 hover:border-gray-500 text-gray-200 uppercase tracking-wider font-semibold px-6 rounded-full"
        >
          View My Plan
        </Link>
      </div>
    </div>
  );
}
