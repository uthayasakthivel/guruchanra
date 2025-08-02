import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../auth/firebase";
import { useToast } from "../components/ToastContext";

export default function PendingApprovals() {
  const [users, setUsers] = useState([]);
  const [roleSelections, setRoleSelections] = useState({});
  const { showToast } = useToast();

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const allUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(allUsers);
      // Initialize role selections for pending users
      const pending = allUsers.filter((u) => !u.approved);
      const roles = {};
      pending.forEach((u) => {
        roles[u.id] = u.role || "employee";
      });
      setRoleSelections(roles);
    } catch (error) {
      console.error("Error fetching users:", error);
      showToast("Failed to load users.", "error");
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setRoleSelections((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  const handleApprove = async (userId) => {
    const selectedRole = roleSelections[userId] || "employee";
    try {
      await updateDoc(doc(db, "users", userId), {
        approved: true,
        role: selectedRole,
      });
      showToast("User approved", "success");
      fetchUsers();
    } catch (err) {
      console.error(err);
      showToast("Approval failed", "error");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteDoc(doc(db, "users", userId));
      showToast("User deleted", "success");
      fetchUsers();
    } catch (err) {
      console.error(err);
      showToast("Delete failed", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const pendingUsers = users.filter((u) => !u.approved);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
      {pendingUsers.length === 0 ? (
        <p className="text-gray-600">No users pending approval.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.map((user) => (
                <tr key={user.id} className="bg-white">
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border capitalize">
                    <select
                      value={roleSelections[user.id] || "employee"}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                    </select>
                  </td>
                  <td className="p-2 border">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(user.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
