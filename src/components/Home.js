import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import GlobalContext from "./GlobalContext";
import { useNavigate } from "react-router-dom";
import BackToTop from "./BackToTop";
import Loader from "./Loader";
import Time from "./Time";
import TvMazeDate from "./details/TvMazeDate";

const Home = () => {



    const [error, setError] = useState(null);

    const [serije, setSerije] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {
        getTv();
    }, [])

    const getTv = async () => {

        const urlTv = `https://api.tvmaze.com/schedule/web`;

        try {
            const responseTv = await axios.get(urlTv);

            const dataTv = responseTv.data
            setSerije(dataTv);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    };

    const handleStartDateChange = (e) => {
        const date = new Date(e.target.value);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const LinkTo = `/tvmazedate/${formattedDate}`;
        navigate(LinkTo);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


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
            <div className="homeCont" style={{ paddingTop: "60px" }}>
                <div className="time">Series from TvMaze. <Time /></div>
                <div style={{ display: "flex" }}>
                    <div style={{ padding: "15px" }}>
                        <fieldset className="fieldset">
                            <legend>choose a date:</legend>
                            <input type="date"
                                title="choose a start date"
                                className="dateInput"
                                onChange={handleStartDateChange} />
                        </fieldset>
                    </div>
                    <div style={{ padding: "15px" }}>
                        <button className="buttonS"
                            onClick={() => {
                                clickQ();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                            Quotes
                        </button>
                    </div>
                </div>
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