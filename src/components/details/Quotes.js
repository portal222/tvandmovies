import React, { useEffect, useState } from "react";
import axios from "axios";
import breaking from "../../../public/assets/img/braking.jpg";
import parks from "../../../public/assets/img/parks.jpg";
import thrones from "../../../public/assets/img/thrones.jpg";
import final from "../../../public/assets/img/finalSpace.jpg";
import stranger from "../../../public/assets/img/stranger.jpg";
import datas from "../../../public/strangerThings.json";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";


const Quotes = () => {

    const [error, setError] = useState(null);
    const [episode, setEpisode] = useState([]);
    const [got, setGot] = useState([]);
    const [bead, setBead] = useState([]);
    const [swanson, setSwanson] = useState([]);
    const [finalSpace, setFinalSpace] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const breakingBead = 169
    const gameOf = 82
    const parksAnd = 174
    const space = 23314
    const things = 2993

    const number = Math.floor(Math.random() * 50);
    const numberThings = Math.floor(Math.random() * 107);



    useEffect(() => {
        getApi();
    }, [])

    const getApi = async () => {

        const urlB = `https://api.breakingbadquotes.xyz/v1/quotes`;
        const urlP = `https://api.gameofthronesquotes.xyz/v1/random`;
        const urlR = `https://ron-swanson-quotes.herokuapp.com/v2/quotes`;
        const urlS = `https://finalspaceapi.com/api/v0/quote`;

        try {
            const responseP = await axios.get(urlP);
            const responseB = await axios.get(urlB);
            const responseR = await axios.get(urlR);
            const responseS = await axios.get(urlS);

            const dataB = responseB;
            const dataP = responseP;
            const dataR = responseR.data;
            const dataS = responseS.data;

            setIsLoading(false);
            setGot(dataP.data);
            setBead(dataB.data);
            setSwanson(dataR)
            setFinalSpace(dataS);

        } catch (err) {
            setError(err);
        }
    }

    const clickShow = (showId) => {
        const LinkTo = `/showDetails/${showId}`;
        navigate(LinkTo);
    }

    if (isLoading) {
        return (
            <Loader />)
    }
    return (
        <>
            <div className="detailMain" style={{ paddingTop: "80px" }}>
                <div className="detailMov">
                    <p className="cover"
                        onClick={() => {
                            clickShow(gameOf);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>

                        <img src={thrones} alt="" />
                    </p>
                    <div>
                        <p className="titleQ"
                            onClick={() => {
                                clickShow(gameOf);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                            Game of Thrones
                        </p>
                        <p className="sentenceQ">
                            {got.sentence}
                        </p>
                        <p className="nameQ">
                            {got.character?.name}
                        </p>
                    </div>
                </div>
                <div className="detailMov">
                    <p className="cover"
                        onClick={() => {
                            clickShow(breakingBead);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>

                        <img src={breaking} alt="" />
                    </p>
                    <div>
                        {bead.map((b, id) => (
                            <div key={id}>
                                <p className="titleQ"
                                    onClick={() => {
                                        clickShow(breakingBead);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}>
                                    Breaking Bad
                                </p>
                                <p className="sentenceQ">
                                    {b.quote}
                                </p>
                                <p className="nameQ">
                                    {b.author}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="detailMov">
                    <p className="cover"
                        onClick={() => {
                            clickShow(things);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>

                        <img src={stranger} alt="" />
                    </p>
                    <div>
                        <p className="titleQ"
                            onClick={() => {
                                clickShow(things);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                            Stranger Things
                        </p>
                        <p className="sentenceQ">
                            {datas?.[numberThings]?.quote}
                        </p>
                        <p className="nameQ">
                            {datas?.[numberThings]?.author}
                        </p>
                    </div>
                </div>
                <div className="detailMov">
                    <p className="cover"
                        onClick={() => {
                            clickShow(parksAnd);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>

                        <img src={parks} alt="" />
                    </p>
                    <div>
                        <p className="titleQ"
                            onClick={() => {
                                clickShow(parksAnd);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                            Parks and Recreation
                        </p>
                        <p className="sentenceQ">
                            {swanson?.[0]}
                        </p>
                        <p className="nameQ">
                            Ron Swanson
                        </p>
                    </div>
                </div>
                <div className="detailMov">
                    <p className="cover"
                        onClick={() => {
                            clickShow(space);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>

                        <img src={final} alt="" />
                    </p>
                    <div>
                        <p className="titleQ"
                            onClick={() => {
                                clickShow(space);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                            Final Space
                        </p>
                        <p className="sentenceQ">
                            {finalSpace?.[number]?.quote}
                        </p>
                        <p className="nameQ">
                            {finalSpace?.[number]?.by}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Quotes;