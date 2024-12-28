import prisma from "../../../../lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Ambil semua pengguna dari database
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    }

    if (req.method === "POST") {
      // Tambahkan pengguna baru ke database
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
      }

      const newUser = await prisma.user.create({
        data: { name, email },
      });
      return res.status(201).json(newUser);
    }

    // Metode HTTP tidak diizinkan
    res.setHeader("Allow", ["GET", "POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
