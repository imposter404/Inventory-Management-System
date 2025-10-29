import {useEffect} from 'react'

export default function Total({cart,setCart}){

    useEffect(()=>{
        const calculateSubTotal=cart.cart.reduce((acc,curr)=> acc + Number(curr.price) * Number(curr.quantity),0)
        const calculateTotal=calculateSubTotal-cart.discount
        setCart(prevCart=>({...prevCart,subTotal:calculateSubTotal,totalPrice:calculateTotal}))
    },[cart.cart])

    const resetCart=()=>{
        setCart({cart:[],totalQuantity:0,subTotal:0,discount:0,totalPrice:0})
    }

    function discount(e){
        setCart(prevCart=>({...prevCart,discount:e.target.value}))
        const calculateTotal=cart.subTotal-e.target.value
        setCart(prevCart=>({...prevCart,totalPrice:calculateTotal}))
    }


    return(
        <div className="total">
            <hr className="dash-hr"></hr>
            <div className="subtotal container">
                <div className="middle left">Subtotal</div>
                <div className="right">{cart.subTotal}</div>
            </div>
            <div className="discount container">
                <div className="center left">Discount</div>
                {/* <div className="right">{cart.discount}</div> */}
                <div className="right"><input type="number" value={cart.discount} onChange={discount}/></div>
            </div>
            <hr className="dash-hr"></hr>
            <div className="container">
                <div className="middle left">Total</div>
                <div className="right">{cart.totalPrice}</div>
            </div>
            <div className="container payment">
                <div className="circle middle" onClick={resetCart}>^</div>
                <div className="pay middle">Pay</div>
            </div>
        </div>
    )
}