// src/pages/AdminDashboard.jsx
import DashboardLayout from "../components/DashboardLayout";
import PendingApprovals from "./PendingApprovals";

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      {/* This will be placed *inside* the layout */}
      <PendingApprovals />
    </DashboardLayout>
  );
}
