import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
	//Find the absolute path of the json directory
	const jsonDirectory = path.join(process.cwd(), "data");
	//Read the json data file data.json
	let venueList = await fs.readFile(
		jsonDirectory + "/venue_list.json",
		"utf8"
	);

	venueList = JSON.parse(venueList);
	venueList = venueList.map((v) => {
		return {
			id: v.id,
			name: v.name,
			rating: v.avgRating,
			area: v.area,
		};
	});

	venueList.sort((a, b) => b.rating - a.rating);
	//Return the content of the data file in json format
	res.status(200).json(venueList);
}
