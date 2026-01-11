import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-purple-100 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
            <div className="text-center">
                <h1 className="text-5xl text-gray-900 mb-6 font-bold">
                    Inventory Management
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Streamline your inventory tracking with our powerful, easy-to-use management system. Track products, monitor stocks levels, and gain valuable insights</p>
                <div className={"flex justify-center gap-4"}>
                    <Link href="/auth/signin" className={"bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"}>
                        Sign In
                    </Link>
                    <Link href="#" className={"bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold border-2  border-bg-purple-600 hover:bg-purple-100"}>
                        Learn More
                    </Link>
                </div>
            </div>
        </div>


      </div>
  );
}
