'use server'




import SideBar from "@/components /sidebar";
import {prisma} from "@/lib/prisma";
import {getCurrentUser} from "@/lib/auth";
import {deleteProduct} from "@/lib/actions/products";
import {SearchParams} from "next/dist/server/request/search-params";
import Pagination from "@/components /pagination";

export default async function InventoryPage({searchParams}: {searchParams: Promise<{ q?:string, page?:string }>}){
    const {user} = await getCurrentUser();

    const params = await searchParams;
    const q = (params.q ?? "").trim();

    const where = {
        userId: user.id,
        ...(q? {name: {contains: params.q, mode: "insensitive" as const}} : {}),
    };


    const pageSize = 1

    const page = Math.max(Number(params.page ?? 1),1);


    const[totalCount, items] =  await Promise.all(
       [
           prisma.product.count({where}),
           prisma.product.findMany({
               where,
               orderBy: {
                   createdAt: "desc"
               },
               skip: (page-1) * pageSize,
               take: pageSize
           })
       ]
    )
    const totalPages = Math.max(1,Math.ceil(totalCount/pageSize));



    return(
        <div className={"min-h-screen bg-gray-50"}>
            <SideBar currentPath={"/inventory"} />
            <main className={"ml-64 p-4"}>
                <div className={"mb-8"}>
                    <div className={"flex items-center justify-between"}>
                        <div>
                            <h1 className={"text-2xl font-semibold text-gray-900"}>
                                Inventory
                            </h1>
                            <p className={"text-sm text-gray-500"}>
                                Manage your products and track your inventory levels
                            </p>
                        </div>
                    </div>
                </div>

                <div className={"space-y-6"}>
                    {/*Search*/}
                    <div className={"bg-white rounded-lg border border-gray-200 p-6"}>
                        <form className={"flex gap-2"} action={"/inventory"} method="GET">
                            <input name={"q"} placeholder={"search products..."}
                                   className={"flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:border-transparent"}
                            />
                            <button className={"px-6 py-2 bg-purple-600 text-white rounded-lg"}>
                                Search
                            </button>
                        </form>
                    </div>
                    {/*Products table*/}
                    <div className={"bg-white rounded-lg border border-gray-200 overflow-hidden"}>
                        <table className={"w-full"}>
                            <thead className={"bg-gray-50"}>
                            <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Sku</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Quantity</th>
                                <th className="px-6 py-3">Low Stock</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                            </thead>
                            <tbody className={"bg-white divide-y divide-gray-200"}>
                            {items.map((p,key) => (
                                <tr key={key} className={"hover:bg-gray-50"}>
                                    <td className={"px-6 py-4 text-xs text-gray-500"}>{p.name}</td>
                                    <td className={"px-6 py-4 text-xs text-gray-500"}>{p.sku || "-"}</td>
                                    <td className={"px-6 py-4 text-xs text-gray-500"}>{`${p.price}`}</td>
                                    <td className={"px-6 py-4 text-xs text-gray-500"}>{p.quantity}</td>
                                    <td className={"px-6 py-4 text-xs text-gray-500"}>{p.lowStockAt || "-"}</td>
                                    <td className={"px-6 py-4 text-xs text-gray-500"}>
                                        <form action={
                                            async (formData:FormData) => {
                                                'use server'
                                                await deleteProduct(formData)
                                            }
                                        }>
                                            <input type={"hidden"} name={"id"} value={p.id}/>
                                            <button className={"text-red-600 hover:text-red-900"} type={"submit"}>
                                                Delete
                                            </button>
                                        </form>
                                    </td>

                                </tr>

                            ))}
                            </tbody>
                        </table>
                    </div>
                    {totalPages>1 && <div>
                        <div className={"bg-white rounded-lg border border-gray-200 p-6"}>
                            <Pagination currentPage={page} totalPages={totalPages}
                                        baseUrl={"/inventory"}
                                        searchParams={{
                                            q,pageSize:String(pageSize)
                                        }}/>
                        </div>
                    </div>}
                </div>
            </main>
        </div>
    )
}