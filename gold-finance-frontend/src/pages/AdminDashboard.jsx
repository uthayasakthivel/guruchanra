import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../auth/firebase";
import UserList from "../components/UserList";
import PendingApprovals from "./PendingApprovals";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsers();
  }, []);

  const managers = users.filter((u) => u.role === "manager");
  const employees = users.filter((u) => u.role === "employee");

  return (
    <DashboardLayout role="admin">
      <PendingApprovals />
      <UserList users={managers} title="All Managers" />
      <UserList users={employees} title="All Employees" />
    </DashboardLayout>
  );
}
