export interface MenuItem {
    id: string; // Add id based on Prisma schema
    category?: string | null; // Make category optional to match Prisma schema
    imageUrl?: string | null; // Align imageUrl type
    name: string;
    description: string;
    price: string;

}

export interface MenuData {
    [category: string]: MenuItem[];
}