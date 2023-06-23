import * as React from "react";
import useQuickblox from "@/providers/quickblox-provider";
import Image from "next/image";

function Header() {
  const { currentUser } = useQuickblox();

  return (
    <header className="h-24 w-full shadow bg-white flex items-center justify-between px-20 z-10">
      <Image
        src="/colored_logo.png"
        alt="petpal asia"
        width={164}
        height={48}
      />
      <button>
        <span className="font-semibold">Hi, {currentUser?.full_name}</span>
      </button>
    </header>
  );
}

export default Header;
