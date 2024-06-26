import { useState, useEffect } from "react";
import { UseContextData } from "../Context/ContextAuth/ContextProvider/UseContextData";
import { Link } from "react-router-dom";
import { setLocalStorageItem } from "../App";

export const Cart = () => {
    const [cart, setCart] = useState([]);
    const { data } = UseContextData();
    const [amounts, setAmounts] = useState({});
    const [carts, setCarts] = useState([])


    useEffect(() => {
        const updateDelete = ()=>{
            const carts = JSON.parse(localStorage.getItem('cart'));
        
            const renderCart = data.filter(data => carts.includes(data.id));
            setCart(renderCart);
            console.log(renderCart);
        
            // Initialize amounts for each item in the cart
            const initialAmounts = renderCart.reduce((acc, item) => {
                acc[item.id] = 1; // Assuming initial amount is 1 for each item
                return acc;
            }, {});
            setAmounts(initialAmounts);
            setCarts(carts)
        }

        //initial load
        updateDelete();

        const handleStorage = ()=>{
            updateDelete()
        }

        window.addEventListener('storageUpdate', handleStorage);

       


    
        return () => {
            window.removeEventListener('storageUpdate', handleStorage)
        };
    }, []);





    if (cart.length === 0) {
        return <div>add products to cart to view carts <Link to={'/commerce'} className="btn btn-outline-secondary">shop</Link> </div>;
    }

    // remove item
    const removeItem = (id)=>{
        if(!carts){
            return
        }
        const updatedCart = carts.filter(item => item !== id);
        setLocalStorageItem('cart', JSON.stringify(updatedCart))
    }

    const reduce = cart.map(cart => (
        parseFloat(cart.prize) * amounts[cart.id]
    )).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const increaseAmount = (id) => {
        setAmounts(prev => ({ ...prev, [id]: prev[id] + 1 }));
    };

    const decreaseAmount = (id) => {
        setAmounts(prev => ({ ...prev, [id]: Math.max(prev[id] - 1, 1) }));
    };

    
    return (
        <>
            <main className="summary">
                <span>cart summary</span>
                
                    <div className="subtotal">
                        subtotal: $ {reduce}
                        <div>Delivery fees not included yet</div>
                    </div>
   
                {cart.map(cart => (
                    <div key={cart.id} className="cartDiv">
                        <div className="cartSubDiv row">
                            <div className="cartImgDiv col-md-6">
                                <img src={`${cart.productImage}`} alt={cart.product} />
                            </div>
                            <div className="cartDetail col-md-6">
                                <div>{cart.product}</div>
                                <div>{amounts[cart.id]}</div>
                                <div>
                                    <button className="full-btn" onClick={() => increaseAmount(cart.id)} style={{fontSize:'18px'}}>+</button>
                                </div>
                                <div>
                                <button className="outline-btn" onClick={() => decreaseAmount(cart.id)} style={{fontSize:'18px'}}>-</button>
                                </div>
                                <div>
                                    <button onClick={()=>removeItem(cart.id)} className="outline-btn">remove item</button>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                
                    <button style={{width:'100%'}} className="full-btn">checkout {`$ ${reduce}`}</button>
                
            </main>
        </>
    );
};