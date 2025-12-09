import Link from "next/link";

export default function Custom404() {
  return (
    <h1>
      404 - Page Not Found 😢{" "}
      <Link href="/" className="text-red-600">
        go back to home page
      </Link>
    </h1>
  );
}
