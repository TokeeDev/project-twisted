"use client";
import Link from "next/link";
import { Utensils, Calendar } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 mt-20" data-oid="oq5dt1v">
      <div className="container mx-auto max-w-4xl" data-oid="tj:52.t">
        <h1
          className="text-3xl font-bold mb-8 text-center text-twisted-neon"
          data-oid="d4v37b4"
        >
          Admin Dashboard
        </h1>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          data-oid="55w_:u2"
        >
          {/* Link to Menu Management */}
          <Link href="/admin/menu" data-oid="7enmmbz">
            <div
              className="block p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-twisted-neon transition duration-200 cursor-pointer"
              data-oid="3lzep6p"
            >
              <div className="flex items-center mb-3" data-oid="2mfjipe">
                <Utensils
                  className="w-8 h-8 mr-3 text-twisted-neon"
                  data-oid="7malk6z"
                />

                <h2 className="text-xl font-semibold" data-oid="9ok:2d5">
                  Manage Menu Items
                </h2>
              </div>
              <p className="text-gray-400 text-sm" data-oid=":lhm.rr">
                Add, edit, or remove items from the restaurant menu.
              </p>
            </div>
          </Link>

          {/* Link to Event Management */}
          <Link href="/admin/events" data-oid="exgifqu">
            <div
              className="block p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-twisted-neon transition duration-200 cursor-pointer"
              data-oid="9hobbjf"
            >
              <div className="flex items-center mb-3" data-oid="bz4_7s2">
                <Calendar
                  className="w-8 h-8 mr-3 text-twisted-neon"
                  data-oid="qr7ih9j"
                />

                <h2 className="text-xl font-semibold" data-oid="3tyjlh6">
                  Manage Events
                </h2>
              </div>
              <p className="text-gray-400 text-sm" data-oid=".iy2f3b">
                Create, update, or delete upcoming events and specials.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
