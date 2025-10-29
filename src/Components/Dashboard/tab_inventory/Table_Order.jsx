import { ArrowsUpDownIcon, ArrowUturnLeftIcon, CheckIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { useContext, useEffect, useState} from 'react'
import { ArrowsPointingOutIcon, PhoneIcon } from "@heroicons/react/24/outline"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import View_full_orders from "./view_full_orders.jsx"
import { ItemPortal } from "../../in.jsx";


export default function Table_Order(){
    const {orders,setOrders,Loading,setLoading}=useContext(ItemPortal)
    const [openView_full_orders,setView_full_orders]=useState({open:false,invoice:"3065"})
    const [isActive,setIsActive]=useState("1")

    
      if(Loading.orders == true){
          fetch("http://localhost:8080/api/data/Orders")
          .then(res=>res.json())
          .then(res=>{
            setOrders(res.msg);
            setLoading((e)=>({...e,orders:false}))
          })
          console.log("fetching",Loading.orders)
      }
      

    function status(status){
        switch (status){
            case "paid":
                return (<div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                            <CheckIcon className="h-3"/>
                            <h2 className="text-sm font-normal">Paid</h2>
                        </div>)
            case "canceled":
                return(
                    <div className="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                        <XMarkIcon className="h-3"/>
                        <h2 className="text-sm font-normal">Cancelled</h2>
                    </div>
                )
            case "refunded":
                return(
                    <div className="inline-flex items-center px-3 py-1 text-yellow-500 rounded-full gap-x-2 bg-gray-100/60 dark:bg-gray-800">
                        <ArrowUturnLeftIcon className="h-3"/>
                        <h2 className="text-sm font-normal">Refunded</h2>
                    </div>
                )
        }
    }


    // const all_Order=orders.map((order,index)=>(
    //         <tr key={order.invoice}>
    //            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"># {order.invoice}</td>
    //            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.date}</td>
    //            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
    //             {status(order.status)}
    //            </td>
    //            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
    //                <div className="flex items-center gap-x-2">
    //                    <div>
    //                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{order.customer.name}</h2>
    //                        <p className="text-xs flex items-center gap-x-2 font-normal text-gray-600 dark:text-gray-400"><span><PhoneIcon className="h-3"/></span>{order.customer.phone}</p>
    //                    </div>
    //                </div>
    //            </td>
    //            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.mode}</td>
    //            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">$ {order.total}</td>
    //            <td className="px-4 py-4 text-sm whitespace-nowrap">
    //                <div className="flex items-center gap-x-6">
    //                    <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
    //                        <ArrowsPointingOutIcon className="h-3" onClick={()=>setView_full_orders((e)=>({...e,open:true,invoice:order.invoice}))}/>
    //                    </button>
    //                    <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
    //                        Download
    //                    </button>
    //                </div>
    //            </td>
    //        </tr>
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

    // console.log(Loading,orders,"loading")



    return(
<>
    <section className="px-4 pb-4">
        <div className="mt-6 md:flex md:items-center md:justify-between">
            <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                <button className={"flex items-center px-5 py-2 text-xs font-medium transition-colors duration-200 hover:bg-gray-800 "+ (isActive=="1" ? "bg-gray-800 text-gray-300" : "text-gray-300")} onClick={()=>setIsActive("1")}>
                    <span>View All</span>
                </button>
                <button className={"flex items-center px-5 py-2 text-xs font-medium transition-colors duration-200 hover:bg-gray-800 "+ (isActive=="2" ? "bg-gray-800 text-gray-300" : "text-gray-300")} onClick={()=>setIsActive("2")}>
                    Cancelled
                </button>
                <button className={"flex items-center px-5 py-2 text-xs font-medium transition-colors duration-200 hover:bg-gray-800 "+ (isActive=="3" ? "bg-gray-800 text-gray-300" : "text-gray-300")} onClick={()=>setIsActive("3")}>
                    Refunded
                </button>
            </div>
            <div className="relative flex items-center mt-4 md:mt-0">
                <span className="absolute">
                    <MagnifyingGlassIcon className="w-4 h-4 mx-2 text-gray-500 sm:w-6 sm:h-6"/>
                </span>
                <input type="text" placeholder="Search" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
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
                                                <span>Invoice</span>
                                                <span>< ArrowsUpDownIcon className="h-3"/></span>
                                            </button>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <button className="flex items-center gap-x-2">
                                            <span>Date</span>
                                            <span>< ArrowsUpDownIcon className="h-3"/></span>
                                        </button>
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <button className="flex items-center gap-x-2">
                                            <span>Status</span>
                                            <span>< ArrowsUpDownIcon className="h-3"/></span>
                                        </button>
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <button className="flex items-center gap-x-2">
                                            <span>Customer</span>
                                            <span>< ArrowsUpDownIcon className="h-3"/></span>
                                        </button>
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <button className="flex items-center gap-x-2">
                                            <span>Mode</span>
                                            <span>< ArrowsUpDownIcon className="h-3"/></span>
                                        </button>
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <button className="flex items-center gap-x-2">
                                            <span>Total</span>
                                            <span>< ArrowsUpDownIcon className="h-3"/></span>
                                        </button>
                                    </th>
                                    <th scope="col" className="relative py-3.5 px-4">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                {/* {all_Order} */}
                                {Loading.orders || orders==undefined ? skeleton : 
                                    orders.map((order,index)=>(
                                        <tr key={order.invoice}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"># {order.invoice}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.date}</td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                {status(order.status)}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <div className="flex items-center gap-x-2">
                                                    <div>
                                                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{order.customer.name}</h2>
                                                        <p className="text-xs flex items-center gap-x-2 font-normal text-gray-600 dark:text-gray-400"><span><PhoneIcon className="h-3"/></span>{order.customer.phone}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.mode}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">$ {order.total}</td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-6">
                                                    <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                                        <ArrowsPointingOutIcon className="h-3" onClick={()=>setView_full_orders((e)=>({...e,open:true,invoice:order.invoice}))}/>
                                                    </button>
                                                    <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                        Download
                                                    </button>
                                                </div>
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
    {/* <View_full_orders view_full_orders={openView_full_orders} setView_full_orders={setView_full_orders} /> */}
</>
    )
}
