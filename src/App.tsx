import React, { useEffect, useState } from 'react';
import Item from './items/Item';
import Cart from './cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import  LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge'
import { Wrapper,StyledButton } from './App.styled';

export interface Product {
  id: number
  title: String
  price: number
  description: String
  category: String
  image:String
 amount:number
}
const getProducts = async():Promise<Product[]> => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data
}
export const getItemFromLocalStorgae = ():Product[] => {
  const items = localStorage.getItem("newItem");
  if (items) {
    return JSON.parse(items);
  }
  return [];
}

const App = () => {
  const [cartState, setCartState] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [cartItem,setCartItem] = useState<Product[]>(getItemFromLocalStorgae())
  useEffect(() => {
    getProducts()
      .then((result) => {
        setProducts(result)
        setLoading(false);
      })
      .catch(err => setError(true));
   
  }, [])
 
  const handleAddToCart = (e: Product) => {
    if (cartItem.length == 0) {
      const newItem = [...cartItem, { ...e, amount: 1 }];
      localStorage.setItem("newItem", JSON.stringify(newItem));
      setCartItem(newItem);
    } else {
      const flag = cartItem.find((item) => {
        if (e.id == item.id) {
          return item;
        }
      })
      
      if (flag) {
     
        cartItem.map((item) => {
          if (item.id == flag.id) {
            item.amount++;
          }
        })
      } else {
         const newItem = [...cartItem, { ...e, amount: 1 }];
          localStorage.setItem("newItem", JSON.stringify(newItem));
          setCartItem(newItem); 
      }
    }
   
    
    return null;
  }
  const getToltalItems = (): Number => { return cartItem.length };


  const removeItem = (id: number) => {
    cartItem.map((item) => {
      if (item.id == id) {
        item.amount--;
      }
    })
  
    localStorage.setItem("newItem", JSON.stringify(cartItem));
    setCartItem(getItemFromLocalStorgae())
    return null;
  };


  const plusItem = (id: number) => {
    cartItem.map((item) => {
      if (item.id == id) {
        item.amount++;
      }

    })
    localStorage.setItem("newItem", JSON.stringify(cartItem));
    setCartItem(getItemFromLocalStorgae())
    return null;
  };



  if (loading) {
    return <LinearProgress style={{marginTop:"25%",padding:"0"}}/>
  }
  if (error) {
   return <div>Something went bananas</div> 
  }

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartState} onClose={() => setCartState(false)}>
        <Cart cartItemList={cartItem} removeItem={removeItem} plusItem={plusItem}/>
      </Drawer>
      <StyledButton onClick={() => setCartState(true)} >
        <Badge badgeContent={getToltalItems()} color="error">
          <AddShoppingCartIcon/>
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {products.map((product: Product) => {
         return  <Grid item key={product.id} xs={12} sm={4}>
        <Item item={product} handleAddToCart={handleAddToCart}/>
        </Grid>
        
      })}
      </Grid>
    </Wrapper>
  );
}

export default App;
