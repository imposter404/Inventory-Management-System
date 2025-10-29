import { ArrowsUpDownIcon, CheckCircleIcon, XMarkIcon} from "@heroicons/react/20/solid"
import { ItemPortal } from './../../in'
import { useContext, useState} from 'react'
import { CheckIcon, ExclamationTriangleIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import View_full_product from "./view_full_product";


export default function Table_Product(){
    const {products,Loading}=useContext(ItemPortal)
    const [openView_full_product,setView_full_product]=useState({open:false,id:"1"})
    console.log(products)

    var out_of_stock=0
    var low_stock=18

    const [isActive,setIsActive]=useState("View All")

    // const all_Products=products.map((product,index)=>(
    //     <tr key={product.id}>
    //         <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"># {product.id}</td>
    //         <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{product.product}</td>
    //         <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
    //             {product.size.map((size,index)=>(<div key={index} className={out_of_stock==size.quantity ? "text-red-500": low_stock>=size.quantity ? "text-yellow-500":"text-white-500"}>{size.size}</div>))}
    //         </td>
    //         <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
    //             {product.size.map((size,index)=>(<div key={index} className={out_of_stock>=size.quantity ? "text-red-500": low_stock>=size.quantity ? "text-yellow-500":"text-white-500"}>${size.price}</div>))}
    //         </td>
    //         <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
    //             {product.size.map((size,index)=>(<div key={index} className={out_of_stock>=size.quantity ? "text-red-500": low_stock>=size.quantity ? "text-yellow-500":"text-white-500"}>x</div>))}
    //         </td>
    //         <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
    //             {product.size.map((size,index)=>(<div key={index} className={out_of_stock>=size.quantity ? "text-red-500": low_stock>=size.quantity ? "text-yellow-500":"text-white-500"}>x{size.quantity}</div>))}
    //         </td>
    //         <td className="px-4 py-4 text-sm whitespace-nowrap">
    //             <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none" onClick={()=>setView_full_product((e)=>({...e,open:true,id:product.id}))}>
    //                 <PencilSquareIcon className="h-4"/>
    //             </button>
    //         </td>
    //     </tr>
    // ))


    const skeleton=Array(10).fill().map((e,index)=>(
            <tr key={index} className="animate-pulse ">
               <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">...</td>
               <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">...</td>
               <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">...</td>
               <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">...</td>
               <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">...</td>
               <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">...</td>
               <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">...</td>
           </tr>
    ))









    return(
<>
    <section className="px-4 pb-4">
        <div className="mt-6 md:flex md:items-center md:justify-between">
            <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                <button className={"flex items-center px-5 py-2 text-xs font-medium transition-colors duration-200 hover:bg-gray-800 "+ (isActive=="View All" ? "bg-gray-800 text-gray-300" : "text-gray-300")} onClick={()=>setIsActive("View All")}>
                    <CheckIcon className="h-4 mr-2"/>
                    <span>View All</span>
                </button>
                <button className={"flex items-center px-5 py-2 text-xs font-medium transition-colors duration-200 hover:bg-gray-800 "+ (isActive=="Low Stock" ? "bg-gray-800 text-gray-300" : "text-gray-300")} onClick={()=>setIsActive("Low Stock")}>
                    <ExclamationTriangleIcon className="h-4 mr-2 text-yellow-500"/>
                    <span>Low Stock</span>
                    <span className="ml-4 rounded-xl bg-yellow-500/50 px-2">2</span>
                </button>
                <button className={"flex items-center px-5 py-2 text-xs font-medium transition-colors duration-200 hover:bg-gray-800 "+ (isActive=="Out Of Stock" ? "bg-gray-800 text-gray-300" : "text-gray-300")} onClick={()=>setIsActive("Out Of Stock")}>
                    <XMarkIcon className="h-4 mr-2 text-red-500"/>
                    <span>Out Of Stock</span>
                    <span className="ml-4 rounded-xl bg-red-500/50 px-2">2</span>
                </button>
            </div>
            <div className="relative flex items-center">
                <span className="absolute">
                    <MagnifyingGlassIcon className="w-4 h-4 mx-2 text-gray-500 sm:w-6 sm:h-6"/>
                </span>
                <input type="text" placeholder="Search" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
            </div>
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center gap-x-3">
                    <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                        <PlusCircleIcon className="w-4 h-4 mr-2 sm:w-6 sm:h-6"/>
                        <span>Add Product</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
    <section className="px-4">
        <div className="flex flex-col overflow-auto max-h-[69dvh]">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-x-3">
                                            <button className="flex items-center gap-x-2">
                                                <span># ID</span>
                                                <span>< ArrowsUpDownIcon className="h-3"/></span>
                                            </button>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <button className="flex items-center gap-x-2">
                                            <span>Product</span>
                                            <span>< ArrowsUpDownIcon className="h-3"/></span>
                                        </button>
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <button className="flex items-center gap-x-2">
                                            <span>Size</span>
                                            <span>< ArrowsUpDownIcon className="h-3"/></span>
                                        </button>
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <button className="flex items-center gap-x-2">
                                            <span>Price</span>
                                            <span>< ArrowsUpDownIcon className="h-3"/></span>
                                        </button>
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <button className="flex items-center gap-x-2">
                                            <span>Buy Price</span>
                                            <span>< ArrowsUpDownIcon className="h-3"/></span>
                                        </button>
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <button className="flex items-center gap-x-2">
                                            <span>Quantity</span>
                                            <span>< ArrowsUpDownIcon className="h-3"/></span>
                                        </button>
                                    </th>
                                    <th scope="col" className="relative py-3.5 px-4">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 ">
                                {/* {all_Products} */}
                                {Loading.products || products==undefined ? skeleton :
                                    products.map((product,index)=>(
                                        <tr key={product.id} >
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"># {product.id}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{product.product}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {product.size.map((size,index)=>(<div key={index} className={out_of_stock==size.quantity ? "text-red-500": low_stock>=size.quantity ? "text-yellow-500":"text-white-500"}>{size.size}</div>))}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {product.size.map((size,index)=>(<div key={index} className={out_of_stock>=size.quantity ? "text-red-500": low_stock>=size.quantity ? "text-yellow-500":"text-white-500"}>${size.price}</div>))}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {product.size.map((size,index)=>(<div key={index} className={out_of_stock>=size.quantity ? "text-red-500": low_stock>=size.quantity ? "text-yellow-500":"text-white-500"}>x</div>))}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {product.size.map((size,index)=>(<div key={index} className={out_of_stock>=size.quantity ? "text-red-500": low_stock>=size.quantity ? "text-yellow-500":"text-white-500"}>x{size.quantity}</div>))}
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none" onClick={()=>setView_full_product((e)=>({...e,open:true,id:product.id}))}>
                                                    <PencilSquareIcon className="h-4"/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between mt-6">
            <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>

                <span>
                    previous
                </span>
            </a>

            <div className="items-center hidden md:flex gap-x-3">
                <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
            </div>

            <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <span>
                    Next
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </a>
        </div>
    </section>
    {products!=undefined && <View_full_product view_full_product={openView_full_product} setView_full_product={setView_full_product} />}
</>    
    )
}
