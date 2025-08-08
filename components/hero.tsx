"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden gradient-bg">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-x-8 max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4 max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-medium tracking-tighter">
                iOS Signing Certificates
                <span className="text-gradient font-bold"> Made Easy</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
                Get easy certificates quickly and affordably without revokes
                or blacklists. No apple developer account needed.
              </p>
            </div>
          </div>
          <img
            src="/Image-dark.png"
            alt="Hero illustration"
            className="w-full max-w-md md:max-w-lg drop-shadow-[0_0_40px_rgba(0,0,0,0.25)]"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[hsl(var(--highlight-purple))] to-[hsl(var(--highlight-pink))] hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_hsl(var(--highlight-purple))] hover:-translate-y-1"
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Pricing
          </Button>
          
        </div>
        <div className="flex justify-center pt-12 animate-bounce">
          <ArrowDown className="h-6 w-6 text-[hsl(var(--highlight-purple))] transition-all duration-300 hover:drop-shadow-[0_0_10px_hsl(var(--highlight-purple))]" />
        </div>
      </div>
    </section>
  );
}
