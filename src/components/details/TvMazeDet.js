import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";

import { useNavigate } from "react-router-dom";
import BackToTop from "../BackToTop";
import SearchTvShow from "../search/SearchTvShow";
import SearchActors from "../search/SearchActors";

const TvMazeDet = (props) => {
    const [error, setError] = useState(null);
    const [tvShow, setTvShow] = useState([]);

    const showName = props.name

    useEffect(() => {
        getTvShow(showName);
    }, [showName]);

    const getTvShow = async (showName) => {
        const url = `https://api.tvmaze.com/search/shows?q=${showName}`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            setTvShow(data);

        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
            <div className="dropdownM">
                <div>
                    <img src={tvShow?.[0]?.show.image?.medium} alt="" className="dropImg"
                    />
                </div>
                <span className="dropdown-contentM"
                >
                    <p>{tvShow?.[0]?.show.type}</p>
                    <>
                        {tvShow?.[0]?.show.genres.map((genre, id) => (
                            <p key={id}>{genre}</p>
                        ))}
                    </>
                    <p style={{ paddingTop: "15px" }}> ⏲{tvShow?.[0]?.show.runtime} min ⭐{tvShow?.[0]?.show.rating.average}</p>
                </span>
            </div>
        </>
    );
};
export default TvMazeDet;