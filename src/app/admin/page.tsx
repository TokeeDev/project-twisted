"use client";
import Link from "next/link";
import { Utensils, Calendar } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8" data-oid="fjizw5d">
      <div className="container mx-auto max-w-4xl" data-oid="2kbacqw">
        <h1
          className="text-3xl font-bold mb-8 text-center text-twisted-neon"
          data-oid="ljzocdb"
        >
          Admin Dashboard
        </h1>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          data-oid="yc6y17x"
        >
          {/* Link to Menu Management */}
          <Link href="/admin/menu" data-oid="m.5kq-d">
            <div
              className="block p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-twisted-neon transition duration-200 cursor-pointer"
              data-oid="y9d2n.4"
            >
              <div className="flex items-center mb-3" data-oid="hhlmwd3">
                <Utensils
                  className="w-8 h-8 mr-3 text-twisted-neon"
                  data-oid="ezbgzvs"
                />

                <h2 className="text-xl font-semibold" data-oid="cq7gpf6">
                  Manage Menu Items
                </h2>
              </div>
              <p className="text-gray-400 text-sm" data-oid="7gndbc.">
                Add, edit, or remove items from the restaurant menu.
              </p>
            </div>
          </Link>

          {/* Link to Event Management */}
          <Link href="/admin/events" data-oid="b_x-w8n">
            <div
              className="block p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-twisted-neon transition duration-200 cursor-pointer"
              data-oid="w8edzgm"
            >
              <div className="flex items-center mb-3" data-oid="km2kg0_">
                <Calendar
                  className="w-8 h-8 mr-3 text-twisted-neon"
                  data-oid="8zpbaf:"
                />

                <h2 className="text-xl font-semibold" data-oid="0-gaejc">
                  Manage Events
                </h2>
              </div>
              <p className="text-gray-400 text-sm" data-oid="hr3kv5-">
                Create, update, or delete upcoming events and specials.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
