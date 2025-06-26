'use server'

export default async function getCoupons(token){
    try{
        const res = await fetch("http://localhost:5000/api/coupons",{
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
            return null;
        }
    }catch(err){
        return null;
    }
}