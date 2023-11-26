/* eslint-disable no-undef */
let movies; 
let movie; 
let Keywords;
let Credits;

function formatNumber (value) {
  if (!value) {
     return 0.00
  }
  var newVal = value.toString()
  var arr = newVal.split('.')
  var intpart = arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  if (arr[1]) {
      return intpart + '.' + arr[1]
  } else {
      return intpart
  }
}

describe("Base tests", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body") 
      .then((response) => {
        movies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/");
  });

  describe("The Discover Movies page", () => {
    it("displays the page header and 10 movies", () => {
      cy.get(".MuiCardHeader-root").should("have.length", 10);
    });

    it("displays the correct movie titles", () => {
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(movies[index].title);
      });
    });
  });

  describe("The movie details page", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/movie/${
          movies[0].id
        }?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body")
        .then((movieDetails) => {
          movie = movieDetails;
        });

        cy.request(
          `https://api.themoviedb.org/3/movie/${movies[0].id}/keywords?api_key=${Cypress.env("TMDB_KEY")}`
        )
        .its("body")
        .then((res) => {
          Keywords = res
        })

        cy.request(
          `https://api.themoviedb.org/3/movie/${movies[0].id}/credits?api_key=${Cypress.env("TMDB_KEY")}&language=en-US`
        )
        .its("body")
        .then((res) => {
          Credits = res
        })
    });
    beforeEach(() => {
      cy.visit(`/movies/${movies[0].id}`);
    });
    it(" displays the movie title, overview and other information ", () => {
      cy.wait(2000)
      cy.get("p").contains(movie.title);
      cy.get("p").contains("Overview");
      cy.get("p").contains(movie.overview);
      cy.get("p").contains(movie.release_date)
    });

    it(" displays the movie status, original language, Popularity, Runtime, Revenue, Budge", () => {
      cy.get(".css-e64qdn")
      .within(() => {
        cy.get("p").contains(movie.status)
        cy.get("p").contains(movie.spoken_languages[0].english_name)
        cy.get("p").contains(formatNumber(movie.revenue));
        cy.get("p").contains(movie.runtime)
        cy.get("p").contains(movie.popularity)
        cy.get("p").contains(formatNumber(movie.budget))
      })
    })

    it(" displays the movie keywords", () => {
      cy.get(".css-e64qdn")
      .within(() => {
        cy.get("p").contains("Keywords")
        const keywords = Keywords.keywords
        cy.get("span").each(($card, index) => {
          cy.wrap($card).contains(keywords[index].name)
        })
      })
    })

    it("displays the series cast", () => {
      cy.on("uncaught:exception", (err) => {
        cy.get(".css-e53awj-MuiStack-root")
        .within(() => {
          const credits = Credits.cast.slice(0,9)
          cy.get(".MuiCard-root").each(($card, index) => {
            cy.wrap($card).contains(credits[index].name)
            cy.wrap($card).contains(credits[index].character)
          })
        })
        if(err.message.includes("not found")) {
          throw new Error("Invalid image")
        }
      })
    })
  });
});