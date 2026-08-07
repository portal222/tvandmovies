import React, { useEffect, useState } from "react";
import axios from "axios";
import breaking from "../../../public/img/braking.jpg";
import parks from "../../../public/img/parks.jpg";
import thrones from "../../../public/img/thrones.jpg";
import final from "../../../public/img/finalSpace.jpg";
import stranger from "../../../public/img/stranger.jpg";
import demonS from "../../../public/img/slayer.jpg";
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
    const [slayer, setSlayer] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const breakingBead = 169
    const gameOf = 82
    const parksAnd = 174
    const space = 23314
    const things = 2993
    const demonSlayer = 41469

    const number = Math.floor(Math.random() * 50);
    const numberThings = Math.floor(Math.random() * 107);

    useEffect(() => {
        getApi();
        getSlayer();
    }, [])

    const getApi = async () => {

        const urlR = `https://ron-swanson-quotes.herokuapp.com/v2/quotes`;
        const urlS = `https://finalspaceapi.com/api/v0/quote`;

        try {
            const responseR = await axios.get(urlR);
            const responseS = await axios.get(urlS);

            const dataR = responseR.data;
            const dataS = responseS.data;

            setIsLoading(false);
            setSwanson(dataR)
            setFinalSpace(dataS);

        } catch (err) {
            setError(err);
        }
    }

    const getSlayer = async () => {
        const url = `https://api.animechan.io/v1/quotes/random?anime=Demon_Slayer`;
        const urlBB =`https://ridlejoke-proxy.kvaka32.workers.dev/brebed`;

        try {
            const response = await axios.get(url)
            const responseBB = await axios.get(urlBB)
            const data = response.data
            const dataBB = responseBB.data

            setSlayer(data);
            console.log("breking bed", dataBB);

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
                <div className="detailMov">
                    <p className="cover"
                        onClick={() => {
                            clickShow(demonSlayer);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>

                        <img src={demonS} alt="" className="slayer" />
                    </p>
                    <div>
                        <p className="titleQ"
                            onClick={() => {
                                clickShow(demonSlayer);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                            Demon Slayer
                        </p>

                        {slayer?.data?.content && (
                            <p className="sentenceQ">
                                {slayer?.data?.content}
                            </p>
                        )}
                        {slayer.data?.character?.name && (
                            <p className="nameQ">
                                {slayer.data?.character?.name}
                            </p>
                        )}
                        <p className="quotes">
                            Quotes for this series are limited to three per hour
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Quotes;