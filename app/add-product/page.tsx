'use server'


import {getCurrentUser} from "@/lib/auth";
import SideBar from "@/components /sidebar";
import Link from "next/link";
import {createProduct} from "@/lib/actions/products";

export default async function AddProductPage(){
    const user = await getCurrentUser();
    return <div className={"min-h-screen bg-gray-50 "}>
        <SideBar currentPath={"/add-product"}/>
        <main className={"ml-64 p-8"}>
            <div className={"mb-8"}>
                <div className={"flex items-center justify-between"}>
                    <div>
                        <h1 className={"text-2xl font-semibold text-gray-900"}>
                            Add Product
                        </h1>
                        <p className={"text-sm text-gray-500"}>
                            Add a new product to your inventory
                        </p>
                    </div>
                </div>
            </div>

            <div className={"max-w-2xl"}>
                <div className={"bg-white rounded-lg border border-gray-200 p-6"}>
                    <form className={"space-y-6 text-gray-600"}
                    action={createProduct}
                    >
                        <div>
                            <label htmlFor={"name"} className={"block text-sm font-medium text-gray-700"}>Product Name *</label>
                            <input type={"text"} id={"name"} name={"name"}
                                   required
                                   className={"w-full px-4 py-2 border border-gray-200 rounded-lg focus:transparent"}
                            placeholder={"Enter product name"}/>
                        </div>
                        <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
                            <div>
                                <label htmlFor={"price"} className={"block text-sm font-medium text-gray-700"}>Price *</label>
                                <input type={"number"}
                                       id={"price"}
                                       name={"price"}
                                       required
                                       step={"0.01"}
                                       min={"0"}
                                       inputMode={"numeric"}
                                       className={"w-full px-4 py-2 border border-gray-200 rounded-lg focus:transparent"}
                                       placeholder={"0.0"}/>
                            </div>
                            <div>
                                <label htmlFor={"price"} className={"block text-sm font-medium text-gray-700"}>Quantity *</label>
                                <input type={"number"}
                                       id={"quantity"}
                                       name={"quantity"}
                                       required
                                       step={"1"}
                                       min={"0"}
                                       inputMode={"numeric"}
                                       className={"w-full px-4 py-2 border border-gray-200 rounded-lg focus:transparent"}
                                       placeholder={"quantity"}/>
                            </div>

                        </div>
                        <div>
                            <label htmlFor={"sku"} className={"block text-sm font-medium text-gray-700"}>Sku</label>
                            <input type={"text"} id={"sku"} name={"sku"}
                                   required={false}
                                   className={"w-full px-4 py-2 border border-gray-200 rounded-lg focus:transparent"}
                                   placeholder={"Enter sku"}/>
                        </div>
                        <div>
                            <label htmlFor={"lowStockAt"} className={"block text-sm font-medium text-gray-700"}>Low Stock At</label>
                            <input type={"number"}
                                   id={"lowStockAt"}
                                   name={"lowStockAt"}
                                   required = {false}
                                   step={"1"}
                                   min={"0"}
                                   inputMode={"numeric"}
                                   className={"w-full px-4 py-2 border border-gray-200 rounded-lg focus:transparent"}
                                   placeholder={"Enter lowstock threshold"}/>
                        </div>

                        <div className={"flex gap-4"}>
                            <button type={"submit"} className={"px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"}>
                                Add Product
                            </button>
                            <Link href={"/inventory"} className={"px-6 py-3 bg-gray-200  text-gray-800 rounded-lg hover:bg-gray-300"}>
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
}