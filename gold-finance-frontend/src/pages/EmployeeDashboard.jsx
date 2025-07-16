import DashboardLayout from "../components/DashboardLayout";

export default function EmployeeDashboard() {
  return (
    <DashboardLayout role="employee">
      <div className="bg-green-100 border p-4 rounded">
        <p>
          👷 Welcome to the employee dashboard. Work-related content goes here.
        </p>
      </div>
    </DashboardLayout>
  );
}
