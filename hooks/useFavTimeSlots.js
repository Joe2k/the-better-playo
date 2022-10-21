import { useLocalStorage } from "@mantine/hooks";

const useFavTimeSlots = (initialFavTimeSlots) => {
	const [timeSlots, setTimeSlots] = useLocalStorage({
		key: "fav-time-slots-local",
		defaultValue: initialFavTimeSlots,
	});

	return {
		timeSlots,
		addTimeSlot: (id) =>
			setTimeSlots((currentTimeSlots) => {
				return {
					...currentTimeSlots,
					[id]: true,
				};
			}),
		removeTimeSlot: (id) =>
			setTimeSlots((currentTimeSlots) => {
				return {
					...currentTimeSlots,
					[id]: false,
				};
			}),
	};
};

export default useFavTimeSlots;
