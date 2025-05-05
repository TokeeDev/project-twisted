// src/app/admin/dashboard/page.tsx
"use client";

import Link from "next/link";
import { CalendarPlus, Coffee } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div
      className="min-h-screen bg-twisted-darker text-white"
      data-oid="76n-qoh"
    >
      <div className="container mx-auto py-12 px-4" data-oid="k_zz0jp">
        <h1
          className="text-3xl font-bold mb-8 text-twisted-neon"
          data-oid="s0p30xq"
        >
          Admin Dashboard
        </h1>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          data-oid="i573urn"
        >
          <Link href="/admin/create-event" data-oid="wm1h0:g">
            <div
              className="bg-twisted-dark p-8 rounded-lg border border-twisted-neon/30 hover:border-twisted-neon transition-colors"
              data-oid="a61ks.s"
            >
              <div className="flex items-center gap-4 mb-4" data-oid="y8erkn:">
                <CalendarPlus
                  size={32}
                  className="text-twisted-neon"
                  data-oid="by_3-8p"
                />

                <h2 className="text-2xl font-semibold" data-oid="crcx0i1">
                  Create Event
                </h2>
              </div>
              <p className="text-gray-300" data-oid="57teqsy">
                Add a new event with title, date, time, image, DJs, and
                specials.
              </p>
            </div>
          </Link>

          <Link href="/admin/create-menu-item" data-oid="p3nrhsf">
            <div
              className="bg-twisted-dark p-8 rounded-lg border border-twisted-neon/30 hover:border-twisted-neon transition-colors"
              data-oid="b25brhh"
            >
              <div className="flex items-center gap-4 mb-4" data-oid="lky.wl.">
                <Coffee
                  size={32}
                  className="text-twisted-neon"
                  data-oid="ccii22_"
                />

                <h2 className="text-2xl font-semibold" data-oid="522.dh4">
                  Create Menu Item
                </h2>
              </div>
              <p className="text-gray-300" data-oid="19ia2cv">
                Add a new drink or food item with name, description, price, and
                image.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
