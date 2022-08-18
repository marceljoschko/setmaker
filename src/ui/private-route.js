import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
	const auth = false;
	const location = useLocation();

	return auth ? (
		<Outlet />
	) : (
		<Navigate to={{ pathname: "/login", search: location.search }} />
	);
}
