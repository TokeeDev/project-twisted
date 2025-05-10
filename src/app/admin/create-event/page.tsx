// app/admin/create-event/page.tsx
"use client";

import React, { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import "@uploadthing/react/styles.css";
import Image from "next/image";
import { PlusCircle, Trash2, ImagePlus } from "lucide-react"; // Added ImagePlus

export default function CreateEventPage() {
  // --- State (UNCHANGED) ---
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [djs, setDjs] = useState([""]);
  const [specials, setSpecials] = useState([""]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // --- Handlers (UNCHANGED) ---
  const addItem = (
    arr: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => setter([...arr, ""]);

  const updateItem = (
    arr: string[],
    i: number,
    v: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    const copy = [...arr];
    copy[i] = v;
    setter(copy);
  };

  const removeItem = (
    arr: string[],
    i: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => setter(arr.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, date, time, djs, specials, imageUrl };
    console.log("SUBMIT", payload);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Event created successfully:', result);
      alert("Event created!");
      // Optionally, reset form or redirect
      // setTitle("");
      // setDate("");
      // setTime("");
      // setDjs([""]);
      // setSpecials([""]);
      // setImageUrl(null);
    } catch (error) {
      console.error("Failed to create event:", error);
      alert(`Failed to create event: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // --- Common Neon styles (UNCHANGED as per request, used in JSX) ---
  const box =
    "border-2 border-neon-green rounded-xl px-4 py-2 text-neon-green bg-transparent placeholder-neon-green/50 focus:outline-none";
  const btn =
    "flex items-center justify-center space-x-2 border-2 border-neon-green rounded-xl px-4 py-2 text-neon-green hover:bg-neon-green/10 transition";
  const sectionSpacing = "space-y-4"; // Original `section` renamed for clarity, applied below

  return (
    <div
      className="min-h-screen w-full bg-brand-black text-neon-green pt-20 overflow-x-hidden" // Added pt-20, min-h-screen, overflow-x-hidden
      data-oid="vtlhkpu"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-cyber text-center text-neon-green">
            Create New Event
          </h1>
        </header>

        <div className="flex flex-col md:flex-row md:flex-nowrap md:gap-x-8" data-oid="parent-flex-container"> {/* data-oid added for clarity if needed, you can remove */}
          {/* Left: Image Upload (Original lg:w-1/3) */}
          <div
            className="w-full md:w-1/3 mb-8 md:mb-0 p-6 bg-black/25 border border-neon-green/30 rounded-2xl flex flex-col shadow-xl shadow-neon-green/10"
            data-oid="q74w:df"
          >
            <h2 className="text-2xl font-cyber text-neon-green mb-6 text-center">
              Event Flyer
            </h2>
            <div
              className="relative aspect-[9/16] w-full border-2 border-dashed border-neon-green/50 rounded-xl flex flex-col items-center justify-center overflow-hidden group mb-6"
              data-oid="35k0qkv"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Event flyer preview"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-xl"
                  data-oid="ua_mo64"
                />
              ) : (
                <div
                  className="text-neon-green/60 text-center p-4 flex flex-col items-center justify-center space-y-2"
                  data-oid="jl5k_91" // Reassigned from simple span to this div
                >
                  <ImagePlus size={48} className="opacity-70" />
                  <p className="text-lg font-semibold">Upload Image</p>
                  <p className="text-sm">(9:16 Aspect Ratio Recommended)</p>
                </div>
              )}
            </div>
            <div className="mt-auto" data-oid="cybojh."> {/* mt-auto pushes button to bottom if space */}
              <UploadButton<OurFileRouter, "imageUploader">
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res?.[0]?.url) setImageUrl(res[0].url);
                }}
                onUploadError={(err) => alert(err.message)}
                className="ut-button:w-full ut-button:border-neon-green ut-button:text-neon-green ut-button:bg-transparent ut-button:hover:bg-neon-green/20 ut-button:rounded-lg ut-allowed-content:text-neon-green/80 ut-button:transition-all ut-button:duration-200"
                data-oid="0lqnwza"
              />
            </div>
          </div>

          {/* Right: Form Inputs (Original lg:w-1/2) */}
          <div
            className="w-full md:w-2/3 p-6 bg-black/25 border border-neon-green/30 rounded-2xl shadow-xl shadow-neon-green/10 flex flex-col"
            data-oid=".2tjmjj"
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-full"
              data-oid="3-b78ef"
            >
              {/* Scrollable form content area */}
              <div
                className="flex-grow space-y-6 custom-scrollbar overflow-y-auto lg:max-h-[calc(100vh-320px)] pr-3 md:pr-4" // Adjusted max-h, pr for scrollbar
                data-oid="4ierv1a"
              >
                {/* Title */}
                <div>
                  <label htmlFor="event-title" className="block text-sm font-medium text-neon-green/80 mb-1.5 font-cyber">Event Title</label>
                  <input
                    id="event-title"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`${box} w-full text-lg font-cyber`}
                    required
                    data-oid="l-kfekx"
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6" data-oid="qmo2y1k">
                  <div>
                    <label htmlFor="event-date" className="block text-sm font-medium text-neon-green/80 mb-1.5 font-cyber">Date</label>
                    <input
                      id="event-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`${box} w-full`}
                      required
                      data-oid="fz15hoh"
                    />
                  </div>
                  <div>
                    <label htmlFor="event-time" className="block text-sm font-medium text-neon-green/80 mb-1.5 font-cyber">Time (Optional)</label>
                    <input
                      id="event-time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={`${box} w-full`}
                      data-oid="4fcv7lr"
                    />
                  </div>
                </div>

                {/* DJs */}
                <div className={sectionSpacing} data-oid="lnkm1gu">
                  <h3 className="text-xl font-cyber text-neon-green">DJs</h3>
                  {djs.map((dj, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-brand-black/50 border border-neon-green/20 rounded-lg" data-oid="zik..6w">
                      <input
                        type="text"
                        placeholder={`DJ ${i + 1}`}
                        value={dj}
                        onChange={(e) => updateItem(djs, i, e.target.value, setDjs)}
                        className={`${box} flex-1`}
                        required={i === 0 && djs.length === 1 ? true : (i === 0 ? true : false)} // Original required={!i} implies first is always required if any are present
                        data-oid="rvatiz_"
                      />
                      {djs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(djs, i, setDjs)}
                          className="p-2 text-neon-green/70 hover:text-red-500 transition-colors rounded-md hover:bg-red-500/10"
                          aria-label="Remove DJ"
                          data-oid="jtef.xm"
                        >
                          <Trash2 size={20} data-oid="jye.z58" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem(djs, setDjs)}
                    className={`${btn} w-full sm:w-auto`} // Responsive width
                    data-oid="tonb5o4"
                  >
                    <PlusCircle size={20} data-oid="v4z-0p3" />
                    <span data-oid="okj01zx">Add DJ</span>
                  </button>
                </div>

                {/* Specials */}
                <div className={sectionSpacing} data-oid="u76hruk">
                  <h3 className="text-xl font-cyber text-neon-green">Specials</h3>
                  {specials.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-brand-black/50 border border-neon-green/20 rounded-lg" data-oid="c22.how">
                      <input
                        type="text"
                        placeholder={`Special ${i + 1}`}
                        value={s}
                        onChange={(e) => updateItem(specials, i, e.target.value, setSpecials)}
                        className={`${box} flex-1`}
                        required={i === 0 && specials.length === 1 ? true : (i === 0 ? true : false)} // Original required={!i}
                        data-oid="yrnqbk6"
                      />
                      {specials.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(specials, i, setSpecials)}
                          className="p-2 text-neon-green/70 hover:text-red-500 transition-colors rounded-md hover:bg-red-500/10"
                          aria-label="Remove Special"
                          data-oid="dhizmp3"
                        >
                          <Trash2 size={20} data-oid="y6un:bc" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem(specials, setSpecials)}
                    className={`${btn} w-full sm:w-auto`} // Responsive width
                    data-oid="c3pvdgr"
                  >
                    <PlusCircle size={20} data-oid="-jdin.a" />
                    <span data-oid="h5h3_6a">Add Special</span>
                  </button>
                </div>
              </div>

              {/* Submit Button - outside scrollable area */}
              <div className="mt-auto pt-6"> {/* Ensures button is at the bottom, pt-6 for spacing */}
                <button
                  type="submit"
                  className="w-full border-2 border-neon-green rounded-xl py-3.5 text-center text-neon-green hover:bg-neon-green hover:text-brand-black active:bg-neon-green/90 transition-all duration-200 font-cyber text-xl"
                  data-oid="j4lpfui"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* CSS for custom scrollbar (optional, but enhances themed UI) */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 255, 0, 0.05); /* Subtle neon green tint */
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00ff00; /* neon-green */
          border-radius: 4px;
          border: 1px solid rgba(0,0,0,0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00dd00; /* slightly darker neon-green */
        }
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #00ff00 rgba(0, 255, 0, 0.05); /* neon-green thumb, tinted track */
        }
      `}</style>
    </div>
  );
}