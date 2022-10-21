import axios from "axios";
import fs from "fs";
import path from "path";

const MAX_DAYS = 2;
const VENUE_LIST_URL = "https://api.playo.io/venue-public/list";
const BOOKING_URL =
	"https://playo.club/book-api/v5/availability/{{id}}/{{sport_id}}/{{date}}/?userId=8871905885&deviceType=99";

let page = 0;
let venue_list = [];
let date_list = [];
console.time();

for (let i = 0; i < MAX_DAYS; i++) {
	let date = new Date();
	date.setDate(date.getDate() + i);
	date_list.push(date.toISOString().slice(0, 10));
}

while (true) {
	const resp = await axios.post(VENUE_LIST_URL, {
		page,
		lat: 12.9716,
		lng: 77.5946,
		sportId: [],
	});

	venue_list.push(...resp.data["list"]);
	page = resp.data["nextPage"];

	if (!page || page == -1) break;
}

const jsonDirectory = path.join(process.cwd(), "data");

fs.writeFileSync(
	jsonDirectory + "/venue_list_without_slots.json",
	JSON.stringify(venue_list, null, "\t")
);

console.log("Total Venues: ", venue_list.length);
let counter = 1;

let i = venue_list.length;
while (i--) {
	let venue = venue_list[i];
	let hasFootball = false;

	console.log("Fetching for venue: ", counter++);

	const functionDataList = venue["functionData"];
	const sportsIDs = venue["bookSports"];

	try {
		for (const functionData of functionDataList) {
			if (
				functionData["priority"] === "0" &&
				functionData["type"] !== 1
			) {
				for (const sportID of sportsIDs) {
					if (sportID === "SP2") {
						hasFootball = true;
						for (const date of date_list) {
							const booking_url = BOOKING_URL.replace(
								"{{id}}",
								functionData["content"]
							)
								.replace("{{sport_id}}", sportID)
								.replace("{{date}}", date);

							const resp = await axios.get(booking_url, {
								headers: {
									Authorization: `b4ee93df154de37b0e38aa6a5dfda071aa751bfa`,
								},
							});

							if (!("booking_slots" in venue))
								venue["booking_slots"] = {};
							if (!(sportID in venue["booking_slots"]))
								venue["booking_slots"][sportID] = {};

							venue["booking_slots"][sportID][date] =
								resp.data["data"];
						}
					}
				}
			}
		}
	} catch (e) {
		console.error(e);
		console.log("Error venue: ", venue);
	}
	if (hasFootball) {
		venue_list[i] = venue;
	} else {
		venue_list.splice(i, 1);
	}
}

console.log("Final Venues: ", venue_list.length);

fs.writeFileSync(
	jsonDirectory + "/venue_list.json",
	JSON.stringify(venue_list, null, "\t")
);

console.timeEnd();
