import {
  isEqualOrOverToTarget,
  getTotalFromArray,
  calcTax,
  TAX,
} from "./shopping";

describe("target의 값은 나머지 인자들의 value의 합보다 작다", () => {
  it("case 1 : 들어오는 숫자의 합이 타겟보다 작을 때", () => {
    expect(
      isEqualOrOverToTarget({
        target: 300,
        firstNumber: 100,
        secondNumber: 150,
      })
    ).toBe(false);
  });
  it("case 2 : 들어오는 숫자의 합이 타겟과 동일할 때", () => {
    expect(
      isEqualOrOverToTarget({
        target: 300,
        firstNumber: 150,
        secondNumber: 150,
      })
    ).toBe(true);
  });
  it("case 2 : 들어오는 숫자의 합이 타겟보다 클 때", () => {
    expect(
      isEqualOrOverToTarget({
        target: 300,
        firstNumber: 200,
        secondNumber: 150,
      })
    ).toBe(true);
  });
});

describe("총 금액에서 세금의 금액을 가져온다.", () => {
  it("세금의 가격이 곱해져서 산출된다.", () => {
    const randomNumber = Math.random();
    expect(calcTax(randomNumber)).toBe(randomNumber * TAX);
  });
});

describe("array of object 의 특정 key값의 합을 가져올 수 있다.", () => {
  const firstRandomNumber = Math.random();
  const secondRandomNumber = Math.random();

  const array = [{ price: firstRandomNumber }, { price: secondRandomNumber }];
  it("array of object 의 특정 key값의 합을 가져올 수 있다.", () => {
    expect(getTotalFromArray(array, "price")).toBe(
      firstRandomNumber + secondRandomNumber
    );
  });
});
