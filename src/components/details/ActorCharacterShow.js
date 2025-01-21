import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ActorCharacterShow = (props) => {
    const [error, setError] = useState(null);
    const [serije, setSerije] = useState([]);
    const [show, setShow] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getSerije();
    }, []);

    const getSerije = async () => {

        const urlCast = `${props.show}`

        try {

            const responseCast = await axios.get(urlCast);

            const dataCast = responseCast.data;

            setShow(dataCast);


        } catch (err) {
            setError(err);


        }
    };

    const clickShow = (showId) => {
        const LinkTo = `/showDetails/${showId}`;
        navigate(LinkTo);
    }

    return (
        <>
            <div >
                <p className="clickShow"
                    onClick={() => {
                        clickShow(show.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                    {show.name}
                </p>
                <p>{show.premiered}</p>
                <ul className="genres">
                    <li>{show.genres?.[0]}</li>
                    <li>{show.genres?.[1]}</li>
                </ul>
                <ul className="genres">
                    <li>{show.genres?.[2]}</li>
                    <li>{show.genres?.[3]}</li>
                </ul>
            </div>

        </>
    );
};
export default ActorCharacterShow;