import { ShoppingCart } from "./types/type";
import { FREE_SHIPPING_LIMIT,TAX_RATE } from "./constants/constant";

let shoppingCart:ShoppingCart[] = [];
let shopping_cart_total = 0;

document.querySelectorAll('button').forEach(button => 
  button.addEventListener('click', ({target}) => {
    const name = (target as Node).parentNode?.querySelector('.menu-name')?.textContent;
    const category = (target as Node).parentNode?.querySelector('.category')?.textContent;
    const price = (target as Node).parentNode?.querySelector('.price')?.textContent;
    shoppingCart = add_item_to_cart({ name, category, price }, shoppingCart);
    shopping_cart_total = calc_cart_total(shoppingCart);
    set_cart_total_dom(shopping_cart_total);
    update_shipping_icons(shoppingCart);
    update_tax_dom(shopping_cart_total);
  }),
);

const add_item_to_cart = (item, shoppingCart) => {
  let cart = [...shoppingCart, item];
  return cart;
}

const calc_cart_total = (shopping_cart) => {
  let total = 0;
  let cart = [...shopping_cart];
  for (let i = 0; i < cart.length; i++) {
    total += string_to_number(cart[i].price);
  }
  return total;
}

const string_to_number = str => Number(str.replace(/\D/g, ''));

const price_add_unit = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'원';

const set_cart_total_dom = total => {
  (document.querySelector('.total-price') as HTMLElement).textContent = price_add_unit(total);
};

const update_shipping_icons = total => {
  if (isOver(total)) (document.querySelector('.free-icon') as HTMLElement).style.display = 'block';
};

const isOver = (total, price = 0) => price + total >= FREE_SHIPPING_LIMIT;


const update_tax_dom = total => set_tax_dom(total * TAX_RATE);

const set_tax_dom = value => {
  (document.querySelector('.tax-price') as HTMLElement).textContent = price_add_unit(value);
};
