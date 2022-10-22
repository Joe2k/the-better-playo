import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
	Accordion,
	ActionIcon,
	Badge,
	Button,
	Card,
	Divider,
	Footer,
	Grid,
	Group,
	Modal,
	MultiSelect,
	ScrollArea,
	Skeleton,
	Text,
	TextInput,
} from "@mantine/core";
import AppShellContainer from "../components/AppShellContainer";
import useFavVenues from "../hooks/useFavVenues";
import { useEffect, useState } from "react";
import useFavTimeSlots from "../hooks/useFavTimeSlots";
import VenuesBox from "../components/VenuesBox";
import TimeSlotsBox from "../components/TimeSlotsBox";
import useSWR from "swr";
import axios from "axios";
import VenueSlots from "../components/VenueSlots";
import useFavFieldSizes from "../hooks/useFavFieldSizes";
import FieldSizesBox from "../components/FieldSizesBox";
import { VenueEditor } from "../components/VenueEditor";
import VenueSlotsSkeleton from "../components/VenueSlotsSkeleton";

const fetcher = (url, body) => axios.post(url, body).then((res) => res.data);
const getFetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
	const { venues, venueIDs, addVenue, removeVenue } = useFavVenues([
		{
			id: "343a53bf-de72-4c70-b41e-d3f378eb3ee1",
			name: "South United Football Club",
		},
		{
			id: "458439fe-20c0-4713-a585-87df9cab9348",
			name: "BBFS Arena",
		},
		{
			id: "4a8a3bbc-f960-4038-a6ba-d6f199cd519c",
			name: "Bangalore Football Stadium - Impetus Sports",
		},
		{
			id: "a600a4b2-95f1-4928-a484-779c53d45de6",
			name: "Silver Jubilee TurfPark",
		},
	]);

	const { timeSlots, addTimeSlot, removeTimeSlot } = useFavTimeSlots({
		"6AM-9AM": true,
		"9AM-12PM": false,
		"12PM-3PM": false,
		"3PM-6PM": false,
		"6PM-9PM": true,
		"9PM-12AM": true,
	});

	const { fieldSizes, addFieldSize, removeFieldSize } = useFavFieldSizes({
		"5 A Side": false,
		"6 A Side": false,
		"7 A Side": true,
		"8 A Side": true,
		"9 A Side": true,
		"11 A Side": true,
	});

	const timeRangeMap = {
		"6AM-9AM": ["06:00:00", "09:00:00"],
		"9AM-12PM": ["09:00:00", "12:00:00"],
		"12PM-3PM": ["12:00:00", "15:00:00"],
		"3PM-6PM": ["15:00:00", "18:00:00"],
		"6PM-9PM": ["18:00:00", "21:00:00"],
		"9PM-12AM": ["21:00:00", "24:00:00"],
	};

	const fieldSizeMap = {
		"5 A Side": 5,
		"6 A Side": 6,
		"7 A Side": 7,
		"8 A Side": 8,
		"9 A Side": 9,
		"11 A Side": 11,
	};

	const [opened, setOpened] = useState(false);

	const { data, error } = useSWR(
		[
			"/api/venues/fav",
			{
				venueIDs: venues.map((v) => v.id),
				timeSlots: Object.keys(timeSlots).map(
					(t) => timeSlots[t] && timeRangeMap[t]
				),
				fieldSizes: Object.keys(fieldSizes).map(
					(f) => fieldSizes[f] && fieldSizeMap[f]
				),
			},
		],
		fetcher
	);
	const venueListAPI = useSWR("/api/venues/all", getFetcher);

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<AppShellContainer>
			<Modal opened={opened} onClose={() => setOpened(false)}>
				<VenueEditor
					venues={venues}
					venueList={venueListAPI.data}
					venueIDs={venueIDs}
					addVenue={addVenue}
					removeVenue={removeVenue}
				/>
			</Modal>
			<Grid grow>
				<Grid.Col span={12}>
					<VenuesBox venues={venues} setOpened={setOpened} />
				</Grid.Col>
				<Grid.Col span={12}>
					<Divider />
				</Grid.Col>
				<Grid.Col span={12}>
					<TimeSlotsBox
						timeSlots={timeSlots}
						addTimeSlot={addTimeSlot}
						removeTimeSlot={removeTimeSlot}
					/>
				</Grid.Col>
				<Grid.Col span={12}>
					<Divider />
				</Grid.Col>
				<Grid.Col span={12}>
					<FieldSizesBox
						fieldSizes={fieldSizes}
						addFieldSize={addFieldSize}
						removeFieldSize={removeFieldSize}
					/>
				</Grid.Col>
				<Grid.Col span={12}>
					<Divider />
				</Grid.Col>
				{data &&
					data.map((v) => (
						<>
							<Grid.Col
								span={12}
								style={{
									paddingLeft: "3vw",
									paddingRight: "3vw",
								}}
							>
								<VenueSlots key={v.id} venue={v} />
							</Grid.Col>
							<Grid.Col span={12}>
								<Divider />
							</Grid.Col>
						</>
					))}
				{!data && <VenueSlotsSkeleton />}
			</Grid>
		</AppShellContainer>
	);
}
