import axios from "axios"
export default async function getNewAccessToken(refreshToken:string, localStorage:any) {
    const apiAuth = "http://localhost:6868/api/auths/refreshToken"
    const response = await axios.post(`${apiAuth}`,{
        refreshToken
    }, {
        headers: {
            "Authorization": `Bearer ${refreshToken}`,
            "Content-Type": "application/json"
        }
    })
    localStorage.setItem("accessToken", response.data.accessToken)
}