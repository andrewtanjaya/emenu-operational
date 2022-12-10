import React, { useEffect } from 'react'
import KitchenOrderQueueCard from '../KitchenOrderQueueCard/KitchenOrderQueueCard'
import './KitchenOrderQueueGroup.css'

function KitchenOrderQueueGroup({data}) {
    useEffect(() => {
      console.log("luar",data)
    }, [])
    
  return (
    <div className='order-queue-group-container'>
        {
            data ? data[1].map((d) => {
                return <KitchenOrderQueueCard data={d}/>
            }) : <></>
        }
        <div className='order-queue-group-footer'><p><b>#{data[1][0].orderId}</b></p></div>
    </div>
  )
}

export default KitchenOrderQueueGroup