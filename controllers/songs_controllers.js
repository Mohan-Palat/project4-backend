const router = require("express").Router();
const Song = require("../models/songs.js");
const axios = require("axios");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

//Gets the song list from the API.
router.get("/", async (req, res) => {
	await axios
		.get("https://nowplaying.bbgi.com/WMGQFM/list?limit=10")
		.then((response) => {
			saveSongList(response);
			//res.send(response);
		})
		.catch((error) => {
			console.log("API Error: ", error);
		});
});

saveSongList = (data) => {
	
	for (let i = 0; i < data.data.length; i++) {
		console.log("Title: ", data.data[i].title);
		Song.create(data.data[i]);
	}
};

//POST ROUTE
//Converts checked boxes to true/false for documents
// router.post("/", async (req, res) => {
// 	if (req.body.isDigital == "on") {
// 		req.body.isDigital = true;
// 	} else {
// 		req.body.isDigital = false;
// 	}
// 	if (req.body.currentlyPlaying == "on") {
// 		req.body.currentlyPlaying = true;
// 	} else {
// 		req.body.currentlyPlaying = false;
// 	}
// 	if (req.body.hasBeaten == "on") {
// 		req.body.hasBeaten = true;
// 	} else {
// 		req.body.hasBeaten = false;
// 	}
// 	if(req.body.replayable == "on") {
// 		req.body.replayable = true;
// 	} else {
// 		req.body.replayable = false;
// 	}
// 	let gameCollection = await Game.find({
// 		name: req.body.name,
// 		isDigital: req.body.isDigital,
// 	}); //Checks to see if a document with the same name and digital version exists

// 	if (gameCollection != "") {
// 		//If there is one
// 		dupe = true; //Set the dupe flag to true (this presents a message on the new screen)
// 		res.redirect("/games/new");
// 	} else {
// 		let game = await Game.create(req.body); //Creates a new entry in Games document with the game detail
// 		res.redirect(`/games/${game._id}`); //Redirects to the page of the newly created game
// 	}
// });

module.exports = router;
