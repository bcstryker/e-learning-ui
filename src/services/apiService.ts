// /src/services/apiService.ts

const API_BASE_URL = `https://${process.env.REACT_APP_API_URI_BASE}`;

// ----- AUTH ENDPOINTS ----- //

// Login a user and receive a token
export const login = async (email: string, password: string): Promise<{token: string} | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    });
    if (!response.ok) throw new Error("Failed to login");
    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    return undefined;
  }
};

// Verify a token and get user info
export const verifyToken = async (): Promise<any | undefined> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await fetch(`${API_BASE_URL}/api/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Token verification failed");
    return await response.json();
  } catch (error) {
    console.error("Error verifying token:", error);
    return undefined;
  }
};

// ----- USER PROFILE (SELF UPDATE) -----

// Update the currently authenticated user's profile (e.g., name, password)
export const updateUserProfile = async (meData: Partial<any>): Promise<any | undefined> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(meData),
    });
    if (!response.ok) throw new Error("Failed to update profile");
    return await response.json();
  } catch (error) {
    console.error("Error updating user profile:", error);
    return undefined;
  }
};

// ----- ADMIN USER MANAGEMENT -----

// Create multiple new users (students)
export const createUsers = async (
  emails: string[],
  courses: string[]
): Promise<{message: string; users: any[]} | undefined> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({emails, courses}),
    });
    if (!response.ok) throw new Error("Failed to create users");
    return await response.json();
  } catch (error) {
    console.error("Error creating users:", error);
    return undefined;
  }
};

// Update an existing user (admin-only)
export const updateUser = async (userData: Partial<any>): Promise<any | undefined> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to update user");
    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    return undefined;
  }
};

// Get one or all users (admin-only)
export const getUsers = async (email?: string): Promise<any[] | any | undefined> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const query = email ? `?email=${encodeURIComponent(email)}` : "";
    const response = await fetch(`${API_BASE_URL}/api/admin/users${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return email ? undefined : [];
  }
};

// Delete a user by email (admin-only)
export const deleteUser = async (email: string): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({email}),
    });
    if (!response.ok) throw new Error("Failed to delete user");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// ----- QUESTIONS ENDPOINT -----

// Get questions, optionally filtered by sectionId
export const getQuestions = async (sectionId?: string): Promise<any[] | undefined> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const query = sectionId ? `?sectionId=${encodeURIComponent(sectionId)}` : "";
    const response = await fetch(`${API_BASE_URL}/api/questions${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch questions");
    return await response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    return undefined;
  }
};

// ----- SECTIONS ENDPOINT -----

// Get all sections for a given course
export const getSections = async (courseCode: string): Promise<any[] | undefined> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${API_BASE_URL}/api/courses/${encodeURIComponent(courseCode)}/sections`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch sections");
    return await response.json();
  } catch (error) {
    console.error("Error fetching sections:", error);
    return undefined;
  }
};

// ----- COURSES ENDPOINT -----

// Get all courses
export const getCourses = async (): Promise<any[] | undefined> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${API_BASE_URL}/api/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response: ", response);
    if (!response.ok) throw new Error("Failed to fetch courses");
    return await response.json();
  } catch (error) {
    console.error("Error fetching courses:", error);
    return undefined;
  }
};
