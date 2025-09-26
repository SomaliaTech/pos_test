import React, { useEffect, useState } from "react";
import { GrRadialSelected } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { axiosIntence } from "../../lib/axiosIntence";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BsBag, BsPersonFill } from "react-icons/bs";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoIosSend, IoMdClose } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import useUserStore from "../../lib/userStore";
import useItemStore from "../../lib/store";

const WelcomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCartModel, setShowCartModel] = useState(false);
  const [cartItem, setCartItem] = useState<any>(); //kani waa
  const [customer, setCustomer] = useState("");
  //   const [addToCart, setAddtoCart] = useState(null);
  const [addedToCartModel, setAddtoCartModel] = useState(false);
  const [selected, setSelected] = useState<any>({});

  const [guestCount, setGuestCount] = useState(1);
  const [activeCategory, setActiveCategory] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [skiped, setSkiped] = useState(false);
  const [itemCount, setItemCount] = useState(1);
  const [itemId, setItemId] = useState("");
  // const [tableNo, settableNo] = useState("");

  const increment = () => {
    if (guestCount >= 6) return;
    setGuestCount((prev) => prev + 1);
  };
  const decrement = () => {
    if (guestCount <= 0) return;

    setGuestCount((prev) => prev - 1);
  };
  console.log(itemId, customer);

  const handleCreateOrder = () => {
    if (!phone || !name || !guestCount) {
      return toast.error("Please filed all the forms", {
        position: "top-right",
      });
    }
    const newUser: any = {
      name,
      phone,
      guests: guestCount,
      table: tableId,
      userId: tableId,
    };
    addUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    toast.success("you can reservered postion now", { position: "top-right" });
    setSkiped(false);
  };

  const items = useItemStore((state) => state.items);
  const removesingleItem = useItemStore((state) => state.removeItem);
  // const updateQty = (id: string, change: number) => {
  //   setItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, qty: Math.max(item.qty + change, 1) } : item
  //     )
  //   );
  // };

  const removeItem = (id: string) => {
    removesingleItem(id);
    // setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const customerData = useUserStore((state: any) => state.user);
  const addItem = useItemStore((state: any) => state.addItem);
  const addUser = useUserStore((state) => state.addUser);
  console.log("customerData", customerData);
  const clearItems = useItemStore((state: any) => state.clearItems);

  //   const subtotal = items?.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredItems = selected?.items?.filter((item: any) => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = item.name
      ?.toLowerCase()
      .includes(searchQuery?.toLowerCase());
    //   item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const { data: menus, isLoading } = useQuery({
    queryKey: ["get-menus"],
    queryFn: async () => {
      try {
        const res = await axiosIntence.get("/api/menus");
        setSelected(res?.data.menu[0]);
        return res.data.menu;
      } catch (err) {
        console.log(err);
      }
    },
  });

  const orderMutation = useMutation({
    mutationKey: ["order_create"],
    mutationFn: async (data: any) => {
      const res = await axiosIntence.post("/api/orders/create", data);

      return res.data;
    },
    onSuccess: (order) => {
      if (order.data) {
        // setOrderInfo(order.data); // store full order info once
      }
      // setShowInvoice(true); // show the invoice
      setShowCartModel(false);
      setTimeout(() => {
        if (order.data) {
          // setOrderInfo(order.data); // store full order info once
        }
        const tableData = {
          status: "reserved",
          orderId: order.data._id,
          tableId: order.data.table,
        };
        tableMutate.mutate(tableData);
        setAddtoCartModel(false);
      }, 100); // delay table update by 1.5 seconds
    },
    onError: () => {
      toast.error("Failed to place order");
    },
  });

  const tableMutate = useMutation({
    mutationKey: ["update_table"],
    mutationFn: async (data: any) => {
      console.log("data", data);
      const res = await axiosIntence.put(
        `/api/table/update-table/${data.tableId}`,
        data
      );
      return res.data;
    },
    onSuccess: () => {
      setShowCartModel(false);
      clearItems();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Failed to place order");
    },
  });
  const pathname = useLocation();
  const tableId = pathname.pathname.split("/")[2];

  const handlePlaceOrder = () => {
    const orderDatas: any = {
      customer: "outisde",
      orderStatus: "In Progress",
      items,
      bills: {
        total: 40,
        tax: 10,
        totalWithTax: 10,
      },
    };

    if (customerData?.table) {
      console.log("cilked table");
      setCustomer("inside");
      const orderData = {
        ...orderDatas,
        customerDetails: {
          name: customerData.name,
          phone: customerData.phone,
          userId: customerData?._id ? customerData._id : tableId,
        },
      };
      orderMutation.mutate(orderData);
    } else if (name && guestCount && phone) {
      setCustomer("outside");
      const orderData = {
        ...orderDatas,
        table: tableId ? tableId : customerData?.table,
        customerDetails: {
          name,
          phone,
          userId: customerData?._id ? customerData._id : tableId,
          guests: guestCount,
        },
      };

      orderMutation.mutate(orderData);
    } else if (customerData) {
      console.log("cilked table");
      setCustomer("outisde");
      const orderData = {
        ...orderDatas,
        table: tableId,
        customerDetails: {
          name: customerData.name,
          phone: customerData.phone,
          guests: guestCount,
          userId: customerData?._id ? customerData._id : tableId,
        },
      };
      orderMutation.mutate(orderData);
    }
  };

  useEffect(() => {
    if (selected) {
      setActiveCategory(selected.categoryName);
    }
  }, [selected]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!customerData) {
      if (user) {
        const parseUser = JSON.parse(user);
        addUser(parseUser);
        setSkiped(false);
      } else {
        setSkiped(true);
      }
    }
  }, [addUser, customerData]);
  const incrementProduct = (id: string) => {
    console.log(id);
    setItemId(id);
    if (itemCount >= 14) return;
    setItemCount((prev) => prev + 1);
  };

  const decrementProduct = (id: string) => {
    setItemId(id);
    if (itemCount <= 0) return;
    setItemCount((prev) => prev - 1);
  };
  const handleAddToCart = (item: any) => {
    if (itemCount === 0) return;

    const { name, price }: { name: string; price: number } = item;

    const aleartItem = items.some((cartItem: any) => cartItem._id === item._id);
    if (aleartItem) {
      toast.error("cart already added please remove first to the cart");
    } else {
      addItem({ name, price, itemCount, id: item._id });
      toast.success("cart added sucessfuly");
    }

    setShowCartModel(false);

    setItemCount(1);
  };
  const total = items.reduce((sum, item) => {
    const priceQantity = Number(item.pricePerQuantity);
    const quantity = Number(item.quantity);

    return sum + priceQantity * quantity;
  }, 0);
  return (
    <>
      {skiped && (
        <div className="fixed h-screen inset-0 overflow-hidden  z-10  bg-[#e9eae775] opacity-99  backdrop-blur-lg  top-0 ">
          <div className="bg-[#ffffff] relative w-full flex-col  flex justify-center items-center my-auto h-full ">
            <div className="flex items-center justify-end mx-1  w-full gap-2 px-4 mb-12">
              <div className="flex gap-2 items-end  w-full">
                <div
                  onClick={() => setSkiped(false)}
                  className="flex items-center justify-center cursor-pointer text-white bg-red-500 px-8 py-2 rounded-sm"
                >
                  Skipe
                </div>
                <div className="flex items-center justify-center text-white cursor-pointer bg-green-500 px-8 py-2 rounded-sm">
                  <BsPersonFill />
                  Login
                </div>
              </div>
            </div>
            <div className="bg-[#ffffff]   rounded-lg shadow-l w-full max-w-lg mx-4">
              <div className="flex flex-row-reverse justify-between items-center px-6 py-4 border-b border-b-[#333]">
                <h2 className="text-xl text-[#000] font-semibold">
                  Crate Reservred
                </h2>
              </div>
              <div className="p-6">
                <div>
                  <label className="block text-[#ababab] mb-2 text-sm font-medium">
                    Customer Name
                  </label>
                  <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
                    <input
                      value={name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                      }
                      type="text"
                      name=""
                      placeholder="Enter customer name"
                      id=""
                      className="bg-transparent flex-1 text-white focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
                    Customer Phone
                  </label>
                  <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
                    <input
                      value={phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPhone(e.target.value)
                      }
                      type="number"
                      name=""
                      placeholder="+91-9999999999"
                      id=""
                      className="bg-transparent flex-1 text-white focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 mt-3 text-sm font-medium text-[#ababab]">
                    Guest
                  </label>
                  <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg">
                    <button
                      onClick={decrement}
                      className="text-yellow-500 text-2xl"
                    >
                      &minus;
                    </button>
                    <span className="text-white">{guestCount} Person</span>
                    <button
                      onClick={increment}
                      className="text-yellow-500 text-2xl"
                    >
                      &#43;
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleCreateOrder}
                  className="w-full bg-[#343434] text-[#f5f5f5] cursor-pointer rounded-lg py-3 mt-8 hover:bg-yellow-700"
                >
                  Create Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="min-h-screen overflow-hidden bg-[#E4E7E6]">
        <div className="max-w-4xl mx-auto p-4">
          <div>
            <div className="flex items-center  justify-between">
              <div className="flex gap-2">
                <Link
                  to={"/message"}
                  className="flex items-center justify-center cursor-pointer text-white bg-red-500 md:px-6 px-2 pr-4 py-2 gap-2 rounded-sm"
                >
                  <IoIosSend />
                  Message
                </Link>
                <Link
                  to={"/"}
                  className="flex items-center justify-center cursor-pointer text-white bg-red-500 md:px-6 px-2 pr-4 py-2 gap-2 rounded-sm"
                >
                  <IoIosSend />
                  test
                </Link>
                <Link
                  to={"/login"}
                  className="flex items-center gap-2 justify-center text-white cursor-pointer bg-green-500 md:px-6 px-2 pr-4 py-2 rounded-sm"
                >
                  <BsPersonFill />
                  Login
                </Link>
              </div>
              <div
                onClick={() => setAddtoCartModel(true)}
                className="flex items-center justify-center gap-2 bg-amber-300 px-4 py-2 rounded-md"
              >
                <span className="text-white text-[18px]">
                  ${total?.toFixed(2)}
                </span>
                <BsBag />
              </div>
            </div>
            {/* Header */}
            <div className="text-center mb-8 pt-6 w-full">
              {/* Search Bar */}
              <div className="w-full relative pl-10  pr-4 py-2 rounded-[10px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full outline-0"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex gap-4 scrollbar-hide w-full my-12 overflow-x-auto scroll-hide snap-x snap-mandatory">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                {menus?.map((menu: any) => (
                  <div
                    key={menu._id}
                    className="min-w-[170px] flex flex-col items-start justify-between p-4 rounded-lg h-[120px] cursor-pointer shadow-md hover:shadow-lg transition snap-start"
                    style={{ backgroundColor: "#F8FBFA" }}
                    onClick={() => {
                      setSelected(menu);
                      setActiveCategory(menu.categoryName);
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <h1 className="text-[#000] text-lg font-semibold">
                        {menu.icon} {menu.name}
                      </h1>
                      {selected?._id === menu._id && (
                        <GrRadialSelected className="text-red-500" size={20} />
                      )}
                    </div>
                    <p className="text-[#000] text-sm font-semibold">
                      {menu?.items.length} Items
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="bg-white roundedl shadow-lg overflow-hidden">
            {/* Category Header */}
            <div className="flex items-center justify-between  bg-gray-100 rounded-sm te p-4">
              <h2 className="text-xl font-bold text-black">
                {/* {categories.find((cat) => cat.id === activeCategory)?.name || */}
                "All Items"
              </h2>
              <MdDashboard size={22} />
            </div>

            {/* Menu Items */}
            <div className="p-4">
              {filteredItems?.length > 0 ? (
                <div className="grid gap-4">
                  {filteredItems?.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-2 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <img
                        className="w-[70px] h-[70px] rounded-md   object-cover"
                        src="https://d91ztyz4qy326.cloudfront.net/foodscan/40/conversions/fried_cheese_wonton-thumb.png"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {item.description}
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="font-bold text-orange-600">
                            ${item.price.toFixed(2)}
                          </span>
                          <button
                            disabled={items.some(
                              (cartItem: any) => cartItem._id === item._id
                            )}
                            onClick={() => {
                              setShowCartModel(true);
                              setCartItem(item);
                            }}
                            className={` ${
                              items.some(
                                (cartItem: any) => cartItem._id === item._id
                              )
                                ? "bg-green-500"
                                : "bg-orange-500"
                            } text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors`}
                          >
                            {items.some(
                              (cartItem: any) => cartItem._id === item._id
                            )
                              ? "Added"
                              : "Add"}
                            {/* Add */}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🍽️</div>
                  <p className="text-gray-600">
                    No items found matching your search
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showCartModel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-5 w-full max-w-md relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setShowCartModel(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <IoMdClose size={24} />
            </button>

            {/* Header */}
            <div className="flex md:mt-16 mt-6 px-1 py-1 bg-[#E4E7E6] items-start gap-4">
              <img
                className="w-[70px]  h-[70px] rounded-md   object-cover"
                src="https://d91ztyz4qy326.cloudfront.net/foodscan/40/conversions/fried_cheese_wonton-thumb.png"
              />
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-1">
                  {cartItem?.name}

                  <AiOutlineInfoCircle className="text-gray-400 cursor-pointer" />
                </h2>
                <p className="text-sm text-gray-500">
                  With fried rice or soy noodles, and steamed greens with oyster
                  sauce
                </p>
                <p className="text-lg font-bold mt-1">
                  ${cartItem?.price?.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-4">
              <p className="font-medium">Quantity:</p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => decrementProduct(cartItem?._id)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <FiMinus />
                </button>
                <span className="text-lg font-semibold">{itemCount}</span>
                <button
                  onClick={() => incrementProduct(cartItem?._id)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="mt-4">
              <p className="font-medium">Special Instructions</p>
              <textarea
                placeholder="Add note (extra mayo, cheese, etc.)"
                className="w-full border rounded-lg p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(cartItem)}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {items.length > 0 && addedToCartModel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setAddtoCartModel(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <IoMdClose size={26} />
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center">My Cart</h2>

            {/* Cart Items */}
            <div className="mt-4 space-y-4 min-h-[550px] overflow-y-auto pr-1">
              {items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="w-[70px]  h-[70px] rounded-md   object-cover"
                      src="https://d91ztyz4qy326.cloudfront.net/foodscan/40/conversions/fried_cheese_wonton-thumb.png"
                    />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      {item.size && (
                        <p className="text-xs text-gray-500">
                          Size: {item.size}
                        </p>
                      )}
                      <p className="text-sm font-semibold">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <div className="p-2 w-[80px] h-[40px] rounded-md bg-gray-100 hover:bg-red-100 text-red-500">
                      <span>X {item.quantity}</span>
                    </div>
                    <button
                      onClick={() => removeItem(item?._id)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-red-500"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between mt-4 px-2 py-3 border rounded-xl">
              <p className="font-medium">Total</p>
              <p className="font-bold text-green-600">${total.toFixed(4)}</p>
            </div>

            {/* Checkout Button */}
            <button
              disabled={orderMutation.isPending}
              onClick={handlePlaceOrder}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
            >
              {orderMutation.isPending
                ? "Proceed is loading...."
                : "Proceed To Checkout"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomePage;
