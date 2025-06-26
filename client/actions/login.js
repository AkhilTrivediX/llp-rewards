'use server'

export default async function login(username, password, brand) {
     try {
    const res = await fetch(process.env.SERVER_BASE_URL+"/api/auth/login/"+brand, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      return data.token;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}