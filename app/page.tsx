import Link from "next/link";
import { authServer } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { data } = await authServer.getSession();
  if (data?.user) {
    redirect('/dashboard');
  }

  return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 to-purple-100 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-5xl text-gray-900 mb-6 font-bold">
                        Inventory Management
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Streamline your inventory tracking with our powerful, easy-to-use management system. Track products, monitor stocks levels, and gain valuable insights</p>
                    <div className={"flex justify-center gap-4"}>
                        <Link href="/auth/sign-in" className={"bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"}>
                            Sign In
                        </Link>
                        <Link href="#" className={"bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold border-2 border-purple-600 hover:bg-purple-100"}>
                            Learn More
                        </Link>
                    </div>
                </div>
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
                        Built for cross-functional teams
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="rounded-xl border border-white/60 bg-white/80 p-6 text-left shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900">Inventory Managers</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Keep stock visibility high across locations with clear, actionable insights.
                            </p>
                        </div>
                        <div className="rounded-xl border border-white/60 bg-white/80 p-6 text-left shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900">Full Stack Engineers</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Integrate inventory data with APIs and dashboards that scale for growing teams.
                            </p>
                        </div>
                        <div className="rounded-xl border border-white/60 bg-white/80 p-6 text-left shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900">System Designers</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Map reliable workflows and data flows across warehousing, sales, and fulfillment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
}
