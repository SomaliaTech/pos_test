import OrderHistoryCard from "../../../components/dashboards/order-history/OrderHistoryCard";
import LeftMenu from "../../../components/shared/LeftMenu";

function OrderHistory() {
  return (
    <section className="bg-[#E7EAE7]  h-screen tex- overflow-hidden flex gap-3">
      <div className="w-20 md:w-60 flex-shring-0">
        <LeftMenu />
      </div>
      <div className="flex-1 mx-auto mr-9 mt-12">
        <OrderHistoryCard />
      </div>
    </section>
  );
}
export default OrderHistory;
