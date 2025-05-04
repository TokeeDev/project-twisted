"use client"
import Link from 'next/link';
import { Utensils, Calendar } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-twisted-neon">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Link to Menu Management */}
          <Link href="/admin/menu">
            <div className="block p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-twisted-neon transition duration-200 cursor-pointer">
              <div className="flex items-center mb-3">
                <Utensils className="w-8 h-8 mr-3 text-twisted-neon" />
                <h2 className="text-xl font-semibold">Manage Menu Items</h2>
              </div>
              <p className="text-gray-400 text-sm">Add, edit, or remove items from the restaurant menu.</p>
            </div>
          </Link>

          {/* Link to Event Management */}
          <Link href="/admin/events">
            <div className="block p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-twisted-neon transition duration-200 cursor-pointer">
              <div className="flex items-center mb-3">
                <Calendar className="w-8 h-8 mr-3 text-twisted-neon" />
                <h2 className="text-xl font-semibold">Manage Events</h2>
              </div>
              <p className="text-gray-400 text-sm">Create, update, or delete upcoming events and specials.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}