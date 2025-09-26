import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";
import DashboardHero from "../../components/admin/DashboardHero";
import DashBoardCountent from "../../components/admin/DashBoardCountent";

function AdminPage() {
  return (
    <div>
      {/* <TeacherProtected> */}
      {/* <Heading
          keywords="new course somalia, koorso cusub, Elearning webiste "
          title="Teacher Adminstrator"
          description="Best Teaching Tech in somaalia Website"
        /> */}
      <div className="flex ">
        <div className="sm:w-[15%] w-1/5 overflow-auto">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero />
          <DashBoardCountent />
        </div>
      </div>
      {/* </TeacherProtected> */}
    </div>
  );
}

export default AdminPage;
