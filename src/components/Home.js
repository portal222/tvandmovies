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

    window.scrollTo({ top: 0, behavior: 'smooth' });

    console.log("vreme je", vreme);

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

        } catch (err) {
            setError(err);
        }
    };

    const clickShow = (showId) => {
        const LinkTo = `/showDetails/${showId}`;
        navigate(LinkTo);
    }

    const clickQ = () => {
        const LinkTo = `/quotes`;
        navigate(LinkTo);
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            <div className="gridTv" style={{ paddingTop: "60px" }}>
                <p className="time">Series <Time /></p>
                <button className="buttonS"
                    onClick={() => {
                        clickQ();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                    Quotes from the series
                </button>
            </div>
            <div className="gridTv">
                {serije.map((serija, id) => (
                    <div key={id}
                        className="gridItem">
                        <img src={serija._embedded.show.image?.medium} alt="" />
                        <div className="genresTv">
                            <p className="episode">S{serija.season}  E{serija.number}</p>
                            <p>{serija._embedded.show.language}</p>
                            <p>{serija._embedded.show.type}</p>
                            {serija._embedded.show.genres && (
                                <>
                                    {serija._embedded.show.genres.map((genre, id) => (
                                        < div key={id}>
                                            <p >{genre}</p>
                                        </ div>
                                    ))}
                                </>
                            )}
                            {serija._embedded.show.runtime && (
                                <p style={{ paddingTop: "10px" }}>⏲{serija._embedded.show.runtime} min</p>
                            )}
                        </div>
                        <p className="showName"
                            onClick={() => {
                                clickShow(serija._embedded.show.id);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                            {serija._embedded.show.name}</p>
                    </div>
                ))}
            </div>
            <BackToTop />
        </>
    )
}
export default Home;