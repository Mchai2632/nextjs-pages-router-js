import React from "react";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button/Button";

export default function Confirmation({ data }) {
  const router = useRouter();

  console.log(data);
  const { status_id, billcode, order_id, msg, transaction_id } = data;

  const statusTitle = () => {
    if (status_id == 1) return "Successful";
    else if (status_id == 2) return "Pending";
    else if (status_id == 3) return "Failed";
    else {
      return "Unknown";
    }
  };

  const tableData = [
    { label: "Status ID", value: statusTitle() },
    { label: "Billcode", value: billcode },
    { label: "Order ID", value: order_id },
    { label: "Message", value: msg },
    { label: "Transaction ID", value: transaction_id },
  ];

  const print = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printTable, #printTable * {
            visibility: visible;
          }
          #printTable {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
          }
        }
      `}</style>{" "}
      <div id="printTable" className="p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Payment Status</h1>
        {status_id == 1 && <span className="text-green-500">Thank you. Your payment has been confirmed.</span>}
        {status_id == 2 && <span className="text-orange-500">Thank you. Your payment is pending.</span>}
        {status_id == 3 && <span className="text-red-500">Sorry. Your payment is failed. Please Try Again</span>}

        <table className="w-full border border-gray-300">
          <tbody>
            {tableData.map((row) => (
              <tr key={row.label} className="border-b">
                <td className="p-3 font-medium bg-gray-100 w-40">{row.label}</td>
                <td className="p-3">{row.value || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
      <div className="flex w-full justify-between">
        <Button
          onClick={() => {
            // clearForm();
            router.push("/");
          }}
        >
          Back to Home
        </Button>
        <Button onClick={print}>Print</Button>
      </div>
    </>
  );
}
