import { CheckCircleIcon, ShoppingCartIcon,BellIcon } from "@heroicons/react/24/outline";

export default function Tabs({tab,setTab}){


    function isActive(e){
        if (e==tab){
            return "inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:px-4 -px-1 dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none"
        }
        else{
            return "inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400"
        }
    }

    return(
        <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
            <button className={isActive("Order")} onClick={()=>setTab("Order")}>
                <ShoppingCartIcon className="w-4 h-4 mx-1 sm:w-6 sm:h-6"/>
                <span className="mx-1 text-sm sm:text-base">
                    Orders
                </span>
            </button>
            <button className={isActive("Products")} onClick={()=>setTab("Products")}>
                <CheckCircleIcon className="w-4 h-4 mx-1 sm:w-6 sm:h-6"/>
                <span className="mx-1 text-sm sm:text-base">
                    Products
                </span>
            </button>

            <button className={isActive("noooo")}>
                <BellIcon className="w-4 h-4 mx-1 sm:w-6 sm:h-6"/>

                <span className="mx-1 text-sm sm:text-base">
                    Notification
                </span>
            </button>
        </div>
    )
}