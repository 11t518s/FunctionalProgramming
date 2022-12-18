let shoppingCart = [];
let shopping_cart_total = 0;

document.querySelectorAll('button').forEach(button =>
  button.addEventListener('click', ({ target }) => {
    const name = target.parentNode.querySelector('.menu-name').textContent;
    const category = target.parentNode.querySelector('.category').textContent;
    const price = target.parentNode.querySelector('.price').textContent;
    shoppingCart = add_item_to_cart({ name, category, price }, shoppingCart);
    shopping_cart_total = calc_cart_total(shoppingCart);
    set_cart_total_dom(shopping_cart_total);
    set_shipping_free_icon(shopping_cart_total);
    update_shipping_icons(shoppingCart, shopping_cart_total);
    update_tax_dom(shopping_cart_total);
  }),
);

function add_item_to_cart(item, shoppingCart) {
  let cart = [...shoppingCart];
  cart.push(item);
  return cart;
}

function calc_cart_total(shopping_cart) {
  let total = 0;
  let cart = [...shopping_cart];
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    total += string_to_number(item.price);
  }
  return total;
}

const string_to_number = str => Number(str.replace(/\D/g, ''));

const price_add_unit = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const set_cart_total_dom = total => {
  document.querySelector('.total-price').textContent = `${price_add_unit(total)}원`;
};

const set_shipping_free_icon = total => {
  if (isOver(total)) document.querySelector('.free-icon').style.display = 'block';
};

function update_shipping_icons(cart, total) {
  var buy_buttons = get_buy_buttons_dom(cart);
  for (var i = 0; i < buy_buttons.length; i++) {
    var item = buy_buttons[i];
    if (isOver(total, item.price)) item.show_free_shopping_icon();
    else item.hide_free_shopping_icon();
  }
}

const isOver = (total, price = 0) => price + total >= 20000;

function get_buy_buttons_dom(shopping_cart) {
  let buttons = [];
  let cart = [...shopping_cart];
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    item.show_free_shopping_icon = function () {
      console.log('DOM 의 아이콘을 보여줍니다');
    };
    item.hide_free_shopping_icon = function () {
      console.log('DOM 의 아이콘을 숨깁니다');
    };
    buttons.push(item);
  }
  return buttons; 
}

const update_tax_dom = total => set_tax_dom(total * 0.1);

const set_tax_dom = value => {
  document.querySelector('.tax-price').textContent = `${price_add_unit(value)}원`;
};
