import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import BackToTop from "../BackToTop";
import { useParams } from "react-router-dom";
import Loader from "../Loader";

const TvMazeDate = () => {

    const [error, setError] = useState(null);
    const [vreme, setVreme] = useState([]);
    const [serije, setSerije] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams()
    const formattedDate = params.formattedDate;

    const navigate = useNavigate();

    window.scrollTo({ top: 0, behavior: 'smooth' });



    useEffect(() => {
        getTv(formattedDate);
    }, [])

    const getTv = async (formattedDate) => {

        const urlTv = `https://api.tvmaze.com/schedule/web?date=${formattedDate}`;

        try {
            const responseTv = await axios.get(urlTv);
            const dataTv = responseTv.data
            setSerije(dataTv);
            setIsLoading(false);
            setVreme(formattedDate)

        } catch (err) {
            setError(err);
        }
    };

    const handleStartDateChange = (e) => {
        const date = new Date(e.target.value);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        setVreme(formattedDate)
        getTv(formattedDate);

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
                <p className="time">Series on {vreme}</p>
                <fieldset className="fieldset">
                    <legend>choose a date:</legend>
                    <input type="date"
                        title="choose a start date"
                        className="dateInput"
                        onChange={handleStartDateChange} />
                </fieldset>
                <button className="buttonS"
                    onClick={() => {
                        clickQ();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                    Quotes
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
export default TvMazeDate;