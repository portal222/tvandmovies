import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SezoneList from "./SezoneList";
import BackToTop from "../BackToTop";
import Slider from "react-slick";


const TvShowClickDetails = (props) => {
    const [error, setError] = useState(null);
    const [cast, setCast] = useState([]);
    const [sezons, setSezons] = useState([]);

    const navigate = useNavigate();

    const showNumber = props.showId

    useEffect(() => {
        getShow(showNumber);

    }, [showNumber]);

    const getShow = async (showNumber) => {

        const url = `https://api.tvmaze.com/shows/${showNumber}?embed=cast`
        const urlSez = `https://api.tvmaze.com/shows/${showNumber}/seasons`

        try {
            const response = await axios.get(url);
            const responseSez = await axios.get(urlSez);


            const data = response.data;
            const dataSez = responseSez.data.reverse();

            setCast(data._embedded.cast);
            setSezons(dataSez)

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

    return (
        <>
            {cast && (
                (cast.length == 1) ? (
                    <div className="sliderDiv">
                        <table  >
                            <tbody>
                                <tr >
                                    {cast[0].person?.image?.medium && (
                                        <td> <img className="imageActor"
                                            src={cast[0].person?.image?.medium} alt="no picture"
                                            onClick={() => {
                                                clickPerson(cast[0].person.id);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }} />
                                        </td>
                                    )}
                                    {cast[0].character?.image?.medium && (
                                        <td >  <img
                                            src={cast[0].character?.image?.medium} alt="no picture"
                                            className="imageCaracter" />
                                        </td>
                                    )}
                                </tr>
                                <tr>
                                    <td>   <p className="clickActor"
                                        onClick={() => {
                                            clickPerson(cast[0].person.id);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}>{cast[0].person?.name}</p></td>
                                    <td> <p>{cast[0].character?.name}</p></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : ((cast.length == 0) ? (
                    <div className="sliderDiv" style={{ textAlign: "center" }}>No cast data available</div>
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
                                                {person.person?.name}
                                            </p>
                                            </td>
                                            <td> <p>{person.character?.name}</p></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))}
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
export default TvShowClickDetails;