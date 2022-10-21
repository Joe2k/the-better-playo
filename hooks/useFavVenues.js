import { useLocalStorage } from "@mantine/hooks";

const useFavVenues = (initialFavVenues) => {
	const [venues, setVenues] = useLocalStorage({
		key: "fav-venues-local",
		defaultValue: initialFavVenues,
	});

	let venueIDs = new Set(venues.map((v) => v.id));

	return {
		venues,
		venueIDs,
		addVenue: (id, name) =>
			setVenues((currentVenues) => {
				return [
					...currentVenues,
					{
						id,
						name,
					},
				];
			}),
		removeVenue: (id) =>
			setVenues((currentVenues) => {
				let newVenues = [...currentVenues];
				newVenues = newVenues.filter((v) => v.id !== id);
				return newVenues;
			}),
	};
};

export default useFavVenues;
