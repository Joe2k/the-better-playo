import { Button, Group } from "@mantine/core";
import React from "react";

const FieldSizesBox = ({ fieldSizes, addFieldSize, removeFieldSize }) => {
	return (
		<Group position="center" spacing="xs">
			{Object.keys(fieldSizes).map((t) => (
				<Button
					key={t}
					variant={fieldSizes[t] ? "light" : "subtle"}
					gradient={{ from: "teal", to: "lime" }}
					color="indigo"
					size="xs"
					radius="xl"
					onClick={() =>
						fieldSizes[t] ? removeFieldSize(t) : addFieldSize(t)
					}
				>
					{t}
				</Button>
			))}
		</Group>
	);
};

export default FieldSizesBox;
