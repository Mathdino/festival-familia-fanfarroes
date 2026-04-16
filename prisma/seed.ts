import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create sample schedules
  await prisma.schedule.createMany({
    data: [
      {
        round: "Jogo 1",
        time: "08:00",
        teamA: "Time A",
        teamB: "Time B",
        date: "2026-07-12",
      },
      {
        round: "Jogo 2",
        time: "08:50",
        teamA: "Time C",
        teamB: "Time D",
        date: "2026-07-12",
      },
      {
        round: "Jogo 3",
        time: "09:40",
        teamA: "Time E",
        teamB: "Time F",
        date: "2026-07-12",
      },
    ],
    skipDuplicates: true,
  });

  // Create sample team if it doesn't exist
  // We delete and recreate to ensure the player count is exactly 6+9
  await prisma.team.deleteMany({ where: { name: "Os Fanfarrões" } });

  const team = await prisma.team.create({
    data: {
      name: "Os Fanfarrões",
      formation: "Society",
      players: {
        create: [
          { name: "Marcos", number: 1, position: "GK" },
          { name: "João", number: 2, position: "DEF" },
          { name: "Pedro", number: 3, position: "DEF" },
          { name: "André", number: 6, position: "MID" },
          { name: "Carlos", number: 7, position: "MID" },
          { name: "Bruno", number: 9, position: "FWD" },
          { name: "Renato", number: 12, position: "RES" },
          { name: "Diego", number: 10, position: "RES" },
          { name: "Felipe", number: 8, position: "RES" },
          { name: "Rafael", number: 5, position: "RES" },
          { name: "Thiago", number: 13, position: "RES" },
          { name: "Lucas", number: 14, position: "RES" },
          { name: "Gabriel", number: 15, position: "RES" },
          { name: "Mateus", number: 16, position: "RES" },
          { name: "Vitor", number: 17, position: "RES" },
        ],
      },
      payment: {
        create: { status: "HALF_PAID" },
      },
    },
  });

  console.log(`✅ Created team: ${team.name}`);
  console.log("✅ Seeding complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
