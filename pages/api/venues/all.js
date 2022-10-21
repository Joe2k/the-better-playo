import fs from "fs";

export default async function handler(req, res) {
	let venueList = JSON.parse(
		fs.readFileSync("./data/venue_list.json", "utf8")
	);

	venueList = venueList.map((v) => {
		return {
			id: v.id,
			name: v.name,
			rating: v.avgRating,
		};
	});

	venueList.sort((a, b) => b.rating - a.rating);

	res.status(200).json(venueList);
}
