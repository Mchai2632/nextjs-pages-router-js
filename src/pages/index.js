import { Geist, Geist_Mono } from "next/font/google";
import Button from "@/components/ui/Button";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  //

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
    >
      Home Page
      <Link href="/checkout" className="underline">
        Go to Checkout Page
      </Link>
      {/* <Button onClick={handlePay} className="">
        Pay
      </Button> */}
    </div>
  );
}
