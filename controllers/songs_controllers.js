const router = require("express").Router();
const Song = require("../models/songs.js");

//INDEX ROUTE
router.get("/", async (req, res) => {
	Song.find({}, (error, allSongs) => {
		res.send(allSongs);
    })
    /*.collation({ locale: "en" })
		.sort({ name: 1 }); //Sorts the list of games alphabetically and case-insensitive*/
});

//SHOW ROUTE
router.get("/:id", async (req, res) => {
	Song.findById(req.params.id, (err, allSongs) => {
		//res.render("show.ejs", {game})
		res.send(allSongs);
	});
});


module.exports = router;
