import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import ResultsTvTime from "../results/ResultsTvTime";
import { useNavigate } from "react-router-dom";
import SezoneList from "./SezoneList";
import EpisodeNumber from "./EpisodeNumber";
import BackToTop from "../BackToTop";
import Slider from "react-slick";
import Loader from "../Loader";
import SeriesOmdb from "./SeriesOmdb";
import OmdbImgSeries from "./OmdbImgSeries";

const DetailsTvShow = () => {
    const [error, setError] = useState(null);
    const [show, setShow] = useState([]);
    const [cast, setCast] = useState([]);
    const [sezons, setSezons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const params = useParams()
    const showId = params.showId;

    useEffect(() => {
        getShow();
    }, []);

    const getShow = async () => {

        const url = `https://api.tvmaze.com/shows/${showId}?embed=cast`
        const urlEp = `https://api.tvmaze.com/shows/${showId}/episodes`
        const urlSez = `https://api.tvmaze.com/shows/${showId}/seasons`

        try {
            const response = await axios.get(url);
            const responseEp = await axios.get(urlEp);
            const responseSez = await axios.get(urlSez);

            const data = response.data;
            const dataEp = responseEp.data;
            const dataSez = responseSez.data.reverse();

            setShow(data);
            setCast(data._embedded.cast);
            setSezons(dataSez)
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    };

    const settings = {

        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2500,
        cssEase: "linear"
    };
    const clickPerson = (actorId) => {
        const LinkTo = `/actorDetails/${actorId}`;
        navigate(LinkTo);
    }

    const clickImg = (images) => {
        const LinkTo = `/imgShow/${images}`;
        navigate(LinkTo);
    }
    const classFunction = (average) => {
        if (average == null) {
            return 'average';
        }
    }
    const classFunction2 = (runtime) => {
        if (runtime == null) {
            return 'average';
        }
    }
    const classFunction3 = (ended) => {
        if (ended == null) {
            return 'average';
        }
    }
    const classFunction4 = (name) => {
        if (name == undefined) {
            return 'average';
        }
    }

    const classFunction5 = (name) => {
        if (name == undefined) {
            return 'average';
        }
    }

    const classFunction6 = (name) => {
        if (name == undefined) {
            return 'average';
        }
    }

    if (isLoading) {
        return (
            <Loader />
        )
    }
    return (
        <>
            <div className="details">
                <div
                    className="holdImg">
                    <img className="imgShow"
                        src={show.image?.original} />
                        <OmdbImgSeries number={show.externals.imdb} />
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={2}
                                className="showName">
                                {show.name}
                            </td>
                        </tr>
                        <tr>
                            <td className="language">
                                {show.type}
                            </td>
                            {show.genres && (
                                <td >
                                    {show.genres.map((genre, id) => (
                                        <p key={id}>{genre}</p>
                                    ))}
                                </td>
                            )}
                        </tr>
                        <tr>
                            <td className="language">{show.language}</td>
                            <td className="runtime">

                                <p className={`rating2 ${classFunction2(show.runtime)}`}>
                                    {" ⏲ " + show.runtime + " min  " + " "}
                                </p>
                                <p className={`rating ${classFunction(show.rating?.average)}`}>
                                    {" " + " ⭐ " + show.rating?.average + " "}
                                </p>
                            </td>
                        </tr>
                        <EpisodeNumber sezones={sezons} />
                        <tr>
                            <td className="rating3">Premiered:{" " + show.premiered}</td>
                            {show.ended && (
                                <td className={`rating3 ${classFunction3(show.ended)}`}>
                                    {"Ended: " + show.ended}</td>
                            )}
                        </tr>
                        <tr>
                            <td colSpan={3} className="summary" dangerouslySetInnerHTML={{ __html: show.summary }}>
                            </td>
                        </tr>
                                <SeriesOmdb number={show.externals.imdb} />
                        <tr>
                            {show.webChannel?.name && (
                                <td className={`rating3 ${classFunction4(show.webChannel?.name)}`}>
                                    Web Chanel
                                    <a href={show.webChannel?.officialSite} target="_blank"
                                        className={`rating3 ${classFunction6(show.webChannel?.name)}`}>
                                        {" " + show.webChannel?.name}</a>
                                </td>
                            )}
                            <td className={`rating3 ${classFunction5(show.network?.name)}`}>

                                <a href={show?.officialSite} target="_blank"
                                    className={`rating3 ${classFunction5(show.network?.name)}`}>
                                    Official Site  </a>
                            </td>
                        </tr>
                        <tr>
                            <ResultsTvTime datum={show.updated} />
                            <td style={{ verticalAlign: "top" }}>
                                <p className="more"
                                    onClick={() => {
                                        clickImg(show.id);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}>
                                    MORE PICTURE
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {cast && (
                (cast.length == 1) ? (
                    <div className="sliderDiv">
                        <table  >
                            <tbody>
                                <tr >
                                    {cast[0].person?.image?.medium && (
                                        <td> <img className="imageActor"
                                            src={cast[0].person?.image?.medium} alt=""
                                            onClick={() => {
                                                clickPerson(cast[0].person.id);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }} />
                                        </td>
                                    )}
                                    {cast[0].character?.image?.medium && (
                                        <td >  <img
                                            src={cast[0].character?.image?.medium} alt=""
                                            className="imageCaracter" />
                                        </td>
                                    )}
                                </tr>
                                <tr>
                                    <td>   <p className="clickActor"
                                        onClick={() => {
                                            clickPerson(cast[0].person.id);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}>
                                        {cast[0].person?.name}
                                    </p>
                                    </td>
                                    <td> <p>{cast[0].character?.name}</p></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : ((cast.length == 0) ? (
                    <div className="sliderDiv" style={{ textAlign: "center", padding: "10px" }}>No cast data available</div>
                ) : (
                    <div className="sliderDiv">
                        <Slider {...settings}>
                            {cast.map((person) => (
                                <table key={person.character.id} >
                                    <tbody>
                                        <tr >
                                            {person.person?.image?.medium && (

                                                <td> <img className="imageActor"
                                                    src={person.person?.image?.medium} alt="no picture"
                                                    onClick={() => {
                                                        clickPerson(person.person.id);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }} />
                                                </td>
                                            )}
                                            {person.character?.image?.medium && (
                                                <td >  <img
                                                    src={person.character?.image?.medium} alt="no picture"
                                                    className="imageCaracter" />
                                                </td>
                                            )}
                                            <td className="vertical"></td>
                                        </tr>
                                        <tr>
                                            <td>   <p className="clickActor"
                                                onClick={() => {
                                                    clickPerson(person.person.id);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}>
                                                {person.person?.name}</p>
                                            </td>
                                            <td> <p>{person.character?.name}</p></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            )
                            )}
                        </Slider>
                    </div>
                )
                )
            )}

            <SezoneList sezone={sezons} />
            <BackToTop />
        </>
    )
};
export default DetailsTvShow;