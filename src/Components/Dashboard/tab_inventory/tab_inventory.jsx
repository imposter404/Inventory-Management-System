import { useState } from "react"
import Tabs from "./tab"
import Table_Order from "./Table_Order"
import Table_Product from "./Table_Product"

export default function Tab_Inventory(){
  const [tab,setTab]=useState("Products")

  function openTab(){
    switch (tab){
      case "Order":
        return (
        <Table_Order/>
      )
      case "Products":
        return <Table_Product/>
    }
  }
    return (
        <div className='tabs'>
            <div className='tabs'>
              <Tabs tab={tab} setTab={setTab}/>
            </div>
            <div className='table-container'>
              {openTab()}
            </div>
        </div>
    )
}