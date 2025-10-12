import React, {useEffect, useState} from "react";
import api from "../api";
import CocktailList from "../components/cocktailList";

function Bookmarks(){
    const [bookmarks, setBookmarks]= useState([]);

    useEffect(() => {
        async function fetchBookmarks(){
            try{
                const token = localStorage.getItem("token");
                const response = await api.get("/bookmarks", {
                    headers: {
                        'Authorization' : token
                    }
                });
                setBookmarks(response.data);
            } catch(err){
                console.error("Error fetching bookmarks", err);
            }
        };

        fetchBookmarks();
    }, [])

    return(
        <div className="container mt-4">
            <h2 className="mb-4">Your Bookmarked Cocktails</h2>
            {bookmarks.length === 0 ? (
                <p>You have no bookmarks yet.</p>
            ) : (
                <CocktailList cocktails={bookmarks} />
            )}
        </div>
    )
}

export default Bookmarks;