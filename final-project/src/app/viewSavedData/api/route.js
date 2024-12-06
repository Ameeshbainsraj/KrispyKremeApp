import { getCustomSession } from "../../api/sessionCode"; // Import the function to get the session

export async function GET(req, res) {
  try {
    const session = await getCustomSession(); // Retrieve the session

    if (!session) {
      return res.status(400).json({ error: "Session not found" });
    }

    const email = session.email; // Access email stored in the session
    const role = session.role; // Access role stored in the session

    if (!email || !role) {
      return res.status(400).json({ error: "Session data is incomplete" });
    }

    // Respond with session data
    return res.status(200).json({ email, role });
  } catch (error) {
    console.error("Error retrieving session:", error);
    return res.status(500).json({ error: "Unable to fetch session data" });
  }
}
