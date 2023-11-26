/* eslint-disable no-undef */
let actors;
let popularActor;
let creditedMovies;

describe("Actors lists tests", () =>{
    beforeEach(()=>{

        cy.request(
            `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`)
            .its("body") 
            .then((response) => {
                actors = response.results;
            });
    });
    describe("Popular actors list", () => {
        beforeEach(()=>{
            cy.request(
                `https://api.themoviedb.org/3/person/974169/movie_credits?api_key=${Cypress.env("TMDB_KEY")}`
              )
                .its("body")
                .then((actorMovies) => {
                    creditedMovies = actorMovies.cast;
                });
            cy.request(
                `https://api.themoviedb.org/3/person/974169?api_key=${Cypress.env("TMDB_KEY")}`
                )
                .its("body")
                .then((response) => {
                    popularActor = response;
                });
            cy.visit("/people")
        })
        it("displays the page header and 10 actors", () => {
            cy.get("h3").contains("Popular Actors");
            cy.get(".MuiCardHeader-root").should("have.length", 10);
          });
      
          it("displays the correct actor names", () => {
            cy.get(".MuiCardHeader-content").each(($card, index) => {
              cy.wrap($card).find("p").contains(actors[index].name);
            });
          });
        describe("Popular Actor Details", () =>{
            beforeEach(()=>{
                cy.visit(`/people/974169`);
            });
            
            it("Should display the movies that the actor has been in", () =>{
                cy.getCards(creditedMovies); 
            });
            it("Should display the actor's biograpy", () =>{
                cy.get('.css-2ulfj5-MuiTypography-root').should('be.visible').contains(popularActor.biography)
            });
        })
    });
});