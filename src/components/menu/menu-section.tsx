"use client";

import { useState } from "react";
import type { MenuItem } from "@/types/menu";
import { Separator } from "@/components/ui/separator";
import { motion } from "@/components/ui/motion";

interface MenuSectionProps {
  id: string;
  title: string;
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void; // Add the handler prop
}

export function MenuSection({
  id,
  title,
  items,
  onItemClick,
}: MenuSectionProps) {
  // Destructure the new prop
  return (
    <section id={id} className="py-12 scroll-mt-24" data-oid="upgcwz-">
      {/* Apply bold, uppercase, slightly skewed style to category titles */}
      <h2
        className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter text-white"
        style={{
          fontFamily: '"Impact", "Arial Black", sans-serif',
          textShadow: "1px 1px 0px #555, 2px 2px 0px #333",
          transform: "skewX(-8deg)",
          letterSpacing: "-0.03em",
        }}
        data-oid="cy739sq"
      >
        {title}
      </h2>
      {/* Use a simple white separator */}
      <Separator className="mb-10 bg-white/50 h-[2px]" data-oid="3o6y1nu" />
      {/* Adjust grid layout and gap */}
      <div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        data-oid="8-0en27"
      >
        {items.map((item, index) => (
          <MenuItem
            key={`${item.name}-${index}`}
            item={item}
            index={index}
            // Pass the actual handler from props
            onClick={() => onItemClick(item)}
            data-oid="t0sw_xu"
          />
        ))}
      </div>
    </section>
  );
}

// Add onClick prop to the function signature
function MenuItem({
  item,
  index,
  onClick,
}: {
  item: MenuItem;
  index: number;
  onClick: () => void;
}) {
  // Removed isHovered state as hover effects will be CSS driven

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group border-2 border-white/50 rounded-md overflow-hidden cursor-pointer 
                 bg-black hover:bg-white/10 transition-colors duration-300 
                 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
      onClick={onClick} // Attach the onClick handler
      style={{ transform: "skewX(-3deg)" }} // Apply slight skew to the card
      data-oid="7bq5ujx"
    >
      {/* Optional: Add image placeholder if needed for modal later */}
      {/* <img src={item.imageUrl || '/placeholder.png'} alt={item.name} className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 transition-opacity" /> */}

      <div className="p-4" data-oid="7m:n7oh">
        <div
          className="flex justify-between items-baseline mb-2"
          data-oid="04vyua-"
        >
          {/* Bold, slightly larger item name */}
          <h3
            className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-white transition-colors"
            style={{ fontFamily: '"Arial Black", sans-serif' }}
            data-oid="df30dlo"
          >
            {item.name}
          </h3>
          {/* Simple white price */}
          <span
            className="font-mono font-semibold text-lg text-white ml-3"
            data-oid="l72:x:."
          >
            {item.price}
          </span>
        </div>
        {item.description && (
          <p
            className="text-gray-400 mt-2 text-sm font-mono group-hover:text-gray-200 transition-colors"
            data-oid="qv_hy.:"
          >
            {/* Keep description concise for the card view */}
            {item.description.length > 80
              ? item.description.substring(0, 77) + "..."
              : item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
