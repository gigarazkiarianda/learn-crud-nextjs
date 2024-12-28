import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UseForm from "../../../components/UserForm";

export default function EditUser() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Mengambil ID pengguna dari URL

  // Fungsi untuk mengambil data pengguna berdasarkan ID
  useEffect(() => {
    if (id) {
      fetch(`/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [id]);

  // Fungsi untuk menangani pembaruan data pengguna
  const handleUpdate = async (data) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update user");
      }

      // Jika berhasil, arahkan kembali ke halaman utama
      router.push("/");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  if (!user) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Edit User</h1>

        <UseForm
          initialValues={{ name: user.name, email: user.email }}
          onSubmit={handleUpdate}
          submitLabel="Update User"
          isEditMode={true} // Mengaktifkan mode edit
        />
      </div>
    </div>
  );
}
