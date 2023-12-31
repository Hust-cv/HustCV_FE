'use client'
import { useState, useEffect} from "react";
import Card from "@/app/components/applicationCard";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import getNewAccessToken from "@/app/utils/getNewAccessToken";
import Error from "next/error";
const Applications = () => {
    const baseURL = "http://localhost:6868/api/recruiterApplication"
    const router = useRouter();
    const path = usePathname();
    const [applications, setApplications] = useState<any>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<number>(200);
    let refreshToken: any;
    let accessToken: any;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken){
             router.push("/login");
        }
        accessToken = localStorage.getItem('accessToken')
    }
    useEffect(() => {
        getPosts()
        async function getPosts() {
            try{
                const response = await axios.get(`${baseURL}/getAcceptedApplications/${path.split('/').pop()}`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                })
                setApplications([...response.data.data]);
                setLoading(false);
            }
            catch(e:any){
                if (e.response.status != 401){
                    setError(e.response.status)
                }
                else if (e.response.status == 401){
                    try{
                        console.log(refreshToken)
                        await getNewAccessToken(refreshToken, localStorage);
                        router.refresh();
                    }
                    catch (e){
                        router.push("/login")
                    }
                }
            }
        }
    }, [router, path, refreshToken, accessToken]);
    if (error != 200){
        return(
            <>
                <Error statusCode={error} />
            </>
        )
    }
    if (isLoading){
        return (
            <>
                <div className="text-center h-screen">
                    <h1 className="text-3xl text-gray-800 font-semibold">
                        Loading...
                    </h1>
                </div>
            </>
        )
    }
    return (
        <>
        {!(applications!=null && applications.length==0) ||
            <div className="text-center h-screen">
                <h1 className="text-3xl text-gray-800 font-semibold">
                        Accepted Applications
                </h1>
                    <p className="mt-3 text-gray-500">
                        No Accepted Applications
                    </p>
            </div>
        }
        {!(applications != null && applications.length) || 
                <Card applications={applications} href={`/acceptedApplications/detail/`} title={"Pending Applications"}></Card>
        }
        </>
    )
}
export default Applications