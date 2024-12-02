// Cypress Test for Home Page

describe('Home Page', () => {
  it('should display a list of cat images and navigate to cat detail page on click', () => {
    cy.visit('/');

    // Check if images are rendered
    cy.get('img').should('have.length.greaterThan', 0);

    // Click on the first image to navigate to cat detail page
    cy.get('.image-detail-link').first().click();

    // Verify navigation to detail page
    cy.url().should('include', '/cats/');
    cy.get("[data-test='toggle-favorite']").should('exist').click();
  });
});

// Cypress Test for Favorites Page
describe('Favorites Page', () => {
  it('should display a list of favorite cat images and allow removal', () => {
    cy.visit('/favorites');

    // Check if favorites are rendered
    cy.get('img').should('have.length.greaterThan', 0);

    // Remove a favorite
    cy.get('button').contains('Remove').first().click();
  });
});
