import {useContext} from 'react'
import { ItemPortal } from "../in.jsx";
import { TrashIcon } from '@heroicons/react/20/solid';

function OrderedItems(){
    const {cart,setCart}=useContext(ItemPortal)


    const increaseQuantity=(items)=>{
            setCart((cart)=>({...cart,
            cart:cart.cart.map(
              item=>item.id===items.id ? {...item,quantity:item.quantity+1}:item),
          }))
        }
    const decreaseQuantity=(items)=>{            
        setCart((cart)=>({...cart,
            cart:cart.cart.map(
              item=>item.id===items.id ? {...item,
                quantity: (item.quantity-1)> 0 ? item.quantity-1 : 0
            }:item),
          }))
    }
    const removeItem=(item)=>{
        const newCart=cart.cart.filter(items=>items.id !=item)
        setCart((prevCart)=>({...prevCart,cart:newCart}))
    }

    const orderedItems=cart.cart.map((items, index) =>(
        <div key={index} className="item-div">
            <div className='grid-container'>
                <div className='middle'>
                    <div className="square middle"># {items.id}</div>
                </div>
                <div className="container-row">
                    <div className="item-name">{items.product}</div>
                    <div className="button-container ">
                        <div className="middle" onClick={()=>decreaseQuantity(items)} >-</div>
                        <div className="middle">{items.quantity}</div>
                        <div className="middle" onClick={()=>increaseQuantity(items)} >+</div>
                    </div>
                </div>
                <div className='grid grid-rows-2'>
                    <div className='middle'>$ {items.price}</div>
                    <div className='middle'>
                        <div className='circle middle'>{items.size}</div>
                        </div>
                </div>
                <div className="middle close">
                    <TrashIcon className="col-start-1 row-start-1 size-5 self-center ml-3 text-gray-400 sm:size-4" onClick={()=>removeItem(items.id)}/>
                </div>
            </div>
        </div>
    ))

    
    const empty=
    <>
        <div className="middle cart-empty">
             Your Cart is Empty
        </div>
    </>

    return (
        <>
        { cart.cart.length>0 ? orderedItems : empty}
        </>
    )
}            

export default OrderedItems


