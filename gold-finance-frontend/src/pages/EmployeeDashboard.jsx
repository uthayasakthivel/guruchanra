import DashboardLayout from "../components/DashboardLayout";
import { useState } from "react";
import RatesSection from "../components/RatesSection";
import NavigationTree from "../components/NavigationTree";
import BalanceSection from "../components/BalanceSection";

export default function EmployeeDashboard() {
  const [rates] = useState({
    gold22: "₹5,800/gm",
    gold24: "₹6,300/gm",
    silver: "₹75/gm",
  });

  return (
    <DashboardLayout role="employee">
      <RatesSection rates={rates} />
      <NavigationTree />
      <BalanceSection />
    </DashboardLayout>
  );
}
