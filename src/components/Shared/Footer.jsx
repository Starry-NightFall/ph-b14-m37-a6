import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer flex justify-between sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <h3 className="text-lg font-bold flex">
          <Image src={Logo} alt="Logo" width="24" height="24" className="mr-2" />
          FITLOG
        </h3>
      </aside>
      <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
    </footer>
  );
};

export default Footer;
