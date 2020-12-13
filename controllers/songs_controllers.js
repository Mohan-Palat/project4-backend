const router = require("express").Router();
const Song = require("../models/songs.js");
const axios = require("axios");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.get("/", async (req, res) => {
	Song.find({}, (error, allSongs) => {
		res.send(allSongs);
	}).sort({ createdOn: "descending" });
	
});
router.get("/artist/:order", async (req, res) => {
	let order = req.params.order;
	if(order=="d"){order="-1"} else{order="1"}
	Song.find({}, (error, allSongs) => {
		res.send(allSongs);
	}).sort({ artist: order });
	
});
router.get("/title/:order", async (req, res) => {
	if(order=="d"){order="-1"} else{order="1"}
	Song.find({}, (error, allSongs) => {
		res.send(allSongs);
	}).sort({ title: order });
	
});

//Gets the song list from the API.
router.get("/refresh", async (req, res) => {
	await axios
		.get("https://nowplaying.bbgi.com/WMGQFM/list?limit=1000") //Calls API to retrieve song list
		.then((response) => {
			saveNewSong(response.data); //Saves songs that are retrieved but not in DB
			res.redirect("/");
		})
		.catch((error) => {
			console.log("API Error: ", error);
		});
});

saveNewSong = (songList) => {
	songList.forEach((song) => {
		//Looks at each song retrieved from API
		Song.findOne(
			//Looks for existing song in DB based on the ID provided by API
			{
				id: song.id,
			},
			(err, foundSong) => {
				if (foundSong) {
					//If song is found, do nothing and move onto next song
				} else {
					const newSong = new Song({
						id: song.id,
						title: song.title,
						artist: song.artist,
						timestamp: song.timestamp,
						createdOn: song.createdOn,
					});
					Song.create(newSong); //Create a new song but just save only the relevant fields
				}
			}
		);
	});
};
module.exports = router;
