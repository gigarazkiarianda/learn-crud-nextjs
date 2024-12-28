import { useRouter } from "next/router";
import UseForm from "../../components/UserForm";

export default function CreateUser() {
  const router = useRouter();

  // Fungsi untuk menangani pembuatan user baru
  const handleCreate = async (data) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create user");
      }

      // Jika berhasil, arahkan ke halaman utama
      router.push("/");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create New User
        </h1>
        <UseForm
          initialValues={{ name: "", email: "" }}
          onSubmit={handleCreate}
          submitLabel="Create User"
        />
      </div>
    </div>
  );
}
