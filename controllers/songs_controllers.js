const router = require("express").Router();
const Song = require("../models/songs.js");
const axios = require("axios");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

//Passes back songs in order of most recently played.
router.get("/songs/:order", async (req, res) => {
	Song.find({}, (error, allSongs) => {
		res.json(allSongs);
	}).sort({ createdOn: req.params.order });
});

router.get("/first", async (req, res) => {
	Song.find({}, (error, allSongs) => {
		res.json(allSongs);
	})
		.sort({ createdOn: -1 })
		.limit(1);
});
router.get("/first", async (req, res) => {
	Song.find({}, (error, allSongs) => {
		res.json(allSongs);
	})
		.sort({ createdOn: -1 })
		.limit(1);
});

router.get("/artist/:order", async (req, res) => {
	let order = req.params.order;
	if (order == "d") {
		order = "-1";
	} else {
		order = "1";
	}
	Song.find({}, (error, allSongs) => {
		res.json(allSongs);
	}).sort({ artist: order, title: "1" });
});
router.get("/title/:order", async (req, res) => {
	let order = req.params.order;
	if (order == "d") {
		order = "-1";
	} else {
		order = "1";
	}
	Song.find({}, (error, allSongs) => {
		res.json(allSongs);
	}).sort({ title: order, artist: "1" });
});

//Gets the song list from the API.
router.get("/refresh", async (req, res) => {
	await axios
		.get("https://nowplaying.bbgi.com/WMGQFM/list?limit=1000") //Calls API to retrieve song list
		.then((response) => {
			saveNewSong(response.data); //Saves songs that are retrieved but not in DB
			res.redirect("/songs/descending");
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
					let date = new Date(song.createdOn);
					let y = date.getFullYear();
					let m = date.getMonth() + 1;
					let d = addZero(date.getDate());
					let h = addZero(date.getHours());
					let mi = addZero(date.getMinutes());
					let s = addZero(date.getSeconds());

					const newSong = new Song({
						id: song.id,
						title: song.title,
						artist: song.artist,
						timestamp: song.timestamp,
						createdOn: song.createdOn,
						year: "2020",
						month: m,
						date: d,
						hours: h,
						minutes: mi,
						seconds: s,
					});
					Song.create(newSong); //Create a new song but just save only the relevant fields
				}
			}
		);
	});
};
addZero = (i) => {
	if (i < 10) {
		return "0" + i;
	} else return i;
};

router.get("/count/:order", async (req, res) => {
	let order = req.params.order;
	if (order == "d") {
		order = -1;
	} else {
		order = 1;
	}
	Song.aggregate(
		[
			{ $match: {} },
			{
				$group: {
					_id: { title: "$title", artist: "$artist" },
					count: { $sum: 1 },
				},
			},
			{ $sort: { count: order, _id: 1 } },
		],
		(error, song) => {
			res.json(song);
		}
	);
});

router.get("/search", async (req, res) => {
	console.log(req.query);
	Song.find(
		{
			$or: [
				{ artist: new RegExp(req.query.term, "i") },
				{ title: new RegExp(req.query.term, "i") },
			],
		},
		(err, allSongs) => {
			if (err) {
				res.json(err);
			} else res.json(allSongs);
		}
	);
});

router.get("/today", async (req, res) => {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	Song.find({ createdOn: { $gte: today } }, (error, allSongs) => {
		res.json(allSongs);
	}).sort({ createdOn: "descending" });
});

router.get("/todayCount", async (req, res) => {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	Song.aggregate(
		[
			{ $match: { createdOn: { $gte: today } } },
			{
				$group: {
					_id: { title: "$title", artist: "$artist" },
					count: { $sum: 1 },
				},
			},
			{ $sort: { count: -1, _id: 1 } },
		],
		(error, song) => {
			res.json(song);
		}
	);
});

router.get("/average", async (req, res) => {});

module.exports = router;
