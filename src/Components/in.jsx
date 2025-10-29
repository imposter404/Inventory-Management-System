import {useState,createContext, useEffect} from 'react'
import './in.css';
import './Home/css/left.css'
import './Home/css/right.css'
import './Home/css/middle.css'


import OrderedItems from './Home/ordered-items.jsx';
import Items from './Home/items.jsx';
import Total from './Home/total.jsx'
import { Search } from './Home/search.jsx';
import SelectMenu from './Home/Select Menu.jsx';
import QuickView from './Home/Quick View.jsx';
import Home_tab_dashboard from './Dashboard/home_tab_dashboard.jsx';
// import orders_fetch from"./data/Order.json"
// import products_fetch from"./data/product.json"




export const SearchPortal=createContext()
export const ItemPortal=createContext()

function In(){
  const initialstate={
    cart:[],
    totalQuantity:0,
    subTotal:0,
    discount:0,
    totalPrice:0
  }



  var orders_fetch,products_fetch
    useEffect(()=>{
      fetch("http://localhost:8080/api/data/Products")
      .then(res=>res.json())
      .then(res=>{
        setProducts(res.msg);
        setLoading((e)=>({...e,products:false}))
      })
    //   fetch("http://localhost:8080/api/data/Orders")
    //   .then(res=>res.json())
    //   .then(res=>{
    //     setOrders(res.msg);
    //     setLoading((e)=>({...e,orders:false}))
    //   })
    },[])




  const [cart, setCart] = useState(initialstate);
  const [tab,setTab] = useState("Food")
  const [searchInputValue,setSearchInputValue]=useState("")
  const [products,setProducts]=useState(products_fetch)
  const [orders,setOrders]=useState(orders_fetch)
  const [showQuickView,setShowQuickView]=useState({open:false,id:"",data:""})
  const [openHome_tab_dashboard,setHome_tab_dashboard]=useState(true)
  const SearchPortal_values={tab}
  const [Loading,setLoading]=useState({products:true,orders:true,chart_data:true})
  const ItemPortal_values={Loading,setLoading,products,orders,setOrders,cart,setCart,tab,searchInputValue,showQuickView,setShowQuickView,openHome_tab_dashboard,setHome_tab_dashboard}










  const skeleton=<>
<div class="flex w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-800">
    <div class="w-1/3 bg-gray-300 dark:bg-gray-600"></div>

    <div class="w-2/3 p-4 md:p-4">
        <h1 class="w-40 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

        <p class="w-48 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>

        <div class="flex mt-4 item-center gap-x-2">
            <p class="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            <p class="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            <p class="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            <p class="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            <p class="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
        </div>

        <div class="flex justify-between mt-6 item-center">
            <h1 class="w-10 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

            <div class="h-4 bg-gray-200 rounded-lg w-28 dark:bg-gray-700"></div>
        </div>
    </div>
</div>
  </>




return (
<>    
  <div className="home">
    <div className="grid-container">
        {/* left side */}
        <div className="box left red container">
            <div className="card">
                <div className="container">
                    <div className="name middle">
                        <div>
                            <div className="">GAS POS</div>
                        </div>
                    </div>
                    <div className="nav">
                        <input type="radio" name="tab" id="r1" />
                        <label className="tabs" htmlFor={"r1"} onClick={()=>{setTab("Food")}}>Food</label>
                        <input className="flex-div" type="radio" name="tab" id="r2" />
                        <label className="tabs"htmlFor={"r2"} onClick={()=>{setTab("Drinks")}}>Drinks</label>
                        <div className="glider"></div>  
                    </div>
                    <div className="nav last">
                        <div className="tabs" onClick={()=>setHome_tab_dashboard(true)}>Dashboard</div>
                    </div>
                </div>
            </div>
            {/* <Cashier/> */}
            <div>
                <div className="card">
                </div>
            </div>
        </div>

        {/* middle */}
        <div className="box red middle-container">
            <SearchPortal.Provider value={SearchPortal_values}>
                <Search search={searchInputValue} set={setSearchInputValue}/>
            </SearchPortal.Provider>
            <ItemPortal.Provider value={ItemPortal_values}>
                <Items/>
                {/* {products==undefined ? skeleton:<Items/>} */}
                {showQuickView.open && <QuickView/>}
            </ItemPortal.Provider>
            <div className="today">Today</div>
        </div>



        {/* right side */}
        <div className="box right red container">
            <div className="card container">
                <div className="order container">
                    <div className="middle order-id">Order #95 </div>
                    <div className="middle ">
                        <SelectMenu/>                 
                    </div>
                </div>
                <div className="item">
                    <ItemPortal.Provider value={ItemPortal_values}>
                        <OrderedItems/>
                    </ItemPortal.Provider>
                </div>
                <Total cart={cart} setCart={setCart}/>
            </div>
        </div>
    </div>

    <ItemPortal.Provider value={ItemPortal_values}>
        <Home_tab_dashboard/>
    </ItemPortal.Provider>    
  </div>
</>
)




}


export default In;
