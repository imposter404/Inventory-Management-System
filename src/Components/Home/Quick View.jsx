import { useState,useContext} from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ItemPortal } from '../in'


import {Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'



export default function QuickView() {
  const {products,drinks,cart,setCart,showQuickView,setShowQuickView}=useContext(ItemPortal)
  var match_product=""
  const [match_product_size_index,setMatch_product_size_index]=useState(0)
  if(showQuickView.open==true){
    match_product=products.find((products)=>products.id==showQuickView.id)
  }

  const addItems = (product) => {
    console.log("original",product,match_product_size_index)
    product={...product,...product.size[match_product_size_index]}
    cart.cart.length===0 ? setCart((prevCart) => ({...prevCart,cart:[...cart.cart,{...product,quantity:1}]})) :
      cart.cart.find((items)=>items.id===product.id && items.size===product.size) ? setCart((cart)=>({...cart,cart:cart.cart.map(item=>item.id===product.id && item.size===product.size ? {...item,quantity:item.quantity+1}:item)})) :
        setCart((prevCart) => ({...prevCart,cart:[...cart.cart,{...product,quantity:1}]}))
  };

  console.log("cart",cart.cart)

  function setSize(size){
    setMatch_product_size_index(match_product.size.findIndex(e=>e.size==size))
    console.log("match_product_size_index",match_product_size_index)
  }

  const people = [
    {id: 1,name: 'S', },
    {id: 2,name: 'M'},
    {id: 3,name: 'L'},
  ]
  const [selected, setSelected] = useState(people[0])

  console.log(match_product.size)

  return (
    <Dialog open={showQuickView.open} onClose={() =>setShowQuickView((show)=>({...show,open:false}))} className="modal relative z-10">
      <DialogBackdrop transition className=" fixed inset-0 hidden bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:block"/>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel transition className="flex w-full transform text-left text-base transition data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:my-8 md:max-w-2xl md:px-4 data-closed:md:translate-y-0 data-closed:md:scale-95 lg:max-w-4xl">
            <div className="modal-box relative flex w-full items-center px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button type="button" onClick={() =>setShowQuickView((show)=>({...show,open:false}))} className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8">
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
              <div className="grid-container">
                <div className="middle">
                  <div className="card"></div>
                </div>
                <div className="container">
                  <div className="product center left">{match_product.product}</div>
                  <div className="price center left">$ {match_product.size[match_product_size_index].price}</div>
                  <div className="quantity center left">x {match_product.size[match_product_size_index].quantity}</div>
                  <div className="size">
                    <Listbox value={selected} onChange={setSelected}>
                      <div className="relative size-full">
                        <ListboxButton className="grid size-full middle grid-cols-1">
                          <span>{selected.name}</span>
                          <span><ChevronDownIcon className='h-4 pl-6'/></span>
                        </ListboxButton>
                        <ListboxOptions
                          transition
                          className="absolute w-full z-10 mt-1 max-h-56  overflow-auto rounded-md bg-gray-800 py-1 mt-6 text-base outline-1 -outline-offset-1 outline-white/10 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                        >
                          {match_product.size.map((size,index) => (
                            <ListboxOption
                              key={index}
                              value={size.size}
                              className="group relative py-4 pr-3 pl-3 cursor-pointer text-white select-none data-focus:bg-indigo-500 data-focus:outline-hidden" 
                            >
                              <div className="flex items-center">
                                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{size.size}</span>
                              </div>
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </div>
                    </Listbox>
                  </div>
                  <div className="add center left" onClick={()=>{addItems(match_product);setShowQuickView((show)=>({...show,open:false}))}}>ADD</div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
