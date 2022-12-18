describe('FECrash 카페', () => {
  beforeEach(() => {
    cy.visit({
      url: 'http://localhost:5500/src/2week',
      method: 'GET',
    });
  });

  context('최초 렌더링 시', () => {
    it('장바구니 총 가격은 0원이어야 한다.', () => {
      cy.get('.total-price').should('have.text', '0원');
    });
  });

  context('장바구니에 담기', () => {
    it('3500원을 담으면 총 가격은 3500원이어야 한다.', () => {
      cy.get('.price').contains('3,500').parents('p').parents('div').find('button').eq(1).click();
      cy.get('.total-price').should('have.text', '3,500원');
    });

    it('4000원을 담으면 총 가격은 4000원이어야 한다.', () => {
      cy.get('.price').contains('4,000').parents('p').parents('div').find('button').eq(2).click();
      cy.get('.total-price').should('have.text', '4,000원');
    });
  });

  context('장바구니에 여러 번 담기', () => {
    it('4000원을 5번 담으면 총 가격은 20000원이어야 한다.', () => {
      for (let i = 0; i < 5; i++) {
        cy.get('.price').contains('4,000').parents('p').parents('div').find('button').eq(2).click();
      }
      cy.get('.total-price').should('have.text', '20,000원');
    });
  });

  // context('특정 금액이 넘어가면 아이콘을 숨겼다고 conosle.log에 찍기', () => {
  // it('20000원이 안 넘으면 console.log(DOM 의 아이콘을 숨깁니다)', () => {
  //   cy.get('.price').contains('4,000').parents('p').parents('div').find('button').eq(2).click();
  //   cy.get('@consoleLog').should('be.calledWith', 'DOM 의 아이콘을 숨깁니다');
  // });
  // it('20000원이이 넘으면 console.log을 찍는다', () => {
  //   for (let i = 0; i < 5; i++) {
  //     cy.get('.price').contains('4,000').parents('p').parents('div').find('button').eq(2).click();
  //   }
  //   cy.get('.total-price').should('have.text', '20,000원');
  // });
  // });
});
