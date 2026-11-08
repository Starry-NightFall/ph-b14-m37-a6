import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer flex justify-between sm:footer-horizontal bg-[#101216] border-t border-gray-800 text-gray-400 items-center px-6 py-5 mt-auto">
      <aside className="grid-flow-col items-center">
        <h3 className="text-lg font-bold flex items-center gap-2 text-white font-oswald tracking-wider">
          <Image src={Logo} alt="Logo" width={24} height={24} style={{ width: "auto", height: "24px" }} />
          FITLOG
        </h3>
      </aside>
      <p className="text-xs text-gray-400">
        © 2026 FitLog — Workout Library. Train hard, log honest.
      </p>
    </footer>
  );
};

export default Footer;
