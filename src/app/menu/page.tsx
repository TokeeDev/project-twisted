"use client";

import { useState, useEffect, useRef } from "react"; // Import useEffect and useRef
import MenuHero from "@/components/menu/MenuHero";
import { MenuSection } from "@/components/menu/menu-section";
import MenuItemModal from "@/components/menu/MenuItemModal";
import type { MenuItem } from "@/types/menu";
import { Loader2, Search } from "lucide-react"; // Import Loader and Search icons
import { Input } from "@/components/ui/input"; // Import Input component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Select components

// Define the structure for categorized menu data
interface CategorizedMenuData {
  [category: string]: MenuItem[];
}

export default function MenuPage() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categorizedMenu, setCategorizedMenu] = useState<CategorizedMenuData>(
    {},
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredMenu, setFilteredMenu] = useState<CategorizedMenuData>({}); // State for filtered results
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({}); // Refs for scrolling

  // Fetch menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/menu-items");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const items: MenuItem[] = await response.json();

        // Group items by category
        const groupedData = items.reduce((acc, item) => {
          const category = item.category || "Uncategorized"; // Default category if none provided
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {} as CategorizedMenuData);

        setCategorizedMenu(groupedData);
        setFilteredMenu(groupedData); // Initialize filtered menu with all data
      } catch (err) {
        console.error("Failed to fetch menu items:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []); // Empty dependency array ensures this runs once on mount

  // Filter menu items based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredMenu(categorizedMenu); // Reset to full menu if search is empty
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = Object.entries(categorizedMenu).reduce(
      (acc, [category, items]) => {
        const matchingItems = items.filter(
          (item) =>
            item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.description?.toLowerCase().includes(lowerCaseSearchTerm),
        );
        if (matchingItems.length > 0) {
          acc[category] = matchingItems;
        }
        return acc;
      },
      {} as CategorizedMenuData,
    );

    setFilteredMenu(filtered);
  }, [searchTerm, categorizedMenu]);

  const handleOpenModal = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  // Handle category selection for scrolling
  const handleCategoryChange = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const menuCategories = Object.keys(categorizedMenu);

  return (
    <div
      className="min-h-screen bg-black text-white font-sans"
      data-oid="6mxzn5u"
    >
      <MenuHero data-oid="8te2s1c" />

      <div
        className="container mx-auto px-4 sm:px-6 py-16 md:py-24"
        data-oid="9xy2i_u"
      >
        {/* Search and Navigation Section - Centered Layout */}
        {!isLoading && !error && Object.keys(categorizedMenu).length > 0 && (
          <div
            className="mb-12 flex flex-col items-center gap-6"
            data-oid="4fajlt0"
          >
            {" "}
            {/* Centered column layout with gap */}
            {/* Search Input - Centered */}
            <div className="relative w-full max-w-md" data-oid="8uamhwg">
              {" "}
              {/* Control max width */}
              <Input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black border-2 border-gray-700 text-white placeholder:text-gray-500 focus:border-twisted-neon focus:ring-1 focus:ring-twisted-neon rounded-lg shadow-md focus:shadow-lg focus:shadow-twisted-neon/30 transition-all duration-300"
                data-oid="ank6dqg"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 peer-focus:text-twisted-neon transition-colors duration-300"
                data-oid="_b3bu95"
              />
            </div>
            {/* Category Dropdown - Centered Below Search */}
            <div className="w-full max-w-xs" data-oid="qbxcu:b">
              {" "}
              {/* Control max width */}
              <Select onValueChange={handleCategoryChange} data-oid="1bwy:6s">
                <SelectTrigger
                  className="w-full bg-black border-2 border-gray-700 text-white focus:border-twisted-neon focus:ring-1 focus:ring-twisted-neon rounded-lg shadow-md data-[state=open]:shadow-lg data-[state=open]:shadow-twisted-neon/30 transition-all duration-300"
                  data-oid="6_c7o4r"
                >
                  <SelectValue
                    placeholder="Go to section..."
                    data-oid="qf8kd.n"
                  />
                </SelectTrigger>
                <SelectContent
                  className="bg-black border-2 border-gray-700 text-white rounded-lg shadow-xl"
                  data-oid="24a8q2:"
                >
                  {menuCategories.map((category) => {
                    const categoryId = category
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    return (
                      <SelectItem
                        key={categoryId}
                        value={categoryId}
                        className="cursor-pointer hover:bg-twisted-neon/20 focus:bg-twisted-neon/30 data-[state=checked]:bg-twisted-neon/40 data-[state=checked]:text-twisted-neon transition-colors duration-200"
                        data-oid="8gxdghf"
                      >
                        {category}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Menu Sections */}
        <div className="space-y-12 md:space-y-16" data-oid="-eu5gmv">
          {isLoading ? (
            <div
              className="flex justify-center items-center h-64"
              data-oid="h:byqcl"
            >
              <Loader2
                className="h-12 w-12 animate-spin text-twisted-neon"
                data-oid="wi9w5yf"
              />

              <p className="ml-4 text-xl" data-oid="wg_d6sf">
                Loading Menu...
              </p>
            </div>
          ) : error ? (
            <div
              className="text-center text-red-400 border border-red-600 bg-red-900/30 p-4 rounded-md"
              data-oid="tulotcb"
            >
              <p data-oid="6.d-0s-">Error loading menu: {error}</p>
              <p data-oid=".0n2pop">Please try refreshing the page.</p>
            </div>
          ) : Object.keys(filteredMenu).length === 0 ? (
            <div className="text-center text-gray-400" data-oid="xngurqz">
              <p data-oid="r06npth">
                {searchTerm
                  ? `No items match "${searchTerm}".`
                  : "No menu items available at the moment."}
              </p>
            </div>
          ) : (
            Object.entries(filteredMenu).map(([category, items]) => (
              <MenuSection
                key={category}
                id={category.toLowerCase().replace(/\s+/g, "-")}
                title={category}
                items={items}
                onItemClick={handleOpenModal}
                data-oid="jthz9.t"
              />
            ))
          )}
        </div>
      </div>

      <MenuItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data-oid="mmdi.-0"
      />
    </div>
  );
}
