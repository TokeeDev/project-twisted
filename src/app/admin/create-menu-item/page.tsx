// (Menu item creation form)
// src/app/admin/create-menu-item/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@uploadthing/react";
import { toast } from "react-hot-toast";
import { DollarSign, Image, Type, AlignLeft, Coffee } from "lucide-react";
// Corrected import path for OurFileRouter, assuming it's in the standard App Router location
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import type { ClientUploadedFileData } from "uploadthing/types"; // Added import for ClientUploadedFileData

export default function CreateMenuItem() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "drink", // Default category
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Corrected typo: preventDefault

    if (!form.imageUrl) {
      toast.error("Please upload an item image");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/menu-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to create menu item");
      }

      toast.success("Menu item created successfully!");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error creating menu item:", error);
      toast.error("Failed to create menu item");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-twisted-darker text-white"
      data-oid="h-j3e8s"
    >
      <div className="container mx-auto py-12 px-4" data-oid="mnz9gmf">
        <h1
          className="text-3xl font-bold mb-8 text-twisted-neon"
          data-oid="s6s:k2."
        >
          Create Menu Item
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl bg-twisted-dark p-8 rounded-lg border border-twisted-neon/30"
          data-oid="t-hxo3b"
        >
          <div className="space-y-6" data-oid="15ry_0j">
            {/* Name Field */}
            <div data-oid="m74mgga">
              <label
                className="flex items-center gap-2 mb-2 font-medium"
                data-oid="vht.b5e"
              >
                <Type
                  size={18}
                  className="text-twisted-neon"
                  data-oid="i0r7le8"
                />
                Item Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-twisted-darker border border-gray-700 rounded-md p-3 focus:border-twisted-neon focus:outline-none focus:ring-1 focus:ring-twisted-neon"
                data-oid="lfv4rbc"
              />
            </div>

            {/* Description Field */}
            <div data-oid="yrd8vs4">
              <label
                className="flex items-center gap-2 mb-2 font-medium"
                data-oid="p8v7k5v"
              >
                <AlignLeft
                  size={18}
                  className="text-twisted-neon"
                  data-oid="kzk80_j"
                />
                Description (optional)
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full bg-twisted-darker border border-gray-700 rounded-md p-3 focus:border-twisted-neon focus:outline-none focus:ring-1 focus:ring-twisted-neon"
                data-oid="1n2b4mi"
              />
            </div>

            {/* Price & Category Row */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              data-oid="93km_c-"
            >
              <div data-oid="04kqr_6">
                <label
                  className="flex items-center gap-2 mb-2 font-medium"
                  data-oid="mp.tyc8"
                >
                  <DollarSign
                    size={18}
                    className="text-twisted-neon"
                    data-oid="ctjby3j"
                  />
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. $12"
                  className="w-full bg-twisted-darker border border-gray-700 rounded-md p-3 focus:border-twisted-neon focus:outline-none focus:ring-1 focus:ring-twisted-neon"
                  data-oid="mf9g6cg"
                />
              </div>
              <div data-oid="od7xzu0">
                <label
                  className="flex items-center gap-2 mb-2 font-medium"
                  data-oid="d3ip4u1"
                >
                  <Coffee
                    size={18}
                    className="text-twisted-neon"
                    data-oid=":-ay:8j"
                  />
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-twisted-darker border border-gray-700 rounded-md p-3 focus:border-twisted-neon focus:outline-none focus:ring-1 focus:ring-twisted-neon"
                  data-oid="nt_15-6"
                >
                  <option value="drink" data-oid="sj0804j">
                    Drink
                  </option>
                  <option value="food" data-oid="mx81tki">
                    Food
                  </option>
                  <option value="special" data-oid="omffz58">
                    Special
                  </option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div data-oid="0zkdrab">
              <label
                className="flex items-center gap-2 mb-2 font-medium"
                data-oid="vx:6a.w"
              >
                <Image
                  size={18}
                  className="text-twisted-neon"
                  data-oid="nzwfvfp"
                />
                Item Image
              </label>

              {form.imageUrl ? (
                <div
                  className="relative w-full max-w-[200px] aspect-square rounded-lg border-2 border-twisted-neon overflow-hidden"
                  data-oid="5r7pwo5"
                >
                  <img
                    src={form.imageUrl}
                    alt="Item preview"
                    className="object-cover w-full h-full"
                    data-oid="cb-6_pk"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, imageUrl: "" }))
                    }
                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                    data-oid="4m-l_9l"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                // Corrected UploadButton generics and endpoint to use "imageUploader"
                <UploadButton<OurFileRouter, "imageUploader">
                  endpoint="imageUploader"
                  // Typed 'res' parameter
                  onClientUploadComplete={(res: ClientUploadedFileData<{ uploadedBy: string; }>[]) => {
                    // It's good practice to check if res is not empty
                    if (res && res.length > 0) {
                        setForm((prev) => ({ ...prev, imageUrl: res[0].url }));
                        toast.success("Image uploaded successfully!");
                    } else {
                        toast.error("Image upload completed but no URL received.");
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`Error uploading: ${error.message}`);
                  }}
                  className="ut-button:bg-twisted-neon ut-button:hover:bg-twisted-neon/80 ut-allowed-content:text-white"
                  data-oid="lanmge2"
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !form.imageUrl}
              className="w-full bg-twisted-neon hover:bg-twisted-neon/80 text-black font-medium py-3 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              data-oid="wen5_mj"
            >
              {isSubmitting ? "Creating Item..." : "Create Menu Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}