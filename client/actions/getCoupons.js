'use server'

export default async function getCoupons(token){
    try{
        const res = await fetch(process.env.SERVER_BASE_URL+"/api/coupons",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (res.ok && data) {
            return data;
        } else {
            console.log("Null Data Received:", data, res.ok)
            return null;
        }
    }catch(err){
        console.log("Error occured while getting coupons:", err)
        return null;
    }
}