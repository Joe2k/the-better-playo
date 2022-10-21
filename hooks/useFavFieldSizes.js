import { useLocalStorage } from "@mantine/hooks";

const useFavFieldSizes = (initialFavFieldSizes) => {
	const [fieldSizes, setFieldSizes] = useLocalStorage({
		key: "fav-field-sizes-local",
		defaultValue: initialFavFieldSizes,
	});

	return {
		fieldSizes,
		addFieldSize: (id) =>
			setFieldSizes((currentFieldSizes) => {
				return {
					...currentFieldSizes,
					[id]: true,
				};
			}),
		removeFieldSize: (id) =>
			setFieldSizes((currentFieldSizes) => {
				return {
					...currentFieldSizes,
					[id]: false,
				};
			}),
	};
};

export default useFavFieldSizes;
