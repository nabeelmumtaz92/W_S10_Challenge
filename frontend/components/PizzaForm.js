import React, {useReducer} from 'react';

import { useSubmitOrderMutation } from '../state/pizzaApi';


const initialFormState = {
  // suggested
  fullName: "",
  size: "",
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT": {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case "RESET_FORM":
      return initialFormState;
    default:
      return state;
  }
};

export default function PizzaForm() {
  console.log('PizzaForm component is rendering...');

  const [form, dispatch] = useReducer(reducer, initialFormState)
  const [createOrder, {isLoading, error}] = useSubmitOrderMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let valueToUse = type === 'checkbox' ? checked : value
    dispatch({type:'CHANGE_INPUT', payload:{name, value: valueToUse}})
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let { fullName, size, ...toppingsSelection } = form;
    let toppings = [];
    for (let key in toppingsSelection) {
      if (toppingsSelection[key]) toppings.push(key);
    }
    let requestBody = { fullName, size, toppings };
    createOrder(requestBody)
      .unwrap()
      .then(() => {
        dispatch({ type: "RESET_FORM" });
      })
      .catch(() => {});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: '0' }}>Pizza Form</h2>

      <div className="input-group">
        {isLoading && (
          <div className="pending" style={{ marginBottom: '10px' }}>
            Order in progress...
          </div>
        )}
        {error && (
          <div className="failure" style={{ marginBottom: '10px' }}>
            Order failed: {error.data.message} 
          </div>
        )}

        <label htmlFor="fullName" style={{ marginBottom: '0', display: 'block' }}>Full Name</label>
        <input
          data-testid="fullNameInput"
          id="fullName"
          name="fullName"
          placeholder="Type full name"
          type="text"
          value={form.fullName }
          onChange={handleChange}
          style={{ marginTop: '0', display: 'block' }}
        />
      </div>

      <div className="input-group">
        <label htmlFor="size" style={{ marginBottom: '0', display: 'block' }}>Size</label>
        <select
          data-testid="sizeSelect"
          id="size"
          name="size"
          value={form.size}
          onChange={handleChange}
          style={{ marginTop: '0', display: 'block' }}
        >
          <option value="">----Choose size----</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            checked={form['1']}  
            onChange={handleChange}
            style={{ marginBottom: '0' }}
          />
          Pepperoni<br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            checked={form['2']}  
            onChange={handleChange}
            style={{ marginBottom: '0' }}
          />
          Green Peppers<br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            checked={form['3']}  
            onChange={handleChange}
            style={{ marginBottom: '0' }}
          />
          Pineapple<br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            checked={form['4']} 
            onChange={handleChange}
            style={{ marginBottom: '0' }}
          />
          Mushrooms<br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            checked={form['5']}  
            onChange={handleChange}
            style={{ marginBottom: '0' }}
          />
          Ham<br />
        </label>
      </div>
      <input data-testid="submit" type="submit" value="Submit" />
    </form>
  );
}
