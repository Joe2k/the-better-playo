import { Button, Divider, Group, ScrollArea, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { IconPlus, IconTrash, IconSearch } from "@tabler/icons";

export const VenueEditor = ({
	venues,
	venueList,
	venueIDs,
	addVenue,
	removeVenue,
}) => {
	const [search, setSearch] = useState("");
	return (
		<>
			<Group position="center" spacing="xs">
				{venues.map((v) => (
					<Button
						key={v.id}
						variant="light"
						color="indigo"
						size="xs"
						radius="xl"
						leftIcon={<IconTrash size={14} />}
						onClick={() => removeVenue(v.id)}
					>
						{v.name.length > 30
							? v.name.substring(0, 30 - 3) + "..."
							: v.name}
					</Button>
				))}
			</Group>
			<Divider sx={{ marginTop: "2vh", marginBottom: "2vh" }} />
			<TextInput
				placeholder="Search"
				icon={<IconSearch size={14} />}
				sx={{ marginTop: "2vh", marginBottom: "2vh" }}
				value={search}
				onChange={(event) => setSearch(event.currentTarget.value)}
			/>

			<ScrollArea style={{ height: "30vh" }} type="always">
				{venueList
					?.filter((v) => !venueIDs.has(v.id))
					.filter(
						(v) =>
							v.name
								.toLowerCase()
								.includes(search.toLowerCase()) ||
							v.area.toLowerCase().includes(search.toLowerCase())
					)
					.map((v) => (
						<Button
							key={v.id}
							variant="light"
							color="teal"
							size="xs"
							radius="xl"
							fullWidth
							sx={{ marginBottom: "2vh" }}
							leftIcon={<IconPlus size={14} />}
							onClick={() => addVenue(v.id, v.name)}
						>
							{v.name.length > 30
								? v.name.substring(0, 30 - 3) + "..."
								: v.name}
						</Button>
					))}
			</ScrollArea>
		</>
	);
};
