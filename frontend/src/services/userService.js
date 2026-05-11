const API_URL = "http://localhost:3000/api/users";

// GET
export const getUsers = async () => {
    const res = await fetch(API_URL);
    return res.json();
};

// POST
export const createUser = async (data) => {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return res.json();
};