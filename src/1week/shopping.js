// 액션
const addItemToCart = (name, price, cart) => {
  const newCartItem = makeObject(name, price);
  const newCart = addItemOnArray(cart, newCartItem);
  calcCartTotal(newCart);
  return newCart;
};

// 액션
const makeObject = (...arg) => ({ ...arg });

// 액션
const addItemOnArray = (array, newItem) => {
  return [...array, newItem];
};

// 액션
const updateShippingIcons = (totalPrice) => {
  const buy_buttons = getBuyButtonsDom();

  buy_buttons.forEach((button) => {
    showOrHideButton(button, totalPrice);
  });
};

// 액션
const showOrHideButton = (button, shoppingCartTotal) => {
  if (
    isEqualOrOverToTarget({
      target: 20,
      firstNumber: button.item.price,
      secondNumber: shoppingCartTotal,
    })
  ) {
    button.show_free_shipping_icon();
  } else {
    button.hide_free_shipping_icon();
  }
};

// 계산
const isEqualOrOverToTarget = ({ target, ...rest }) =>
  Object.values(rest).reduce((acc, cur) => acc + cur) >= target;

// 계산
const calcTax = (shoppingCartTotal) => shoppingCartTotal * 0.1;

// 계산
const getTotalFromArray = (array, element) =>
  array.reduce((acc, cur) => acc + cur[`${element}`], 0);

// 액션
const calcCartTotal = (cart) => {
  const totalCartPrice = getTotalFromArray(cart, "price");

  updateShippingIcons(totalCartPrice);
  setCartTotalDom();
  setTaxDom(calcTax(totalCartPrice));
};
