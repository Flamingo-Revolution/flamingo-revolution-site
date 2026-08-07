import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { ideas } from "./data/ideas";

const connectionString = process.env.DIRECT_URL;
if (!connectionString) {
  throw new Error("DIRECT_URL is required to seed the database");
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

async function main() {
	const date = new Date();

  const result = await prisma.idea.createMany({
    data: ideas.map((content, index) => ({
      content,
      submitterHash: `seed:${index}`,
			createdAt: new Date(date.setTime(index * 1000)).toISOString(),
    })),
  });

  console.log(`Seeded ${result.count} ideas`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
