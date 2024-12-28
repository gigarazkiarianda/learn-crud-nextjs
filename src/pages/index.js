import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [users, setUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  // Function to handle deletion of a user
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // If the delete was successful, update the user list
        setUsers(users.filter((user) => user.id !== id));
        alert("User deleted successfully.");
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      alert("Error deleting user.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        User List
      </h1>

      <div className="mb-4">
        <Link
          href="/users/create"
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          Create New User
        </Link>
      </div>

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        {users.length === 0 ? (
          <p className="text-center text-gray-600">No users available.</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300"
              >
                <span className="text-lg font-medium text-gray-700">
                  {user.name} - {user.email}
                </span>
                <div className="flex items-center space-x-4">
                  <Link
                    href={`/users/edit/${user.id}`}
                    className="text-blue-500 hover:text-blue-600 transition duration-200"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
