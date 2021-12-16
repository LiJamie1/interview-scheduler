// reset db -> visit "/" -> click Monday
beforeEach(() => {
  cy.request("GET", "/api/debug/reset");
  cy.visit("/");
  cy.contains("Monday").click();
});

/*
- Clicks on the "Add" button in the second appointment
- Enters their name
- Chooses an interviewer
- Clicks the save button
- Sees the booked appointmen
*/
describe("Booking", () => {
  it("should book an interview", () => {
    cy.get('img[alt="Add"]').first().click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get('img[alt="Sylvia Palmer"]').click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
});

/*
- Clicks the edit button for the existing appointment
- Changes the name and interviewer
- Clicks the save button
- Sees the edit to the appointment
*/
describe("Editing", () => {
  it("should edit an interview", () => {
    cy.get('img[alt="Edit"]').first().click({ force: true });
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    cy.get('img[alt="Tori Malcolm"]').click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
});
/*
- Clicks the delete button for the existing appointment
- Clicks the confirm button
- Sees that the appointment slot is empty
*/
describe("Canceling", () => {
  it("should cancel an interview", () => {
    cy.get('img[alt="Delete"]').click({ force: true });
    cy.contains("Confirm").click();
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
