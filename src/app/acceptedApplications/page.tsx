'use client'

import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Card from '../components/postCard'
import Error from 'next/error'
import getNewAccessToken from '../utils/getNewAccessToken'

const Home = () => {
    const baseURL = "http://localhost:6868/api/recruiterApplication"
    const router = useRouter();
    const [posts, setPosts] = useState<any>(null);
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
                const response = await axios.get(`${baseURL}/getPosts`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                })
                // set here
                setLoading(false);
                setPosts([...response.data.data]);
            }
            catch(e: any){
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
    }, [refreshToken, router, accessToken]);
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
            {!(posts != null && posts.length==0) || 
                <div className="text-center h-screen">
                    <h1 className="text-3xl text-gray-800 font-semibold">
                        Hiring Posts
                    </h1>
                    <p className="mt-3 text-gray-500">
                        No Hiring Posts
                    </p>
                </div>
            }
            {!(posts != null && posts.length) || 
            // <Card title={"Hiring Posts"} posts={posts} href={`/danh-cho-nha-tuyen-dung/applications/list/`}></Card>
            <Card title={"Hiring Posts"} posts={posts} href={`/acceptedApplications/`}></Card>
            }
        </>
    )
}

export default Home