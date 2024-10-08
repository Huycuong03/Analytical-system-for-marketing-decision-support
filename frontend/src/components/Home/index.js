import "./index.css";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Home({ user }) {
    const [homeContent, setHomeContent] = useState(null)

    useEffect(() => {
        if (user) {
            axios.get(
                "http://localhost:5000/api/home",
                {
                    withCredentials: true
                }
            ).then((res) => {
                if (res.status === 200) {
                    setHomeContent(res.data["message"])
                }
            })
        }
    }, [user]);

    return (
        user ?
            <div id="home-page">
                {homeContent}
            </div>
            : <Navigate to="/login" replace />
    );
}
export default Home;