import {useState,useContext,useEffect} from 'react'
import { ItemPortal } from "../in.jsx";

function Items(){

  const {Loading,products,cart,setCart,tab,searchInputValue}=useContext(ItemPortal)
  const {showQuickView,setShowQuickView}=useContext(ItemPortal)


  const addItems = (product) => {
    product={...product,...product.size[0]}
    if(cart.cart.length===0){
      setCart((prevCart) => ({...prevCart,cart:[...cart.cart,{...product,quantity:1}]}))
    }
    else{
        if(cart.cart.find((items)=>items.id===product.id)){
          setCart((cart)=>({...cart,
            cart:cart.cart.map(
              item=>item.id===product.id ? {...item,quantity:item.quantity+1}:item),
          }))
        }
        else{
          setCart((prevCart) => ({...prevCart,cart:[...cart.cart,{...product,quantity:1}],
          }))
        }
    }
  };

  var tab_data;
  const [data,setData]=useState()

    
    useEffect(()=>{
      if(products!=undefined){
        tab=="Food" ? tab_data=products.filter(e=>e.catagory=="Food") : tab_data=products.filter(e=>e.catagory=="Drinks");
        setData(tab_data)
        console.log(Loading,products,tab_data,tab)
      }
    },[Loading])


    useEffect(()=>{
      if(data!=undefined){
        tab=="Food" ? tab_data=products.filter(e=>e.catagory=="Food") : tab_data=products.filter(e=>e.catagory=="Drinks");
        setData(tab_data)
      }
    },[tab])

    // useEffect(()=>{
    //   searchInputValue=="" ? setData(tab_data) : 
    //    setData(tab_data.filter((item)=>{
    //     return (item.product.toUpperCase()).includes(searchInputValue.toUpperCase())
    //   }))
    // },[searchInputValue])

    function openQuickView(e){
      setShowQuickView(view=>({...view,open:true,id:e,data:tab=="Food" ? "products" : "drinks"}))
    }

    // const item=data.map((items, index) =>(
    //     <div key={index} className="grid-card-container middle">
    //       <div  className="card-container">
    //           <div className="card-area middle" onClick={()=>openQuickView(items.id)}>
    //               {/* <div className="card middle"># {items.id}</div> */}
    //               <div className="card middle"><i className="bi bi-arrow-right"></i></div>
    //           </div>
    //           <div className="productName center left">{items.product}</div>
    //           <div className="price center left">$ {items.size[0].price}</div>
    //           <div className="add middle" onClick={()=>{addItems(items)}}>+</div>
    //       </div>
    //     </div>
    // ))

    // const skeleton=<div className="grid-card-container middle">
    //       <div  className="card-container">
    //           <div className="card-area middle">
    //               <div className="card middle"><i className="bi bi-arrow-right"></i></div>
    //           </div>
    //           <div className="productName center left"></div>
    //           <div className="price center left">$ </div>
    //           <div className="add middle">+</div>
    //       </div>
    //     </div>

    // const skeleton=Array.prototype.fill('<div>Hi</div>')
    const skeleton=Array(8).fill().map((e,index)=>(
      <div key={index} className="grid-card-container middle">
        <div  className="card-container">
          <div className="card-area middle">
            <div className="card middle"><i className="bi bi-arrow-right"></i></div>
          </div>
          <div className="productName center left"></div>
          <div className="price center left"></div>
          <div className="add middle">+</div>
        </div>
      </div>
    ))
    
    return (
      <>
      <div className={"items container "+(Loading.products ? "grayscale animate-pulse": "")}>
        { (data==undefined) || Loading.products  ? skeleton
        : 
        data.map((items, index) =>(
        <div key={index} className="grid-card-container middle">
          <div  className="card-container">
              <div className="card-area middle" onClick={()=>openQuickView(items.id)}>
                  {/* <div className="card middle"># {items.id}</div> */}
                  <div className="card middle"><i className="bi bi-arrow-right"></i></div>
              </div>
              <div className="productName center left">{items.product}</div>
              <div className="price center left">$ {items.size[0].price}</div>
              <div className="add middle" onClick={()=>{addItems(items)}}>+</div>
          </div>
        </div>
        ))
        }
      </div>
      </>
      )
}
export default Items