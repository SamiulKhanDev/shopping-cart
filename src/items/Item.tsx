import React from 'react'
import { Button } from '@material-ui/core'
import { Wrapper } from './item.styled'
import { Product } from '../App'

interface props {
    item: Product;
    handleAddToCart:(clickedItem:Product)=>null
}


const Item: React.FC<props> = ({item,handleAddToCart }) => {
    return (
        <Wrapper>
            <img src={`${item.image}`} alt={ `${item.title}`}/> 
            <div>
                <h3>{`${item.title}`}</h3>
                <p>{`${item.description}`}</p>
                <h3>{`${parseInt(`${item.price*74}`)} rupees`}</h3>
            </div>
            <button onClick={()=>handleAddToCart(item) }>Add To Cart</button>
       </Wrapper>
    )
}

export default Item
