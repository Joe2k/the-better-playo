import fs from "fs";
import moment from "moment";
import path from "path";

export default async function handler(req, res) {
	const { venueIDs, timeSlots, fieldSizes } = req.body;
	console.log("Time Slots", timeSlots);
	const venueIDsSet = new Set(venueIDs);

	const jsonDirectory = path.join(process.cwd(), "data");
	let venueList = JSON.parse(
		fs.readFileSync(jsonDirectory + "/venue_list.json", "utf8")
	);

	venueList = venueList.filter((venue) => venueIDsSet.has(venue["id"]));

	const keys_to_keep = [
		"inquiryPhone",
		"shareLink",
		"city",
		"area",
		"sports",
		"amenities",
		"mapImage",
		"avgRating",
		"name",
		"coverImage",
		"images",
		"id",
		"address",
		"fullLink",
		"lat",
		"lng",
		"booking_slots",
	];
	venueList = venueList.map((v) =>
		keys_to_keep.reduce((acc, curr) => {
			acc[curr] = v[curr];
			return acc;
		}, {})
	);

	for (const venue of venueList) {
		let preffered_slots = {};
		let booking_slots = venue["booking_slots"]["SP2"];

		for (const date in booking_slots) {
			let preffered_slots_per_court = {};
			const courtList = booking_slots[date]["courtList"];

			for (const court of courtList) {
				let preffered_slots_in_this_court = [];

				let courtSizeFlag = false;
				for (const fieldSize of fieldSizes) {
					if (
						court["courtName"]
							.toLowerCase()
							.includes(fieldSize + " a side")
					) {
						courtSizeFlag = true;
						break;
					}
				}

				if (courtSizeFlag) {
					const slotDuration = moment.duration(court["slotDuration"]);
					const minSlots = court["minSlots"];

					let minDuration = moment.duration(court["slotDuration"]);
					let initialMinDuration = moment.duration(
						court["slotDuration"]
					);
					for (let i = 1; i < minSlots; i++) {
						minDuration.add(initialMinDuration);
					}

					const slotInfo = court["slotInfo"];
					let slotInfoTimeMap = {};

					for (const slot of slotInfo) {
						slotInfoTimeMap[slot["time"]] = slot;
					}

					for (const slot of slotInfo) {
						let slotStartingTime = moment(slot["time"], "HH:mm:ss");
						let slotEndingTime = slotStartingTime.clone();
						slotEndingTime.add(minDuration);
						let nextSlotTime = slotStartingTime.clone();
						let price = parseInt(slot["price"]);

						if (slot["status"] === 1) {
							let slotAvailableFlag = true;

							for (let i = 1; i < minSlots; i++) {
								nextSlotTime.add(slotDuration);
								if (
									!slotInfoTimeMap[
										nextSlotTime.format("HH:mm:ss")
									] ||
									slotInfoTimeMap[
										nextSlotTime.format("HH:mm:ss")
									]["status"] === 0
								) {
									slotAvailableFlag = false;
									break;
								} else {
									price += parseInt(
										slotInfoTimeMap[
											nextSlotTime.format("HH:mm:ss")
										]["price"]
									);
								}
							}
							for (const timeSlot of timeSlots) {
								let prefferedStartingTime = moment(
									timeSlot[0],
									"HH:mm:ss"
								);
								let prefferedEndingTime = moment(
									timeSlot[1],
									"HH:mm:ss"
								);

								if (
									slotAvailableFlag &&
									slotStartingTime.isSameOrAfter(
										prefferedStartingTime
									) &&
									slotEndingTime.isSameOrBefore(
										prefferedEndingTime
									)
								) {
									console.log(
										venue["name"],
										court["courtName"],
										slotStartingTime.format("h:mm A"),
										slotEndingTime.format("h:mm A"),
										price
									);
									preffered_slots_in_this_court.push({
										courtName: court["courtName"],
										startingTime:
											slotStartingTime.format("h:mm a"),
										endingTime:
											slotEndingTime.format("h:mm a"),
										price,
									});
								}
							}
						}
					}

					if (Object.keys(preffered_slots_in_this_court).length > 0)
						preffered_slots_per_court[court["courtName"]] =
							preffered_slots_in_this_court;
				}
			}

			preffered_slots[date] = preffered_slots_per_court;
		}

		venue["preffered_slots"] = preffered_slots;
	}

	res.status(200).json(
		venueList.map(({ booking_slots, ...keepAttrs }) => keepAttrs)
	);
}
