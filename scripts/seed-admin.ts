import bcrypt from "bcryptjs";

const adminUsername = process.env.ADMIN_USERNAME ?? "admin";
const adminEmail = process.env.ADMIN_EMAIL ?? "admin@example.com";
const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

async function seedAdmin() {
  const hash = await bcrypt.hash(adminPassword, 12);
  console.log("Seeded admin configuration:");
  console.log({ adminUsername, adminEmail, hash });
}

void seedAdmin();
