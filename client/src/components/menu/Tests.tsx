// import React, { useState } from "react";

// const PaymentReceipt = () => {
//   const [cashTendered, setCashTendered] = useState("");
//   // const [amount, setAmount] = useState()
//   const handleNumberClick = (number: any) => {
//     if (cashTendered === "" && number === "0") return;

//     if (cashTendered.includes(".") && cashTendered.split(".")[1]?.length >= 2)
//       return;

//     if (number === "." && cashTendered.includes(".")) return;

//     setCashTendered((prev) =>
//       prev === "0" && number !== "." ? number : prev + number
//     );
//   };

//   const handleClear = () => {
//     setCashTendered("");
//   };

//   const calculateChange = () => {
//     // const amountNum = parseFloat(amount.replace("$", ""));
//     // const cashNum = parseFloat(cashTendered) || 0;
//     // return (cashNum - amountNum).toFixed(2);
//   };

//   const handlePayNow = () => {
//     // if (parseFloat(cashTendered) >= parseFloat(amount.replace("$", ""))) {
//     //   alert("Payment successful!");
//     //   setCashTendered("");
//     // } else {
//     //   alert("Insufficient amount tendered");
//     // }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden font-sans">
//       <div className="flex flex-col md:flex-row">
//         {/* Left Side - Keypad */}
//         <div className="bg-gray-100 p-6 md:w-2/5">
//           <div className="mb-4">
//             <div className="text-center mb-2">
//               <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
//                 June 10, 2024
//               </span>
//               <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm ml-2">
//                 09:52 AM
//               </span>
//             </div>

//             <div className="flex justify-between items-center mb-2">
//               <span className="font-medium">Cash</span>
//               <span className="text-lg font-bold">
//                 ${cashTendered || "0.00"}
//               </span>
//             </div>

//             <div className="bg-gray-200 p-3 rounded-lg text-right mb-4">
//               <div className="text-sm text-gray-600">Amount: {amount}</div>
//               <div className="text-sm text-gray-600">
//                 Tendered: ${cashTendered || "0.00"}
//               </div>
//               <div className="text-lg font-bold mt-1">
//                 Change: ${calculateChange()}
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-2">
//             {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "C"].map(
//               (num) => (
//                 <button
//                   key={num}
//                   className={`p-3 rounded-lg font-medium text-lg ${
//                     num === "C"
//                       ? "bg-red-500 hover:bg-red-600 text-white"
//                       : "bg-white hover:bg-gray-200 border border-gray-300"
//                   }`}
//                   onClick={() =>
//                     num === "C" ? handleClear() : handleNumberClick(num)
//                   }
//                 >
//                   {num}
//                 </button>
//               )
//             )}
//           </div>

//           <button
//             className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-lg"
//             onClick={handlePayNow}
//           >
//             Pay Now
//           </button>
//         </div>

//         {/* Right Side - Receipt */}
//         <div className="p-6 md:w-3/5">
//           <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//             Payment
//           </h1>

//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">
//               Customer Information
//             </h2>
//             <div className="flex items-center">
//               <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
//                 AH
//               </div>
//               <div>
//                 <p className="font-medium text-gray-800">Adam Hamzah</p>
//                 <p className="text-sm text-gray-600">#289 / Dire in</p>
//               </div>
//             </div>
//           </div>

//           <hr className="border-gray-200 my-6" />

//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4">
//               Transaction Details
//             </h2>

//             <div className="flex justify-between items-center mb-4">
//               <div>
//                 <p className="font-medium text-gray-800">
//                   Southwest Scramble Bowl
//                 </p>
//               </div>
//               <p className="text-gray-800">$16.99</p>
//             </div>

//             <div className="flex justify-between items-center mb-4">
//               <div>
//                 <p className="font-medium text-gray-800">Western Omelet</p>
//               </div>
//               <p className="text-gray-800">$19.36</p>
//             </div>

//             <div className="flex justify-between text-sm text-gray-600 mb-6">
//               <div>
//                 <span>June 10, 2024</span>
//                 <span className="mx-2">•</span>
//                 <span>09:52 AM</span>
//               </div>
//               <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
//                 Cash
//               </span>
//             </div>
//           </div>

//           <hr className="border-gray-200 my-6" />

//           <div className="flex justify-between items-center mb-2">
//             <p className="font-semibold text-gray-700">Total</p>
//             <p className="text-lg font-bold text-gray-800">{0}</p>
//           </div>

//           <div className="text-center mt-8 pt-6 border-t border-gray-200">
//             <p className="text-sm text-gray-600">
//               Thank you for your purchase!
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentReceipt;
