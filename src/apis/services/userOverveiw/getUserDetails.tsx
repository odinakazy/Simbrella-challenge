import axios from "axios";
import { User } from "../../Types";

// Base URL for the API
const API_BASE_URL = "https://67788072482f42b62e8effab.mockapi.io/api"; // Replace with your MockAPI URL

// Fetch user data with type safety
export const fetchUserData = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(
    `${API_BASE_URL}/user-details/users`
  );
  return data;
};
