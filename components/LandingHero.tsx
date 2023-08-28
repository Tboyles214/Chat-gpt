"use client";
import TypeWriterComponent from "typewriter-effect";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn, signOut } = useAuth();

  return (
    <div className="text-white font-bold py-36 space-y-5 text-center">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool</h1>
        <div
          className="text-transparent bg-clip-text bg-gradient-to-r
                     from-purple-600 to pink-900"
        >
          <TypeWriterComponent
            options={{
              strings: [
                "Chatbot",
                "Photo Generation",
                "Music Generation",
                "Code Generation",
                "Video Generation",
              ],
                autoStart: true,
                loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
            Create content using AI 10x faster than before
      </div>
      <div>
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button  className="md:text-lg p-4 md:p-6 rounded-full font-semibold bg-gradient-to-r
            from-purple-500 to pink-900">
                    Start Generating for Free
                </Button>
            </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
            No Credit Card Required
      </div>
    </div>
  );
};
