import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href={"/"}>
      <h2 className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to to-cyan-800 text-transparent bg-clip-text hover:cursor-pointer">
        ExperiMental
      </h2>
    </Link>
  );
}

export default Logo;
