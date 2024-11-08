import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import BackToTop from "./BackToTop";
import Loader from "./Loader";
import Time from "./Time";

const Home = () => {

    const [error, setError] = useState(null);
    const [vreme, setVreme] = useState([]);
    const [serije, setSerije] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        getTv();
    }, [])

    const getTv = async () => {

        const mestoDatuma = vreme

        const urlTv = `https://api.tvmaze.com/schedule/web?date=${mestoDatuma}`;

        try {
            const responseTv = await axios.get(urlTv);

            const dataTv = responseTv.data
            setSerije(dataTv);
            setIsLoading(false);
            console.log("tv serije home", dataTv)

        } catch (err) {
            setError(err);
        }
    };

    const clickShow = (showId) => {
        const LinkTo = `/showDetails/${showId}`;
        navigate(LinkTo);
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            <div className="gridTv" style={{ paddingTop: "60px" }}>
                <p className="time">Series <Time /></p>
            </div>
            <div className="gridTv">
                {serije.map((serija) => (
                    <>
                        <div key={serija._embedded.show.id}
                            className="gridItem">

                            <img src={serija._embedded.show.image?.medium} alt="no picture" />

                            <div className="genresTv">
                                <p className="episode">S{serija.season}  E{serija.number}</p>
                                <p>{serija._embedded.show.language}</p>
                                <p>{serija._embedded.show.type}</p>
                                {serija._embedded.show.genres && (
                                    <>
                                        {serija._embedded.show.genres.map((genre, id) => (
                                            <p key={id}>{genre}</p>
                                        ))}
                                    </>
                                )}
                                {serija._embedded.show.runtime && (
                                    <p style={{paddingTop: "15px"}}>⏲{serija._embedded.show.runtime} min</p>
                                )}
                            </div>

                            <p className="showName"
                                onClick={() => clickShow(serija._embedded.show.id)}>
                                {serija._embedded.show.name}</p>
                        </div>
                    </>
                ))}
            </div>
            <BackToTop />
        </>
    )

}
export default Home;