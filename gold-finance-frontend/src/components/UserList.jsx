import React from "react";

export default function UserList({ users, title }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <table className="w-full text-left border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-white">
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
