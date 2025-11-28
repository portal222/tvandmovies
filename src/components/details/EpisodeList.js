import axios from "axios";
import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";

const EpisodeList = (props) => {

    const [error, setError] = useState(null);
    const [episode, setEpisode] = useState([]);

    useEffect(() => {
        getEpisode();
    }, []);

    const getEpisode = async () => {
        const url = `https://api.tvmaze.com/seasons/${props.sezonId}/episodes?embed=guestcast`

        try {
            const response = await axios.get(url);
            const data = response.data.reverse();
            setEpisode(data);

        } catch (err) {
            setError(err);
        }
    }

    return (
        <>
            {episode.map((epis) => (
                <div key={epis.id}>
                    <div className="sezoneList">
                        <div >
                            <div className="epName">{epis.name}</div>
                            <p className="epNumber">E{epis.number}</p>
                            <p className="airdate"> {epis.airdate}</p>
                        </div>
                        <div>
                            <img className="imgSezons"
                                src={epis.image?.original} />
                        </div>
                        <div className="summEpis" dangerouslySetInnerHTML={{ __html: epis.summary }}>
                        </div>
                    </div>
                    <TableRow embedded={epis?._embedded.guestcast} />
                </div>
            ))}
        </>
    )
}
export default EpisodeList;