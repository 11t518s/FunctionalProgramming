// 데이터
let shoppingCart = [];
const TAX_RATE = 0.1;
const setShoppingCart = newShoppingCart => {
  shoppingCart = newShoppingCart;
};

// 금액(1,000원)을 숫자로
const convertPriceToNumber = price => {
  return Number(price.replaceAll(/,|원/g, ''));
};

// 숫자 금액(1000)을 문구로(1,000원)
const convertPriceToWord = price => {
  // 금액이 자꾸 부족해서 우선 10을 임시로 곱했습니다 (1000원인데 100원이 뜨는 문제)
  return `${(price * 10).toLocaleString()}원`;
};

// 클릭 액션
document.querySelectorAll('button').forEach(button =>
  button.addEventListener('click', ({ target }) => {
    const name = target.parentNode.querySelector('.menu-name').textContent;
    const category = target.parentNode.querySelector('.category').textContent;
    const price = target.parentNode.querySelector('.price').textContent;
    const priceNumber = convertPriceToNumber(price);

    const newCart = addItemToCart({ name, category, price: priceNumber });
    setShoppingCart(newCart);
    const cartTotalPrice = calcCartTotal(newCart);

    handleDomUpdate(newCart, cartTotalPrice);
  }),
);

const addItemOnArray = (array, item) => [...array, item];
const getTotalFromArray = (array, element) => array.reduce((acc, cur) => acc + cur[`${element}`], 0);
const updateTax = price => price * TAX_RATE;
const updateTaxDom = shoppingCartTotal => setTaxDom(updateTax(shoppingCartTotal));
const addItemToCart = cartItem => addItemOnArray(shoppingCart, cartItem);
const calcCartTotal = shoppingCart => getTotalFromArray(shoppingCart, 'price');

const addShowOrHideShoppingIconOnArray = array =>
  array.map(item => ({
    ...item,
    showFreeShoppingIcon: () => {
      console.log('DOM 의 아이콘을 보여줍니다');
    },
    hideFreeShoppingIcon: () => {
      console.log('DOM 의 아이콘을 숨깁니다');
    },
  }));

const handleDomUpdate = (shoppingCart, shoppingCartPriceTotal) => {
  setCartTotalDom(shoppingCartPriceTotal);
  const buyButtons = addShowOrHideShoppingIconOnArray(shoppingCart);

  updateShippingIcons(buyButtons, shoppingCartPriceTotal);
  updateTaxDom(shoppingCartPriceTotal);
};

const updateShippingIcons = (buyButtons, shoppingCartPriceTotal) => {
  buyButtons.forEach(buyButton => {
    if (Number(buyButton.price + shoppingCartPriceTotal) >= 20000) {
      console.log(buyButton.price, shoppingCartPriceTotal);
      buyButton.showFreeShoppingIcon();
    } else {
      buyButton.hideFreeShoppingIcon();
    }
  });
};

// dom을 변경하는 로직
const setTaxDom = tax => {
  const cartTotalPriceWord = convertPriceToWord(tax);
  document.querySelector('.total-price').textContent = cartTotalPriceWord;
};
const setCartTotalDom = shoppingCartTotal => {
  document.querySelector('.total-price').textContent = shoppingCartTotal;
};
