"use client";

import { ModeToggle } from "@/components/ToggleMode";

const Homepage = () => {
  return (
    <>
      <main className="   shadow-sm rounded-sm ">
        <div className="sm:w-120 md:w-220">
          <div className="outline-1">
            <ModeToggle />
            <h1 className="">section one</h1>
          </div>
        </div>
      </main>
    </>
  );
};

export default Homepage;
