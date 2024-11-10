import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";


const GuestCaracter = (props) => {

    const navigate = useNavigate();

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
            {props.embedded && (
                (props.embedded.length == 1) ? (
                    <div className="sliderDiv">
                        <table  >
                            <tbody>
                                <tr >
                                    {props.embedded[0].person?.image?.medium && (
                                        <td> <img className="imageActor"
                                            src={props.embedded[0].person?.image?.medium} alt="no picture"
                                            onClick={() => clickPerson(props.embedded[0].person.id)} />
                                        </td>
                                    )}
                                    {props.embedded[0].character?.image?.medium && (
                                        <td >  <img
                                            src={props.embedded[0].character?.image?.medium} alt="no picture"
                                            className="imageCaracter" />
                                        </td>
                                    )}
                                </tr>
                                <tr>
                                    <td>   <p className="clickActor"
                                        onClick={() => clickPerson(props.embedded[0].person.id)}>{props.embedded[0].person?.name}</p></td>
                                    <td> <p>{props.embedded[0].character?.name}</p></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : ((props.embedded.length == 0) ? (
                    <div className="sliderDiv" style={{ textAlign: "center", padding: "10px" }}>No guest character data available</div>
                ) : (
                    <div className="sliderDiv">
                        <Slider {...settings}>
                            {props.embedded.map((person) => (
                                <table key={person.character.id} >
                                    <tbody>
                                        <tr >
                                            {person.person?.image?.medium && (
                                                <td> <img className="imageActor"
                                                    src={person.person?.image?.medium} alt="no picture"
                                                    onClick={() => clickPerson(person.person.id)} />
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
                                                onClick={() => clickPerson(person.person.id)}>{person.person?.name}</p></td>
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
        </>
    )
}
export default GuestCaracter;