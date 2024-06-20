import { useState, useEffect } from "react";
import { UseContextData } from "../Context/ContextAuth/ContextProvider/UseContextData";

export const Cart = () => {
    const [cart, setCart] = useState([]);
    const { data } = UseContextData();
    const [amounts, setAmounts] = useState({});

    useEffect(() => {
        const carts = JSON.parse(localStorage.getItem('cart'));
        if(!carts){
            return
        }
        const renderCart = data.filter(data => carts.includes(data.id));
        setCart(renderCart);
        console.log(renderCart)
        
        // Initialize amounts for each item in the cart
        const initialAmounts = renderCart.reduce((acc, item) => {
            acc[item.id] = 1; // Assuming initial amount is 1 for each item
            return acc;
        }, {});
        setAmounts(initialAmounts);
    }, [data]);

    if (cart.length === 0) {
        return <div>add products to cart to see view carts</div>;
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
            <main>
                <div>cart summary</div>
                <div className="row">
                    <div className="col-6">
                        subtotal
                    </div>
                    <div className="col-6">
                        {reduce}
                    </div>
                </div>
                {cart.map(cart => (
                    <div key={cart.id} className="cartDiv">
                        <div className="cartSubDiv">
                            <div className="cartImgDiv">
                                <img src={`${cart.productImage}`} alt={cart.product} />
                            </div>
                            <div className="cartDetail">
                                <div>{cart.product}</div>
                                <div>{amounts[cart.id]}</div>
                                <div>
                                    <button className="full-btn" onClick={() => increaseAmount(cart.id)}>increase</button>
                                </div>
                                <div>
                                    <button className="outline-btn" onClick={() => decreaseAmount(cart.id)}>decrease</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </>
    );
};