import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetOrderHistoryQuery } from '../state/pizzaApi';
import { setFilter } from '../state/pizzaSlice';

export default function OrderList() {
  console.log('OrderList component is rendering...');

  const dispatch = useDispatch();
  const filter = useSelector((state) => state.pizza.size);
  const orders= useGetOrderHistoryQuery().data || [];

  console.log('Orders fetched:', orders);
  console.log('Current filter:', filter);

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {orders &&
          orders
            .filter(
              (ord) => filter === "All" || filter === ord.size
            )
            .map((ord) => {
              const { id, customer, size, toppings } = ord;
              return (
                <li key={id}>
                  <div>
                    {customer} ordered a size {size} with{" "}
                    {toppings?.length || "no"} topping
                    {toppings && toppings.length === 1 ? "" : "s"}
                  </div>
                </li>
              );
            })}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {["All", "S", "M", "L"].map((size) => {
          const onClick = () => dispatch(setFilter(size));
          const className = `button-filter${size === "All" ? " active" : ""}`;
  return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              onClick={onClick}
              key={size}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}