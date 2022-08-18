/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";

export default function Header() {
	return (
		<header
			sx={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				fontSize: "12pt",
				color: "white",
				paddingLeft: "32px",
				paddingRight: "32px",
				width: "100%",
				justifyContent: "space-between",
				heigth: "100px",
			}}
		>
			<h1>setmaker</h1>

			<div
				sx={{
					height: "32px",
					width: "32px",
					insetInlineStart: "0px",
				}}
			>
				<img
					sx={{
						borderRadius: "50%",
						objectFit: "cover",
						height: "100%",
						width: "100%",
					}}
					src="https://i.scdn.co/image/ab6775700000ee85584c36dda4f072e9800c7cda"
					alt="Marcce"
					onClick={(e) => console.log(e)}
				/>
			</div>
		</header>
	);
}
