import React from "react";
import DetailsEpisode from "./DetailsEpisode";
import { useNavigate } from "react-router-dom";

const GuestCast = (props) => {

    const navigate = useNavigate();

    const clickShow = (showId) => {
        const LinkTo = `/showClick/${showId}`;
        navigate(LinkTo);
    }

    return (
        <>

            <div className="sezoneList">
                <div >
                    <div >
                        <div className="epTitle"
                            onClick={() => clickShow(props.guestCast._embedded.episode._links.show.name)}>
                            {props.guestCast._embedded.episode._links.show.name}
                        </div>
                        <div className="epNumber">
                            {"S" + props.guestCast._embedded.episode.season + " E" + props.guestCast._embedded.episode.number}
                        </div>
                    </div>
                    <div>
                        <p className="epNumber">{props.guestCast._embedded.episode.name}</p>
                        <p className="airdate">{props.guestCast._embedded.episode.airdate}</p>
                    </div>
                </div>
                <div>
                    <p> <img src={props.guestCast._embedded.episode.image?.medium} className="imgSezons" /> </p>
                </div>
                <div >
                    <p className="summEpis" dangerouslySetInnerHTML={{ __html: props.guestCast._embedded.episode.summary }}></p>
                </div>
            </div>
            <div className="hrGenre"></div>
        </>
    )
}
export default GuestCast;