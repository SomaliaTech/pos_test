import Orders from "../../components/order/orders";
import LeftMenu from "../../components/shared/LeftMenu";

function OrderPage() {
  return (
    <section className="bg-[#E7EAE7]  h-screen tex- overflow-hidden flex gap-3">
      <div className="w-1/14">
        <LeftMenu />
      </div>
      <div className="w-1/1 xl:w-full  overflow-y-auto">
        <Orders />
      </div>
    </section>
  );
}
export default OrderPage;
