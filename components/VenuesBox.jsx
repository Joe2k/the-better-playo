import { ActionIcon, Badge, Button, Group } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons";
import React from "react";

const removeButton = (
	<ActionIcon size="sm" color="blue" variant="transparent">
		<IconX size={14} />
	</ActionIcon>
);

const VenuesBox = ({ venues, setOpened }) => {
	return (
		<Group position="center" spacing="xs">
			{venues.map((v) => (
				<Button
					key={v.id}
					variant="light"
					color="indigo"
					size="xs"
					radius="xl"
				>
					{v.name.length > 30
						? v.name.substring(0, 30 - 3) + "..."
						: v.name}
				</Button>
			))}
			<ActionIcon
				radius="xl"
				variant="subtle"
				color="indigo"
				onClick={() => setOpened(true)}
			>
				<IconPlus size={16} />
			</ActionIcon>
		</Group>
	);
};

export default VenuesBox;
