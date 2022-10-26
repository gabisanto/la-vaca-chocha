const Reducer = (cart = [], action) => {
  if (action.type === "ADD") {
    let tempcart = cart.filter((item) => item.id === action.payload.id);
    if (tempcart < 1) {
      return [...cart, action.payload];
    } else {
      return cart;
    }
  }
  if (action.type === "REMOVE") {
    return cart.filter((item) => item.id !== action.payload.id);
  }
  if (action.type === "INCREASE") {
    let tempcart = cart.map((item) => {
      if (item.id === action.payload.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    return tempcart;
  }
  if (action.type === "DECREASE") {
    let tempcart = cart.map((item) => {
      if (item.id === action.payload.id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    return tempcart;
  }

  if (action.type === "RESET") return [];

  if (action.type === "SEED CART") {
    if (cart.length > 0) {
      let cartIds = cart.map((element) => element.id);
      let elementsToAdd = action.payload.filter(
        (product) => !cartIds.includes(product.id)
      );
      return [...cart, ...elementsToAdd];
    } else return [...cart, ...action.payload];
  }

  return cart;
};
export default Reducer;
