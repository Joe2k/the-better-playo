import { Button, Group } from "@mantine/core";
import React from "react";

const TimeSlotsBox = ({ timeSlots, addTimeSlot, removeTimeSlot }) => {
	return (
		<Group position="center" spacing="xs">
			{Object.keys(timeSlots).map((t) => (
				<Button
					key={t}
					variant={timeSlots[t] ? "light" : "subtle"}
					gradient={{ from: "teal", to: "lime" }}
					color="teal"
					size="xs"
					radius="xl"
					onClick={() =>
						timeSlots[t] ? removeTimeSlot(t) : addTimeSlot(t)
					}
				>
					{t}
				</Button>
			))}
		</Group>
	);
};

export default TimeSlotsBox;
