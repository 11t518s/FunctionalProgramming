export const string_to_number = str => Number(str.replace(/\D/g, ''));

export const price_add_unit = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'원';
