import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const MovieActor = (props) => {
    const [error, setError] = useState(null);
    const [tvShow, setTvShow] = useState([]);
    const [results, setResults] = useState([]);

    const navigate = useNavigate();

    const actors = props.actor

    useEffect(() => {
        getTvShow();
    }, []);

    const getTvShow = async () => {
        const url = `https://api.tvmaze.com/search/people?q=${actors}`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            setTvShow(data);
            setResults(data.length);

        } catch (err) {
            setError(err);
        }
    };

    const clickActor = (actorId) => {
        const LinkTo = `/actorDetails/${actorId}`;
        navigate(LinkTo);
    }

    if (results == 0) {
        return (<>
            <p>
                {actors}
            </p>
        </>)
    }

    return (
        <>
            <p colSpan={2}
                className="actorName"
                onClick={() => {
                    clickActor(tvShow?.[0].person.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                {actors}
            </p>
        </>
    );
};
export default MovieActor;