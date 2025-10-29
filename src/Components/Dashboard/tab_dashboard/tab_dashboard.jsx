
import { useContext, useEffect, useState } from "react"
import Line_chart from "./chart line"
import App from "./chart line"
import Area_chart from "./chart area"
import "./tab_dashboard.css"
import { CalendarDateRangeIcon, CalendarDaysIcon, CalendarIcon } from "@heroicons/react/24/outline"
import { ItemPortal } from "../../in"

export default function Tab_Dashboard({stats,setStats,lineChart,setLineChart}){
  const {Loading,setLoading}=useContext(ItemPortal)
  const month=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]

    if(Loading.chart_data==true){
      console.log("21")
      fetch("http://localhost:8080/api/data/d")
      .then(res=>res.json())
      .then(res=>{
        setStats({
          revenue:res.msg.week.map((e)=>(e.revenue)),
          profit:res.msg.week.map((e)=>(e.profit)),
          orders:res.msg.week.map((e)=>(e.orders)),
          products:res.msg.week.map((e)=>(e.products))
        })
        setLineChart({
          month:{
            revenue:res.msg.month.map((e)=>(e.revenue)),
            profit:res.msg.month.map((e)=>(e.profit)),
            orders:res.msg.month.map((e)=>(e.orders)),
            products:res.msg.month.map((e)=>(e.products)),
            date:res.msg.month.map((e)=>(e.date.split("/")[0]+"/"+month[Number(e.date.split("/")[1])]))
          },
          week:{
            revenue:res.msg.week.map((e)=>(e.revenue)),
            profit:res.msg.week.map((e)=>(e.profit)),
            orders:res.msg.week.map((e)=>(e.orders)),
            products:res.msg.week.map((e)=>(e.products)),
            date:res.msg.week.map((e)=>(e.date.split("/")[0]+"/"+month[Number(e.date.split("/")[1])]))
          }
        })
        setLoading((e)=>({...e,chart_data:false}))
      })
    }

  const[activeBtnDate,setActiveBtnDate]=useState("Today")

  function setLineChartData(){
    switch (activeBtnDate){ case "Today":return lineChart.week; case "Week": return lineChart.week; case "Month":return lineChart.month}
  }
  
    






  function Total(e){
    var total=e.reduce((total,current)=>total+current,0)
    return total
  }

  function Percentage(e){
    var percentage=Math.floor(e.at(-1)/e[0]*100)
    if(e.at(-1)>e[0]){
      return "+"+percentage
    }
    else{
      return "-"+percentage
    }
    
  }
  
    return (
      <div className="dashboard">
        <div className="stats grid grid-cols-4 item-center">
          <div className={"card relative grid items-end "+(Loading.chart_data && "grayscale animate-pulse")}>
            {stats!=undefined && < Area_chart newData={stats.revenue} fill={(stats.revenue[0]>stats.revenue.at(-1)? ["#FF0000"] : ["#00AA00"])}/>} 
            <div className="absolute top-4 left-6 w-32">
              <div className="grid grid-cols-2 items-center mb-2">
                <div>Revenue</div>
                <div className="justify-self-end">{stats==undefined ? 0 : Percentage(stats.revenue)}%</div>
              </div>
              <div className="text-3xl">${stats==undefined ? 0 :Total(stats.revenue)}</div>
            </div>
          </div>

          <div className={"card relative grid items-end "+(Loading.chart_data && "grayscale animate-pulse")}>
            {stats!=undefined && <Area_chart newData={stats.profit} fill={(stats.profit[0]>stats.profit.at(-1)? ["#FF0000"] : ["#00AA00"])}/>}
            <div className="absolute top-4 left-6 w-32">
              <div className="grid grid-cols-2 items-center mb-2">
                <div>Profit</div>
                <div className="justify-self-end">{stats==undefined ? 0 : Percentage(stats.profit)}%</div>
              </div>
              <div className="text-3xl">${stats==undefined ? 0 : Total(stats.profit)}</div>
            </div>
          </div>

          <div className={"card relative grid items-end "+(Loading.chart_data && "grayscale animate-pulse")}>
            {stats!=undefined && <Area_chart newData={stats.orders} fill={(stats.orders[0]>stats.orders.at(-1)? ["#FF0000"] : ["#00AA00"])}/>}
            <div className="absolute top-4 left-6 w-32">
              <div className="grid grid-cols-2 items-center mb-2 ">
                <div>Orders</div>
                <div className="justify-self-end">{stats==undefined ? 0 : Percentage(stats.orders)}%</div>
              </div>
              <div className="text-3xl">x{stats==undefined ? 0 :Total(stats.orders)}</div>
            </div>
          </div>

          <div className={"card relative grid items-end "+(Loading.chart_data && "grayscale animate-pulse")}>
            {stats!=undefined && <Area_chart newData={stats.products}/>}
            <div className="absolute top-4 left-6 w-32">
              <div className="grid grid-cols-2 items-center mb-2">
                <div>Product</div>
                <div className="justify-self-end">{stats==undefined ? 0 : Percentage(stats.products)}%</div>
              </div>
              <div className="text-3xl">x{stats==undefined ? 0 : Total(stats.products)}</div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-600" />
        <div className="grid grid-rows-2 w-[20%] ">
            <div className="flex h-8">
              <button className={"flex items-center px-4 cursor-pointer transition-colors duration-300 transform rounded-md  "+(activeBtnDate=="Today" ? "bg-blue-700 text-gray-200" : "bg-gray-800 text-gray-400 dark:hover:bg-gray-800")} onClick={()=>setActiveBtnDate("Today")}>
                  <CalendarIcon className="h-4"/>
                  <span className="mx-4 font-medium">Today</span>
              </button>
              <button className={"flex items-center px-4 py-2 cursor-pointer transition-colors duration-300 transform rounded-md "+(activeBtnDate=="Week" ? "bg-blue-700 text-gray-200" : "bg-gray-800 text-gray-400 dark:hover:bg-gray-800")} onClick={()=>setActiveBtnDate("Week")}>
                  <CalendarDateRangeIcon className="h-4"/>
                  <span className="mx-4 font-medium">Week</span>
              </button>
              <button className={"flex items-center px-4 py-2 cursor-pointer transition-colors duration-300 transform rounded-md "+(activeBtnDate=="Month" ? "bg-blue-700 text-gray-200" : "bg-gray-800 text-gray-400 dark:hover:bg-gray-800")} onClick={()=>setActiveBtnDate("Month")}>
                  <CalendarDaysIcon className="h-4"/>
                  <span className="mx-4 font-medium">Month</span>
              </button>
            </div>
            <hr className="my-4 border-gray-200 dark:border-gray-600" />
        </div>
        <div className={"h-[500px] bg-fuchsia-950 rounded-3xl relative "+(Loading.chart_data && "grayscale animate-pulse")}>
          {lineChart!=undefined && <Line_chart newData={setLineChartData()}/>}
        </div>
        <div className="bg-green-800 w-[20%] my-6 py-6 px-12 rounded-2xl">
          <div className="grid grid-cols-2 py-2">
            <div className="text-xl">Orders</div>
            <div className="justify-self-end">{lineChart!=undefined && console.log(setLineChartData(),"ee")}</div>
          </div>
          <div className="grid grid-cols-2 py-2">
            <div className="text-xl">Product</div>
            <div className="justify-self-end">x20</div>
          </div>
          <div className="grid grid-cols-2 py-2">
            <div className="text-xl">Customer</div>
            <div className="justify-self-end">x20</div>
          </div>
          <hr className="my-4 mx-2"/>
          <div className="grid grid-cols-2 py-2">
            <div className="text-xl">Revenue</div>
            <div className="justify-self-end">$20</div>
          </div>
          <div className="grid grid-cols-2 py-2">
            <div className="text-xl">Profit</div>
            <div className="justify-self-end">$20</div>
          </div>
        </div>
      </div>
      
    )
}