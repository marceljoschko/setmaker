import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
	const auth = false;

	return auth ? <Outlet /> : <Navigate to="/login" />;
}
