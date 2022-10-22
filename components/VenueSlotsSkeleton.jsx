import { Grid, Group, Skeleton } from "@mantine/core";
import React from "react";

const VenueSlotsSkeleton = () => {
	return (
		<Grid.Col
			span={12}
			style={{
				paddingLeft: "3vw",
				paddingRight: "3vw",
			}}
		>
			<Group position="apart" mt="md" mb="xs">
				<Skeleton height={10} width="60%" />
				<Skeleton height={16} radius="xl" width="20%" />
			</Group>
			<Skeleton height={10} width="30%" />
			<Group mt="md" mb="xs" noWrap>
				<Skeleton height={16} radius="xl" width="20%" />
				<Skeleton height={16} radius="xl" width="20%" />
				<Skeleton height={16} radius="xl" width="20%" />
				<Skeleton height={16} radius="xl" width="20%" />
				<Skeleton height={16} radius="xl" width="20%" />
			</Group>
			<Skeleton height={30} mt="xl" radius="xl" />
			<Skeleton height={30} mt="sm" radius="xl" />
		</Grid.Col>
	);
};

export default VenueSlotsSkeleton;
