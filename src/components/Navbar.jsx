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
          <Link href="/Realemergency" className="hover:underline">
            Emergency
          </Link>
        </div>
      </div>
    </nav>
  );
}
