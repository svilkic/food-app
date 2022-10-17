import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
    quantity: 0,
    discount: 50,
  },
  reducers: {
    hydrate: (state, action) => {
      // do not do state = action.payload it will not update the store
      return action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      const ingredientsValue = action.payload.ingredients.reduce(
        (prev, { price }) => prev + parseFloat(price),
        0
      );
      state.total +=
        (parseFloat(action.payload.price) + ingredientsValue) *
        parseFloat(action.payload.quantity);
    },
    removeProduct: (state, action) => {
      const productToRemove = state.products.find(
        (p) => p.pid === action.payload
      );
      const updatedProducts = [...state.products].filter(
        (p) => p.pid !== action.payload
      );
      state.products = updatedProducts;
      const ingredientsValue = calculateIngredientsCost(
        productToRemove.ingredients
      );
      state.total -=
        (parseFloat(productToRemove.price) + ingredientsValue) *
        parseFloat(productToRemove.quantity);
      state.quantity -= 1;
    },

    changeProductQuantity: (state, action) => {
      const { pid, type } = action.payload;
      const products = [...state.products];

      const newProds = products.map((p) => {
        if (p.pid === pid) {
          if (type === "+") {
            if (p.quantity + 1 <= 10) p.quantity++;
          } else {
            if (p.quantity - 1 >= 1) p.quantity--;
          }
        }
        return p;
      });
      state.total = calculateTotal(products);
      state.products = newProds;
    },

    reset: (state) => {
      state.products = [];
      state.total = 0;
      state.quantity = 0;
      state.discount = 50;
    },
  },
});

const calculateTotal = (products) => {
  const price = products.reduce(
    (prev, { price, ingredients, quantity }) =>
      prev +
      (parseFloat(price) + calculateIngredientsCost(ingredients)) * quantity,
    0
  );
  return price;
};

const calculateIngredientsCost = (ingredients) => {
  return ingredients.reduce((prev, { price }) => prev + parseFloat(price), 0);
};

export const { addProduct, reset, removeProduct, changeProductQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
