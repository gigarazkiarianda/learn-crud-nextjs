import prisma from "../../../../lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // Ambil pengguna berdasarkan ID
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    }

    if (req.method === "PUT") {
      // Perbarui data pengguna berdasarkan ID
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
      }

      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { name, email },
      });

      return res.status(200).json(updatedUser);
    }

    if (req.method === "DELETE") {
      // Hapus pengguna berdasarkan ID
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });

      return res.status(204).end(); // Tidak ada konten yang dikembalikan
    }

    // Metode HTTP tidak diizinkan
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
