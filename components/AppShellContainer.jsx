import { useState } from "react";
import {
	AppShell,
	Navbar,
	Header,
	Footer,
	Aside,
	Text,
	MediaQuery,
	Burger,
	useMantineTheme,
	Title,
	NavLink,
	Button,
	Anchor,
	Divider,
} from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons";
import Link from "next/link";

export default function AppShellContainer({ children }) {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	return (
		<AppShell
			styles={{
				main: {
					background:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			navbar={
				<Navbar
					p="md"
					hiddenBreakpoint="sm"
					hidden={!opened}
					width={{ sm: 200, lg: 300 }}
				>
					<Text
						align="center"
						weight={500}
						sx={{ marginBottom: "2vh" }}
					>
						{
							"Choose your favorite venues, convenient timings, field size and find your perfect match in seconds! :)"
						}
					</Text>
					<Anchor
						href={"https://github.com"}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button
							fullWidth
							variant="light"
							color="indigo"
							leftIcon={<IconBrandGithub />}
						>
							Contribute
						</Button>
					</Anchor>
					<Divider mt={20} />
					<Text align="center" mt={20} size={20} weight={600}>
						Made with ♡ by{" "}
						<Anchor
							variant="gradient"
							underline
							target="_blank"
							href="https://github.com/Joe2k"
						>
							Jonathan Samuel
						</Anchor>
					</Text>
				</Navbar>
			}
			header={
				<Header height={70} p="md">
					<div
						style={{
							display: "flex",
							alignItems: "center",
							height: "100%",
						}}
					>
						<MediaQuery
							largerThan="sm"
							styles={{ display: "none" }}
						>
							<Burger
								opened={opened}
								onClick={() => setOpened((o) => !o)}
								size="sm"
								color={theme.colors.gray[6]}
								mr="xl"
							/>
						</MediaQuery>

						<Title
							order={1}
							color="teal.3"
							gradient={{ from: "indigo", to: "teal" }}
							variant="gradient"
						>
							the better playo.
						</Title>
					</div>
				</Header>
			}
		>
			{children}
		</AppShell>
	);
}
