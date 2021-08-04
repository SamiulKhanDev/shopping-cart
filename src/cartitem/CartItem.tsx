import { Button } from '@material-ui/core'
import React from 'react'
import { Product } from '../App'
import {Wrapper }from './caritem.style'
interface prop {

    item: Product;
    addToCart: (id: number) => null;
    removeFromCart: (id: number) => null;
}

const CartItem: React.FC<prop> = ({item,addToCart,removeFromCart }) => {
    return (
        <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className='information'>
        <p>Price: {parseInt(`${item.price*74} `)} rupees</p>
            <p>Total: {parseInt(`${item.price * item.amount * 74} `)} rupees</p>
      </div>
      <div className='buttons'>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => addToCart(item.id)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={`${item.image}`} alt={`${item.title}`} />
  </Wrapper>
    )
}

export default CartItem
