import { FREE_SHIPPING_LIMIT, TAX_RATE } from '../constants/constant';


export const isOver = (total, price = 0) => price + total >= FREE_SHIPPING_LIMIT;

export const calc_tax = (price) => price * TAX_RATE;
