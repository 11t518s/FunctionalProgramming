const { isOver, calcTax, count_calc_total } = require('./shopping.js');

describe('isOver : 숫자가 큰지 확인', () => {
  it('case 1 : 500 + 200 > 300 → 결과로 true', () => {
    expect(isOver(500, 200, 300)).toBe(true);
  });
  it('case 2 : 100 + 200 > 400 → 결과로 false', () => {
    expect(isOver(100, 200, 400)).toBe(false);
  });
});

describe('calcTax : 0.1을 곱한 결과 확인', () => {
  it('case 1 : 500 * 0.1 === 50', () => {
    expect(calcTax(500)).toBe(50);
  });
});

describe('count_calc_total : price 값만 전체 더한 값을 확인', () => {
  const cart = [
    { name: 'Kim', price: 300 },
    { name: 'Park', price: 200 },
  ];
  it('case 1 : [{ name: "Kim", price: 300 }, { name: "Park", price: 200 }] → 결과로 500', () => {
    expect(count_calc_total(cart)).toBe(500);
  });
});
