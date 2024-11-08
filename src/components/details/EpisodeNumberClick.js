import React, { useState, useEffect } from "react";
import axios from "axios";

const EpisodeNumberClick = (props) => {

    const [error, setError] = useState(null);
    const [sezons, setSezons] = useState([]);

    const showNumber = props.showId

    useEffect(() => {
        getShow(showNumber);
    }, [showNumber]);

    const getShow = async (showNumber) => {

        const urlSez = `https://api.tvmaze.com/shows/${showNumber}/seasons`
        try {
            const responseSez = await axios.get(urlSez);
            const dataSez = responseSez.data.reverse();
            setSezons(dataSez)


        } catch (err) {
            setError(err);
        }
    };

    const classFunction = (episodeOrder) => {
        if (episodeOrder == null) {
            return 'average';
        }
    }


    return (
        <><tr>
            <td colSpan={2}>
                <div className="sezone">
                    {sezons.map((sezone) => (
                        <div key={sezone.id}>
                            <p>{"Sezone: " + sezone.number + " "}</p>
                            <p className={`rating ${classFunction(sezone.episodeOrder)}`}>
                                {" Episode: " + sezone.episodeOrder}
                            </p>
                        </div>


                    ))}
                </div>
            </td>
        </tr>




        </>
    )

}
export default EpisodeNumberClick;