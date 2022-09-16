import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../Store/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setbtnIsHighlighted] = useState(false);
  const cartctx = useContext(CartContext);
  const { items } = cartctx;
  const numberOfCartItems = items.reduce((currNumber, item)=>{
    return currNumber+item.amount;
  }, 0);
   
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`
  useEffect(() => {
    if(items.length === 0){
      return;
    }
    setbtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setbtnIsHighlighted(false);
    }, 300);
    return () =>{
      clearTimeout(timer);
    }
  }, [items])
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
