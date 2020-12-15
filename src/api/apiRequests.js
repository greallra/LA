import axios from 'axios';
const baseUrl = 'http://localhost:3000'
export async function getUsers(){
    try {
        const data = await axios.get(baseUrl + '/users')
        return data;
    } catch (error) {
        console.log("getusers error", error);
        return {
            error: "getusers error"
        }
    }  
}