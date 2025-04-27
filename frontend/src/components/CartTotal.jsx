import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const subTotal = getCartAmount();
  const shippingFee = subTotal === 0 ? 0 : delivery_fee;
  const totalAmount = subTotal + shippingFee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTAL" />
      </div>

      <div className="flex flex-col gap-2 mt-4 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p className="text-lg font-medium">Sub Total</p>
          <p className="text-lg font-medium">
            {currency}&nbsp;{subTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <hr />

        {/* Shipping */}
        <div className="flex justify-between">
          <p className="text-lg font-medium">Shipping Fee</p>
          <p className="text-lg font-medium">
            {currency}&nbsp;{shippingFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <hr />

        {/* Total */}
        <div className="flex justify-between mt-2">
          <p className="text-2xl font-semibold">Total Amount</p>
          <p className="text-2xl font-semibold">
            {currency}&nbsp;{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
