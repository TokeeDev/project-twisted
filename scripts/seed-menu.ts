// scripts/seed-menu.ts
import { PrismaClient } from '@prisma/client';
import { menuData } from '../src/data/menu-data.js'; // Adjust path as needed, added .js extension for ESM compatibility

const prisma = new PrismaClient();

async function main() {
  console.log('Starting menu data seeding...');

  const itemsToCreate = [];

  for (const [category, items] of Object.entries(menuData)) {
    console.log(`Processing category: ${category}`);
    for (const item of items) {
      // Basic validation or transformation if needed
      if (!item.name || !item.price) {
        console.warn(`Skipping item due to missing name or price: ${JSON.stringify(item)}`);
        continue;
      }
      itemsToCreate.push({
        name: item.name,
        description: item.description || null,
        price: item.price, // Assuming price is already a string as per schema
        category: category,
        // imageUrl will be null by default as it's not in the static data
      });
    }
  }

  if (itemsToCreate.length > 0) {
    try {
      // Delete existing items first to avoid duplicates if script is run multiple times
      // Use a transaction if you need atomicity
      console.log('Deleting existing menu items...');
      await prisma.menuItem.deleteMany({}); // Clear the table before seeding

      console.log(`Creating ${itemsToCreate.length} menu items...`);
      const result = await prisma.menuItem.createMany({
        data: itemsToCreate,
        skipDuplicates: true, // Skip if an item with the same unique constraint already exists (though deleteMany should prevent this)
      });
      console.log(`Successfully created ${result.count} menu items.`);
    } catch (error) {
      console.error('Error seeding menu data:', error);
      process.exit(1); // Exit with error code
    }
  } else {
    console.log('No valid menu items found in static data to seed.');
  }

  console.log('Menu data seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });