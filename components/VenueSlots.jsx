import {
	Accordion,
	Alert,
	Anchor,
	Box,
	Button,
	Divider,
	Group,
	ScrollArea,
	Text,
} from "@mantine/core";
import React, { useState } from "react";
import moment from "moment";

const VenueSlots = ({ venue }) => {
	const [selectedDate, setSelectedDate] = useState(
		venue &&
			venue["preffered_slots"] &&
			Object.keys(venue["preffered_slots"])[0]
	);
	return (
		<Box>
			<Group position="apart" mt="md" mb="xs">
				<Text weight={500}>
					{venue.name.length > 30
						? venue.name.substring(0, 30 - 3) + "..."
						: venue.name}
					<Text color="dimmed">
						{venue.area.length > 30
							? venue.area.substring(0, 30 - 3) + "..."
							: venue.area}
					</Text>
				</Text>
				<Anchor href={venue.shareLink} target="_blank">
					<Button
						color="indigo"
						variant="light"
						radius="xl"
						size="xs"
					>
						Book
					</Button>
				</Anchor>
			</Group>
			<ScrollArea
				sx={(theme) => ({
					width: "84vw",
					height: "40px",

					"@media (min-width: 1000px)": {
						width: "74vw",
					},
				})}
				type="always"
				scrollbarSize={4}
			>
				<div style={{ width: "max-content" }}>
					{venue &&
						venue["preffered_slots"] &&
						Object.keys(venue["preffered_slots"]).map((date) => (
							<Button
								key={date}
								variant={
									date === selectedDate ? "light" : "subtle"
								}
								color="teal"
								size="xs"
								radius="xl"
								onClick={() => setSelectedDate(date)}
							>
								{moment(date).format("Do MMM")}
							</Button>
						))}
				</div>
			</ScrollArea>
			<Accordion
				variant="separated"
				radius="xl"
				defaultValue="customization"
				style={{ marginTop: "20px" }}
			>
				{venue &&
					venue["preffered_slots"] &&
					venue["preffered_slots"][selectedDate] &&
					Object.keys(venue["preffered_slots"][selectedDate])
						.filter(
							(v) =>
								venue["preffered_slots"][selectedDate][v]
									.length > 0
						)
						.map((v) => (
							<Accordion.Item key={v} value={v}>
								<Accordion.Control>{v}</Accordion.Control>
								<Accordion.Panel>
									<Group position="center" spacing="xs">
										{venue["preffered_slots"][selectedDate][
											v
										].map((t) => (
											<Button
												key={
													t.startingTime +
													t.endingTime
												}
												variant="light"
												gradient={{
													from: "teal",
													to: "lime",
												}}
												color="teal"
												size="xs"
												radius="xl"
											>
												{t.startingTime +
													" - " +
													t.endingTime}
											</Button>
										))}
									</Group>
								</Accordion.Panel>
							</Accordion.Item>
						))}
			</Accordion>
			{venue &&
				venue["preffered_slots"] &&
				venue["preffered_slots"][selectedDate] &&
				Object.keys(venue["preffered_slots"][selectedDate]).length ===
					0 && (
					<Alert
						title="No Available Slots!"
						color="indigo"
						radius="md"
					>
						{
							"We coudn't find any free slots for this date and your time prefference."
						}
					</Alert>
				)}
		</Box>
	);
};

export default VenueSlots;
