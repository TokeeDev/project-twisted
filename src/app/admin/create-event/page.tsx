// src/app/admin/create-event/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@uploadthing/react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { Calendar, Clock, Image, Music, Tag } from "lucide-react";
// Change this line in your create-event page
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export default function CreateEvent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "20:00",
    djs: "",
    specials: "",
    imageUrl: "",
    featured: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.imageUrl) {
      toast.error("Please upload an event image");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      toast.success("Event created successfully!");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-twisted-darker text-white"
      data-oid="pu7yi72"
    >
      <div className="container mx-auto py-12 px-4" data-oid="nwd8rf6">
        <h1
          className="text-3xl font-bold mb-8 text-twisted-neon"
          data-oid="vb9zkcn"
        >
          Create New Event
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl bg-twisted-dark p-8 rounded-lg border border-twisted-neon/30"
          data-oid="fc:i-md"
        >
          <div className="space-y-6" data-oid="_144tc:">
            {/* Title Field */}
            <div data-oid="q49c99y">
              <label
                className="flex items-center gap-2 mb-2 font-medium"
                data-oid="00psvw5"
              >
                <Tag
                  size={18}
                  className="text-twisted-neon"
                  data-oid="mgm4smb"
                />
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full bg-twisted-darker border border-gray-700 rounded-md p-3 focus:border-twisted-neon focus:outline-none focus:ring-1 focus:ring-twisted-neon"
                data-oid="vw-joty"
              />
            </div>

            {/* Date & Time Row */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              data-oid="sz9kq-g"
            >
              <div data-oid="kcg_xe5">
                <label
                  className="flex items-center gap-2 mb-2 font-medium"
                  data-oid="na98q.:"
                >
                  <Calendar
                    size={18}
                    className="text-twisted-neon"
                    data-oid="yy3hety"
                  />
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-twisted-darker border border-gray-700 rounded-md p-3 focus:border-twisted-neon focus:outline-none focus:ring-1 focus:ring-twisted-neon"
                  data-oid="a:eljch"
                />
              </div>
              <div data-oid="z12p880">
                <label
                  className="flex items-center gap-2 mb-2 font-medium"
                  data-oid=":9rxrxe"
                >
                  <Clock
                    size={18}
                    className="text-twisted-neon"
                    data-oid="8390:m9"
                  />
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full bg-twisted-darker border border-gray-700 rounded-md p-3 focus:border-twisted-neon focus:outline-none focus:ring-1 focus:ring-twisted-neon"
                  data-oid="zt2_hy-"
                />
              </div>
            </div>

            {/* DJs Field */}
            <div data-oid="px.tp.8">
              <label
                className="flex items-center gap-2 mb-2 font-medium"
                data-oid="xprk1sq"
              >
                <Music
                  size={18}
                  className="text-twisted-neon"
                  data-oid="o3s8egy"
                />
                DJs (optional)
              </label>
              <input
                type="text"
                name="djs"
                value={form.djs}
                onChange={handleChange}
                placeholder="e.g. DJ Alex, DJ Maria"
                className="w-full bg-twisted-darker border border-gray-700 rounded-md p-3 focus:border-twisted-neon focus:outline-none focus:ring-1 focus:ring-twisted-neon"
                data-oid="-6:xz59"
              />
            </div>

            {/* Specials Field */}
            <div data-oid="ceinr-0">
              <label
                className="flex items-center gap-2 mb-2 font-medium"
                data-oid="84dc4b5"
              >
                Specials (optional)
              </label>
              <textarea
                name="specials"
                value={form.specials}
                onChange={handleChange}
                placeholder="e.g. $5 margaritas all night"
                rows={3}
                className="w-full bg-twisted-darker border border-gray-700 rounded-md p-3 focus:border-twisted-neon focus:outline-none focus:ring-1 focus:ring-twisted-neon"
                data-oid="osb_580"
              />
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center gap-2" data-oid="neha6xw">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-4 h-4 bg-twisted-darker border border-gray-700 rounded focus:ring-twisted-neon"
                data-oid="me5_tio"
              />

              <label
                htmlFor="featured"
                className="font-medium"
                data-oid="57f5jt6"
              >
                Set as featured event
              </label>
            </div>

            {/* Image Upload */}
            <div data-oid="5-1tv:y">
              <label
                className="flex items-center gap-2 mb-2 font-medium"
                data-oid="qwfgo6i"
              >
                <Image
                  size={18}
                  className="text-twisted-neon"
                  data-oid="hm.nvmw"
                />
                Event Image
              </label>

              {form.imageUrl ? (
                <div
                  className="relative w-full max-w-[280px] aspect-[9/16] rounded-[32px] border-2 border-twisted-neon overflow-hidden"
                  data-oid="ct5yyn7"
                >
                  <img
                    src={form.imageUrl}
                    alt="Event preview"
                    className="object-cover w-full h-full"
                    data-oid="u5gmfrj"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, imageUrl: "" }))
                    }
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                    data-oid="yx2cvdx"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <UploadButton<OurFileRouter>
                  endpoint="eventImage"
                  onClientUploadComplete={(res) => {
                    setForm((prev) => ({ ...prev, imageUrl: res[0].url }));
                    toast.success("Image uploaded successfully!");
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`Error uploading: ${error.message}`);
                  }}
                  className="ut-button:bg-twisted-neon ut-button:hover:bg-twisted-neon/80 ut-allowed-content:text-white"
                  data-oid="vyyx.1k"
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !form.imageUrl}
              className="w-full bg-twisted-neon hover:bg-twisted-neon/80 text-black font-medium py-3 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              data-oid="tl5:fkt"
            >
              {isSubmitting ? "Creating Event..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
