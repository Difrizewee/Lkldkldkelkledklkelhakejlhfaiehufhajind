"use client";

import { useState } from "react";
import { Preloader } from "@/app/components/Preloader";
import { HeaderV3 } from "@/app/components/HeaderV3";
import { FooterV3 } from "@/app/components/FooterV3";
import { CustomCursor } from "@/app/components/CustomCursor";
import { ScrollToTop } from "@/app/components/ScrollToTop";
import { HeroV3 } from "@/app/components/sections/HeroV3";
import { MarketV3 } from "@/app/components/sections/MarketV3";
import { DifferentiatorsV3 } from "@/app/components/sections/DifferentiatorsV3";
import { HowWeWork } from "@/app/components/sections/HowWeWork";
import { CasesV3 } from "@/app/components/sections/CasesV3";
import { MythsV3 } from "@/app/components/sections/MythsV3";
import { AboutV3 } from "@/app/components/sections/AboutV3";
import { ContactV3 } from "@/app/components/sections/ContactV3";

export function Site() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <CustomCursor />

      <div className={ready ? "opacity-100" : "opacity-100"}>
        <HeaderV3 />
        <main className="flex-1">
          <HeroV3 />
          <MarketV3 />
          <DifferentiatorsV3 />
          <HowWeWork />
          <CasesV3 />
          <MythsV3 />
          <AboutV3 />
          <ContactV3 />
        </main>
        <FooterV3 />
        <ScrollToTop />
      </div>
    </>
  );
}
