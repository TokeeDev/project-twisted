"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MenuNavigationProps {
  sections: string[];
}

export function MenuNavigation({ sections }: MenuNavigationProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections
        .map((section) => {
          const id = section.toLowerCase().replace(/[^\w]+/g, "-");
          return document.getElementById(id);
        })
        .filter(Boolean);

      const currentSection = sectionElements.find((section) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div
      className="bg-twisted-darker rounded-lg shadow-[0_0_15px_rgba(153,51,255,0.2)] p-4"
      data-oid="x9.eyvv"
    >
      <h2
        className="text-xl font-semibold mb-4 text-twisted-neon"
        data-oid="x4.kvsa"
      >
        Menu
      </h2>
      <nav className="flex flex-col space-y-2" data-oid="l.wsz7p">
        {sections.map((section) => {
          const id = section.toLowerCase().replace(/[^\w]+/g, "-");
          return (
            <button
              key={section}
              className={cn(
                "text-left px-3 py-2 rounded-md transition-colors text-twisted-white/70 hover:text-twisted-neon hover:bg-twisted-violet/20",
                activeSection === id &&
                  "bg-twisted-violet/30 text-twisted-neon font-medium",
              )}
              onClick={() => scrollToSection(id)}
              data-oid="2qq532d"
            >
              {section}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
