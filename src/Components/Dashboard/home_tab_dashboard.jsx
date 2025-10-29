import { useState,useContext } from 'react'
import Tabs from './tab_inventory/tab.jsx'
import Table_Product from './tab_inventory/Table_Product.jsx'
import Table_Order from './tab_inventory/Table_Order.jsx'
import "./home_tab_dashboard.css"
import { ItemPortal } from '../in.jsx'
import { XMarkIcon,ChartBarIcon, Cog8ToothIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import Tab_Inventory from './tab_inventory/tab_inventory.jsx'
import Tab_Dashboard from './tab_dashboard/tab_dashboard.jsx'

export default function Home_tab_dashboard() {
  
  const {openHome_tab_dashboard,setHome_tab_dashboard}=useContext(ItemPortal)
  const [tabActive,setTabActive]=useState("Inventory")
  

  const [stats,setStats]=useState({ revenue:[30, 20, 30, 40, 30, 40, 50, 60], profit:[30, 20, 30, 40, 30, 40, 50, 60], orders:[30, 20, 30, 40, 30, 40, 50, 60], products:[30, 20, 30, 40, 30, 40, 50, 60]} )
  const [lineChart,setLineChart]=useState(
    { week: { revenue:[30, 20, 30, 40, 30, 40, 50, 60], profit:[30, 20, 30, 40, 30, 40, 50, 60], orders:[30, 20, 30, 40, 30, 40, 50, 60], products:[30, 20, 30, 40, 30, 40, 50, 60]} ,
      month:{ revenue:[30, 20, 30, 40, 30, 40, 50, 60], profit:[30, 20, 30, 40, 30, 40, 50, 60], orders:[30, 20, 30, 40, 30, 40, 50, 60], products:[30, 20, 30, 40, 30, 40, 50, 60]}
    })









  return (
<>
    <div className={'offcanvas '+(openHome_tab_dashboard==true ? "slide-in-bottom" : "slide-out-bottom")}>
      <div className="tab_inventory fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className='navbar'>
          <aside className="flex flex-col w-full h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
              <div className="flex flex-col justify-between flex-1 mt-2">
                  <nav>
                      <div className={"flex items-center px-4 py-2 cursor-pointer transition-colors duration-300 transform rounded-md dark:hover:bg-gray-800 "+(tabActive=="Inventory" ? "bg-gray-800 text-gray-200" : "text-gray-400")} onClick={()=>setTabActive("Inventory")}>
                          <ShoppingCartIcon className="h-4"/>
                          <span className="mx-4 font-medium">Inventory</span>
                      </div>
                      <div className={"flex items-center px-4 py-2 mt-5 cursor-pointer transition-colors duration-300 transform rounded-md hover:bg-gray-800 "+(tabActive=="Dashboard" ? "bg-gray-800 text-gray-200" : "text-gray-400")} onClick={()=>setTabActive("Dashboard")}>
                          <ChartBarIcon className="h-4"/>
                          <span className="mx-4 font-medium">Dashboard</span>
                      </div>

                      <hr className="my-6 border-gray-200 dark:border-gray-600" />

                      <div className="flex items-center px-4 py-2 mt-5 cursor-pointer transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                          <Cog8ToothIcon className="h-4"/>
                          <span className="mx-4 font-medium">Settings</span>
                      </div>
                  </nav>

                  <div href="#" className="grid items-center">
                      <hr className="my-6 border-gray-200 dark:border-gray-600 w-full" />
                      {/* <img className="object-cover mx-2 rounded-full h-9 w-9" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" /> */}
                      <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">John Doe</span>
                  </div>
              </div>
          </aside>
        </div>
        <div className="container1 ">
          <button className='absolute top-5 right-10' onClick={()=>setHome_tab_dashboard(false)}><XMarkIcon className='h-6'/></button>
          <div className='font-medium text-3xl'>{tabActive=="Inventory" ? "Inventory" : "Dashboard"}</div>
          <hr className="mt-4 mb-6 border-gray-200 dark:border-gray-600" />
          <div className='overflow-auto h-[88dvh]'>
            {tabActive=="Inventory" ? <Tab_Inventory/>: <Tab_Dashboard stats={stats} setStats={setStats} lineChart={lineChart} setLineChart={setLineChart} />}
          </div>
        </div>
      </div>
    </div>
</>
  )
}

