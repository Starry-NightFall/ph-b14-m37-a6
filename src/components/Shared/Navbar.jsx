"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import { useWorkout } from "@/context/WorkoutContext";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

function NavLinks() {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  return (
    <>
      <li>
        <Link
          href="/"
          className={
            isActive("/")
              ? "font-bold text-success border-b-2 border-success rounded-none"
              : ""
          }
        >
          Workouts
        </Link>
      </li>
      <li>
        <Link
          href="/my-plan"
          className={
            isActive("/my-plan")
              ? "font-bold text-success border-b-2 border-success rounded-none"
              : ""
          }
        >
          My Plan
        </Link>
      </li>
    </>
  );
}

const Navbar = () => {
  const { plan, saved } = useWorkout();

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-40">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <Suspense fallback={<li><span>Loading…</span></li>}>
                <NavLinks />
              </Suspense>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">
            <Image src={Logo} alt="Logo" width={32} height={32} style={{ width: "auto", height: "32px" }} />
            FITLOG
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <Suspense fallback={null}>
              <NavLinks />
            </Suspense>
          </ul>
        </div>
        <div className="navbar-end gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ccff00] text-black text-xs font-bold tracking-wide hover:opacity-80 transition-opacity"
          >
            Plan
            <span className="bg-black/20 rounded-full px-1.5 py-0.5 text-xs font-black">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-current text-xs font-bold tracking-wide hover:opacity-80 transition-opacity"
          >
            Saved
            <span className="bg-base-content/10 rounded-full px-1.5 py-0.5 text-xs font-black">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
