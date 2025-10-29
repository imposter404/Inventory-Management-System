import {useContext, } from 'react'
import "./view_full_orders.css"
import { ItemPortal } from '../../in'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline'


export default function View_full_product({view_full_product,setView_full_product}) {
    const {products}=useContext(ItemPortal)

    var data=products.filter(product=>product.id==view_full_product.id)[0]

    const all_Order=data.size.map((product,index)=>(
            <tr key={index}>
              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">{product.size}</td>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">$ {product.price}</td>
              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">x {product.quantity}</td>
           </tr>
    ))
    

  return (
      <div className={'offcanvas '+(view_full_product.open==true ? "show" : "")}>
        <div className='flex-container'>
          <div className='card'>
            <div className='pb-4'>
                <div className='grid grid-cols-2 items-center'>
                  <div className='text-xl'># {data.id}</div>
                  <button className='text-xl justify-self-end' onClick={()=>{setView_full_product(e=>({...e,open:false}))}}><XMarkIcon className='h-10'/></button>
                </div>
                <div className='grid grid-cols-2 py-2 '>
                    <div className='text-5xl'>{data.product}</div>
                    <button className='grid grid-cols-2 justify-self-end items-end px-8 py-4 font-medium trcking-wide w-[40%] capitalize text-white transition-colors duration-300 transform bg-red-600 rounded-3xl hover:bg-red-500 foucus:outline-none focus:ring focus:ring-red-300 focus-ring-opacity-80'><PencilIcon className='h-6'/><span>Modify</span></button>
                </div>
                <div className='grid grid-cols-2 py-2 items-center'>
                    <div className='text-2xl'>{data.catagory}</div>
                </div>
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
                                              <span>Size</span>
                                            </th>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                              <span>price</span>
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                              <span>Quantity</span>
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
              <button className='grid grid-cols-2 items-end px-8 py-2 mt-6 font-medium trcking-wide w-[20%] capitalize text-white transition-colors duration-300 transform bg-blue-600 rounded-3xl hover:bg-blue-500 foucus:outline-none focus:ring focus:ring-blue-300 focus-ring-opacity-80'><PlusIcon className='h-6'/><span>Size</span></button>
            </div>
          </div>
        </div>
      </div>
  )
}
