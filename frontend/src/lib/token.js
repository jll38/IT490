import { jwtDecode } from "jwt-decode";

const accessToken = localStorage.getItem('access_token');

export const User = accessToken && accessToken !== '' ? jwtDecode(accessToken) : null;