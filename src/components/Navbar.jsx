import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Emergency Medical System</h1>
        <div className="flex space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/emergency" className="hover:underline">
            Emergency
          </Link>
          <Link href="/signup" className="hover:underline">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}
