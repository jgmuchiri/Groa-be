const db = require("../../../database/dbConfig.js");
const prepTestDB = require("../../../helpers/prepTestDB.js");

const { addRating, getRatingById } = require("./ratings.js");

beforeEach(prepTestDB);
beforeEach(async () => await db("user_letterboxd_ratings").del());

const rating1 = {
  date: new Date("2020-02-14" + "Z"),
  name: "The Princess Bride",
  year: Number("1987"),
  letterboxd_uri: "https://letterboxd.com/film/the-princess-bride/",
  rating: Number("3.5"),
  user_id: Number(2)
};
const rating2 = {
  date: new Date("2020-02-14" + "Z"),
  name: "Aladdin",
  year: Number(1992),
  letterboxd_uri: "https://letterboxd.com/film/aladdin/",
  rating: Number("4"),
  user_id: Number(2)
};

describe("letterboxd ratings model", () => {
  it("should insert the provided rating into the db", async () => {
    await addRating(rating1)
    let rating = await getRatingById(1)
    expect(rating.name).toBe("The Princess Bride");
    expect(rating.year).toBe(1987);
    expect(rating.rating).toBe(3.5);

     await addRating(rating2);
    rating = await getRatingById(2)
    expect(rating.name).toBe("Aladdin");
    expect(rating.year).toBe(1992);
    expect(rating.rating).toBe(4);

    let ratings = await db("user_letterboxd_ratings");
    expect(ratings).toHaveLength(2);
  });

  // will continue to add tests and model functions if more functionality is needed.
});
