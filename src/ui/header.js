/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";

import { Link, NavLink, useLocation } from "react-router-dom";
import { Fragment, useState } from "react";
import { useAppState } from "../app-state";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCaretDown,
	faTimes,
	faWrench,
	faInfoCircle,
	faVideo,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
	return (
		<header
			sx={{
				height: (theme) => theme.heights.headerHeight,
				lineHeight: (theme) => theme.heights.headerHeight,
				color: "background",
				display: "flex",
				justifyContent: "space-between",
				position: "relative",
				zIndex: 3,
			}}
		>
			{/* This div is used just for the background color. We can't set it for
            the parent element, as the navigation overlay would otherwise occlude
            this background color */}
			<div
				sx={{
					backgroundColor: "gray.0",
					position: "absolute",
					zIndex: -3,
					height: "100%",
					width: "100%",
				}}
			></div>

			{/* This div is an overlay that is shown when a recording is currently active.
            This prevents the user from visiting other pages while recording. */}
			{isRecording && (
				<div
					sx={{
						backgroundColor: "gray.0",
						position: "absolute",
						zIndex: 20,
						height: "100%",
						width: "100%",
						opacity: 0.75,
					}}
				/>
			)}

			{/* Actual content */}
			<Brand />
			<Navigation />
		</header>
	);
}

const Brand = () => {
	const location = useLocation();

	return (
		<Link to={{ pathname: "/", search: location.search }}>
			<picture
				sx={{
					display: "block",
					height: (theme) => theme.heights.headerHeight,
				}}
			>
				<source
					media="(min-width: 920px)"
					srcSet={`${process.env.PUBLIC_URL}/opencast-studio.svg`}
				/>
				<img
					src={`${process.env.PUBLIC_URL}/opencast-studio-small.svg`}
					alt="Opencast Studio"
					sx={{ height: (theme) => theme.heights.headerHeight }}
				/>
			</picture>
		</Link>
	);
};
