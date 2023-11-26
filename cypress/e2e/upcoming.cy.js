/* eslint-disable no-undef */
import truncate from "lodash/truncate";

let upcoming;
let movies;

describe("Upcoming tests", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        upcoming = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/movies/upcoming");
  });

  describe("The upcoming movies page", () => {
    it("displays the upcoming page header and 10 upcoming movies", () => {
      cy.get("h3").contains("Upcoming");
      cy.get(".MuiCardHeader-root").should("have.length", 10);
    });
  });

  describe("Add into must watch", () => {
    it("selected movie card shows the red add-to-must-watch svg", () => {
      cy.get(".MuiCardHeader-root").eq(0).find("svg").should("not.exist");
      cy.get("button[aria-label='add to Must Watch']").eq(0).click();
      cy.get(".MuiCardHeader-root").eq(0).find("svg");
      cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
      cy.get("button[aria-label='add to Must Watch']").eq(1).click();
      cy.get(".MuiCardHeader-root").eq(1).find("svg");
    });
  })

  describe("Remove from must watch", () => {
    beforeEach(() => {
      cy.get("button[aria-label='add to Must Watch']").eq(1).click();
      cy.get("button[aria-label='add to Must Watch']").eq(3).click();
      cy.get("button").contains("Must Watch").click();
    });
    it(" The deleted movie do not show the red add-to-must-watch svg", () => {
      cy.get("button[aria-label='remove from Must Watch']").eq(0).click();
      cy.get("button").contains("Upcoming").click();
      cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
    });
  });
  });