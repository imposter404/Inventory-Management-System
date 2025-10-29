import { useState,useContext,useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, Tab } from '@headlessui/react'

import "./view_full_orders.css"
import { ArrowsPointingOutIcon, ArrowsUpDownIcon, ArrowUturnLeftIcon, CheckIcon, PhoneIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { ItemPortal } from '../../in'


export default function View_full_orders({view_full_orders,setView_full_orders}) {
    const {products,orders}=useContext(ItemPortal)
    var data=orders.filter(order=>order.invoice==view_full_orders.invoice)[0]


    function status(status){
        switch (status){
            case "paid":
                return (
                    <div className="inline-flex justify-self-end items-center px-6 py-3 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                        <CheckIcon className="h-3"/>
                        <h2 className="text-sm font-normal">Paid</h2>
                    </div>)
            case "canceled":
                return(
                    <div className="inline-flex justify-self-end items-center px-6 py-3 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                        <XMarkIcon className="h-3"/>
                        <h2 className="text-sm font-normal">Cancelled</h2>
                    </div>
                )
            case "refunded":
                return(
                    <div className="inline-flex justify-self-end items-center px-6 py-3 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                        <ArrowUturnLeftIcon className="h-3"/>
                        <h2 className="text-sm font-normal">Refunded</h2>
                    </div>
                )
        }
    }
    const all_Order=data.items.map((order,index)=>(
            <tr key={index}>
              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">{order.id}</td>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{order.product}</td>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">$ {order.price}</td>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">x {order.quantity}</td>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">$ {order.total}</td>
           </tr>
    ))

  // const [tab,setTab]=useState("Order")
  return (
      <div className={'offcanvas '+(view_full_orders.open==true ? "show" : "")}>
    {/* //   <div className={(view_full_orders.open==true ? "offcanvas  show" : "offcanvas")}> */}
        <div className='flex-container'>
          <div className='card'>
            <div className='pb-4'>
                <div className='grid grid-cols-2 items-center'>
                  <div className='text-xl'>#3050</div>
                  <button className='text-xl justify-self-end' onClick={()=>{setView_full_orders(e=>({...e,open:false}))}}><XMarkIcon className='h-10'/></button>
                </div>
                <div className='grid grid-cols-2 py-2 items-center'>
                    <div className='text-5xl'>{data.customer.name}</div>
                   {status(data.status)}

                </div>
                <div className='grid grid-cols-2 py-2 items-center'>
                    <div className='text-2xl'>{data.customer.phone}</div>
                    <div className='text-2xl px-2 justify-self-end'>{data.mode}</div>
                </div>
                <div className='text-xl'>{data.date}</div>
            </div>
            <div>
              <section className="container mx-auto">
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <span>Id</span>
                                                </div>
                                            </th>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                        <span>Product</span>
                                                </div>
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <span>Price</span>
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <span>Quantity</span>
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <span>Total</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                      {all_Order}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
          </div>
        </div>
      </div>
  )
}
