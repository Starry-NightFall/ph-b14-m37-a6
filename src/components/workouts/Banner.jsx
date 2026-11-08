import React from "react";
import BannerImg from "@/assets/banner.png";
import Image from "next/image";
import { Dumbbell } from "lucide-react";

const Banner = () => {
  return (
    <div className="bg-zinc-800 container w-11/12 my-8 py-10 rounded-4xl mx-auto flex flex-wrap flex-col-reverse lg:flex-row justify-between items-center">
      <div className="lg:ml-14 px-8 lg:px-0">
        <h4 className="text-sm font-bold my-4 text-success tracking-widest">WORKOUT LIBRARY</h4>
        <h1 className="text-5xl font-bold my-4 font-oswald uppercase leading-tight">
          TRAIN WITH INTENT.
          <br />
          LOG EVERY SET.
        </h1>
        <p className="text-lg my-4 text-base-content/80">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          <br />
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a href="#library" className="btn btn-success uppercase tracking-wider gap-2">
          <Dumbbell size={18} />
          BROWSE WORKOUTS
        </a>
      </div>
      <div>
        <Image src={BannerImg} alt="Banner" />
      </div>
    </div>
  );
};

export default Banner;
