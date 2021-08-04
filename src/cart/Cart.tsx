import React from 'react'
import { Wrapper } from './cart.style'
import { Product } from '../App'
import CartItem from '../cartitem/CartItem'

interface props {
    cartItemList: Product[];
    removeItem: (id:number) => null;
    plusItem: (id: number) => null;
}

const Cart: React.FC<props> = ({cartItemList,removeItem,plusItem }) => {
    return (
        <Wrapper>
             <h2>Your Shopping Cart</h2>
      {cartItemList.length === 0 ? <p>No items in cart.</p> : null}
      {cartItemList.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={plusItem}
          removeFromCart={removeItem}
        />
      ))}
      {/* <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2> */}
        </Wrapper>
    )
}

export default Cart;
