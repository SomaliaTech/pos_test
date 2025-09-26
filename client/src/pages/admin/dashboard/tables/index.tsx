import DashboardHero from "../../../../components/admin/DashboardHero";
import AdminSidebar from "../../../../components/admin/sidebar/AdminSidebar";
import Orders from "../../../../components/order/orders";

function TableAdminDashboard() {
  return (
    <div>
      <div className="flex ">
        <div className="sm:w-[15%] w-1/5 overflow-auto">
          <AdminSidebar />
        </div>
        <div className="w-[85%] bg-[#e9eae7]">
          <DashboardHero />
          <Orders />
        </div>
      </div>
    </div>
  );
}
export default TableAdminDashboard;
