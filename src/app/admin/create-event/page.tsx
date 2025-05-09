// app/admin/create-event/page.tsx
"use client";

import React, { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import "@uploadthing/react/styles.css";
import Image from "next/image";
import { PlusCircle, Trash2 } from "lucide-react";

export default function CreateEventPage() {
  // --- State ---
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [djs, setDjs] = useState([""]);
  const [specials, setSpecials] = useState([""]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // --- Handlers ---
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

  // --- Common Neon styles ---
  const box =
    "border-2 border-neon-green rounded-xl px-4 py-2 text-neon-green bg-transparent placeholder-neon-green/50 focus:outline-none";
  const btn =
    "flex items-center justify-center space-x-2 border-2 border-neon-green rounded-xl px-4 py-2 text-neon-green hover:bg-neon-green/10 transition";
  const section = "space-y-4";

  return (
    <div
      className="pt-20 h-screen w-screen bg-brand-black overflow-hidden flex flex lg:flex-row"
      data-oid="vtlhkpu"
    >
      {/* Left: Image Upload (50% width on desktop) */}
      <div
        className="w-full lg:w-1/3 h-full p-6 flex flex-col"
        data-oid="q74w:df"
      >
        <div
          className="relative flex-grow border-2 border-neon-green rounded-xl flex items-center justify-center overflow-hidden"
          data-oid="35k0qkv"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Preview"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-xl"
              data-oid="ua_mo64"
            />
          ) : (
            <span className="text-neon-green/50 text-xl" data-oid="jl5k_91">
              9:16
            </span>
          )}
        </div>
        <div className="mt-4" data-oid="cybojh.">
          <UploadButton<OurFileRouter, "imageUploader">
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res?.[0]?.url) setImageUrl(res[0].url);
            }}
            onUploadError={(err) => alert(err.message)}
            className="ut-button:border-neon-green ut-button:text-neon-green ut-button:hover:bg-neon-green/10"
            data-oid="0lqnwza"
          />
        </div>
      </div>

      {/* Right: Form Inputs (50% width on desktop) */}
      <div
        className="w-full lg:w-1/2 h-full p-6 overflow-y-auto"
        data-oid=".2tjmjj"
      >
        <form
          onSubmit={handleSubmit}
          className="h-full flex flex-col"
          data-oid="3-b78ef"
        >
          <div className="flex-grow space-y-6" data-oid="4ierv1a">
            {/* Title */}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${box} w-full text-lg font-cyber`}
              required
              data-oid="l-kfekx"
            />

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4" data-oid="qmo2y1k">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={box}
                required
                data-oid="fz15hoh"
              />

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={box}
                data-oid="4fcv7lr"
              />
            </div>

            {/* DJs */}
            <div className={section} data-oid="lnkm1gu">
              {djs.map((dj, i) => (
                <div key={i} className="flex gap-2" data-oid="zik..6w">
                  <input
                    type="text"
                    placeholder="DJs"
                    value={dj}
                    onChange={(e) => updateItem(djs, i, e.target.value, setDjs)}
                    className={`${box} flex-1`}
                    required={!i}
                    data-oid="rvatiz_"
                  />

                  {djs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(djs, i, setDjs)}
                      className="text-neon-green"
                      data-oid="jtef.xm"
                    >
                      <Trash2 data-oid="jye.z58" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem(djs, setDjs)}
                className={btn}
                data-oid="tonb5o4"
              >
                <PlusCircle data-oid="v4z-0p3" />
                <span data-oid="okj01zx">Add DJ</span>
              </button>
            </div>

            {/* Specials */}
            <div className={section} data-oid="u76hruk">
              {specials.map((s, i) => (
                <div key={i} className="flex gap-2" data-oid="c22.how">
                  <input
                    type="text"
                    placeholder="Specials"
                    value={s}
                    onChange={(e) =>
                      updateItem(specials, i, e.target.value, setSpecials)
                    }
                    className={`${box} flex-1`}
                    required={!i}
                    data-oid="yrnqbk6"
                  />

                  {specials.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(specials, i, setSpecials)}
                      className="text-neon-green"
                      data-oid="dhizmp3"
                    >
                      <Trash2 data-oid="y6un:bc" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem(specials, setSpecials)}
                className={btn}
                data-oid="c3pvdgr"
              >
                <PlusCircle data-oid="-jdin.a" />
                <span data-oid="h5h3_6a">Add Special</span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-6 border-2 border-neon-green rounded-xl py-3 text-center text-neon-green hover:bg-neon-green/10 transition font-cyber text-lg"
            data-oid="j4lpfui"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
