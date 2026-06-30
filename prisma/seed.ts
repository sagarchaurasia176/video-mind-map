import "dotenv/config";
import { auth } from "../lib/auth/auth.js";
import { prisma } from "../lib/prisma.js";

async function main() {
  console.log("🌱 Starting database seed...");

  // Create Guest user
  const guestEmail = "guest@gmail.com"; // better-auth converts to lowercase
  const guestPassword = "Guest@gmail.com";

  // Check if guest already exists
  const existingGuest = await prisma.user.findUnique({
    where: { email: guestEmail },
  });

  if (existingGuest) {
    console.log("✅ Guest user already exists");
    console.log(`   Email: ${guestEmail}`);
    console.log(`   Password: ${guestPassword}`);
  } else {
    // Create guest user through better-auth API
    try {
      const response = await auth.api.signUpEmail({
        body: {
          email: guestEmail,
          password: guestPassword,
          name: "Guest User",
        },
      });

      console.log("✅ Guest user created successfully");
      console.log(`   Email: ${guestEmail}`);
      console.log(`   Password: ${guestPassword}`);
      console.log(`   User ID: ${response.user.id}`);
    } catch (error: any) {
      if (error.message?.includes("already exists")) {
        console.log("✅ Guest user already exists");
      } else {
        throw error;
      }
    }
  }

  console.log("🎉 Database seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
