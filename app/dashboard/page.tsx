'use server'
import {prisma} from "@/lib/prisma";
import {getCurrentUser} from "@/lib/auth";
import {TrendingUp} from 'lucide-react'
import SideBar from "@/components /sidebar";
import ProductChart from "@/components /productchart";
import {Data} from "effect/Schema";

export default async function DashboardPage() {
    const {user} = await getCurrentUser();

    const [totalProducts, lowStockQuery, allProducts] = await Promise.all([
        prisma.product.count({
            where: {
                userId: user.id,
            },
        }),
        prisma.$queryRaw<{ count: bigint }[]>`
            SELECT COUNT(*) AS count
            FROM "Product"
            WHERE "userId" = ${user.id}
              AND "lowStockAt" IS NOT NULL
              AND "quantity" <= "lowStockAt"
        `,
        prisma.product.findMany({
            where: {userId: user.id},
            select: {
                price: true,
                quantity: true,
                createdAt: true
            }
        })
    ]);

    const lowStock = Number(lowStockQuery[0].count);

    const recentProducts = await prisma.product.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 5,
    });

    const totalValue = allProducts.reduce((sum, product) =>
        sum + Number(product.price) * Number(product.quantity), 0);

    console.log(totalProducts);
    console.log(recentProducts);
    console.log(totalValue);

    const weeklyProductsData = []

    const inStock = allProducts.filter(
        (product) => Number(product.quantity) > 5
    ).length;

    const lowOnStock = allProducts.filter(
        (product) => {
            const qty = Number(product.quantity);
            return qty <= 5 && qty >= 1;
        }
    ).length;

    const outOfStock = allProducts.filter(
        (product) => Number(product.quantity) === 0
    ).length;

    const inStockPercentage = totalProducts > 0 ? Math.round(inStock / totalProducts * 100) : 0;
    const outOfStockPercentage = totalProducts > 0 ? Math.round(outOfStock / totalProducts * 100) : 0;
    const lowOnStockPercentage = totalProducts > 0 ? Math.round(lowOnStock / totalProducts * 100) : 0;


    const now = new Date();
    for (let i = 11; i >= 0; i--) {
        const weekStart = new Date(now)
        weekStart.setDate(weekStart.getDate() - i * 7);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const weekLabel = `${String(weekStart.getMonth() + 1).padStart(2, "0")}
        /${String(weekStart.getDate() + 1).padStart(2, "0")}`

        const weekProducts = allProducts.filter(
            (product) => {
                const productData = new Date(product.createdAt);
                return productData >= weekStart && productData <= weekEnd;
            }
        )
        weeklyProductsData.push({
            week: weekLabel,
            products: weekProducts.length,
        });
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <SideBar />
            <main className={"ml-64 p-8 "}>
                {/* Header */}
                <div className={"mb-8"}>
                    <div className={"flex items-center justify-between"}>
                        <div>
                            <h1 className={"text-2xl font-semibold text-gray-900"}>Dashboard</h1>
                            <p className={"text-sm text-gray-500"}>Welcome back! here is an overview of your
                                inventory</p>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className={"grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"}>
                    <div className={"bg-white rounded-lg border border-gray-200 p-6"}>
                        <h2 className={"text-lg font-semibold text-gray-900 mb-6"}>
                            Key Metrics
                        </h2>
                        <div className="grid grid-cols-3 gap-6">
                            {/* Metric 1 */}
                            <div className="text-center text-gray-900">
                                <div className="text-3xl font-bold text-gray-900">{totalProducts}</div>
                                <div className="text-sm text-gray-500">Total Products</div>
                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-green-600">{totalProducts}</span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1"/>
                                </div>
                            </div>
                            {/* Metric 2 */}
                            <div className="text-center text-gray-900">
                                <div className="text-3xl font-bold text-gray-900">${Number(totalValue).toFixed(2)}</div>
                                <div className="text-sm text-gray-500">
                                    Total Value
                                </div>
                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-green-600">+${Number(totalValue).toFixed(2)}</span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1"/>
                                </div>
                            </div>
                            {/* Metric 3 */}
                            <div className="text-center text-gray-900">
                                <div className="text-3xl font-bold text-gray-900">{lowStock}</div>
                                <div className="text-sm text-gray-500">Low Stock</div>
                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-green-600">{lowStock}</span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1"/>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/*Inventory Over Time*/}
                    <div className={"bg-white rounded-lg border -gray-200 p-6"}>
                        <div className={"flex item-center justify-between mb-6"}>
                            <h2 className={"text-gray-900 font-semibold text-lg"}>New Products per week</h2>
                        </div>
                        <ProductChart data={weeklyProductsData}/>
                    </div>
                </div>

                <div className={"grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"}>
                    {/* Stock levels */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Stock levels
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {
                                recentProducts.map((product, key) => {
                                    const stockLevel = product.quantity === 0 ? 0 :
                                        product.quantity <= (product.lowStockAt || 5)
                                            ? 1 : 2;

                                    const bgColors = ["bg-red-600", "bg-yellow-600", "bg-green-600"];
                                    const textColors = ["text-red-600", "text-yellow-600", "text-green-600"];

                                    return (
                                        <div className={"flex items-center justify-between p-3 rounded-lg bg-gray-50"}
                                             key={key}>
                                            <div className={"flex items-center space-x-3"}>
                                                <div className={`w-3 h-3 rounded-full ${
                                                    bgColors[stockLevel]
                                                }`}></div>
                                                <span className={"text-sm font-medium text-gray-900"}>
                                                {product.name}
                                            </span>
                                            </div>
                                            <div className={`font-medium text-sm ${textColors[stockLevel]}`}>
                                                {product.quantity} units
                                            </div>
                                        </div>);
                                })
                            }
                        </div>
                    </div>

                    {/* Efficiency */}
                    <div className={"bg-white rounded-lg border border-gray-200 p-6"}>
                        <div className={"flex items-center justify-between mb-6"}>
                            <h1 className={"text-gray-900 text-lg font-semibold"}>Efficeincy</h1>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="relative w-48 h-48">
                                {/* Background circle */}
                                <div className="absolute inset-0 rounded-full border-8 border-gray-200"/>

                                {/* Progress ring (polygon clip-path) */}
                                <div
                                    className="absolute inset-0 rounded-full border-8 border-purple-600"
                                    style={{
                                        clipPath:
                                            "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                                    }}
                                />

                                {/* Center content */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">{inStockPercentage}</div>
                                        <div className="text-sm text-gray-600">In Stock</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"mt-6 space-y-2"}>
                            <div className={"flex items-center justify-between text-sm text-gray-600"}>
                                <div className={"flex items-center space-x-2"}>
                                    <div className={"w-3 h-3 rounded-full bg-purple-200"}/>
                                    <span>In Stock %{inStockPercentage}</span>
                                </div>
                            </div>

                                <div className={"flex items-center justify-between text-sm text-gray-600"}>
                                    <div className={"flex items-center space-x-2"}>
                                        <div className={"w-3 h-3 rounded-full bg-purple-600"}/>
                                        <span>Low Stock %{lowOnStockPercentage}</span>
                                    </div>
                                </div>
                                <div className={"flex items-center justify-between text-sm text-gray-600"}>

                                    <div className={"flex items-center space-x-2"}>
                                        <div className={"w-3 h-3 rounded-full bg-gray-200"}/>
                                        <span>Out of Stock %{outOfStockPercentage}</span>
                                    </div>
                                </div>

                            </div>


                    </div>
                </div>
            </main>
        </div>
    );
}