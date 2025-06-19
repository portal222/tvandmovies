import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DetailsEpisode = (props) => {

    const [error, setError] = useState(null);
    const [episode, setEpisode] = useState([]);
    const [number, setNumber] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getEpisode();
    }, [])

    const getEpisode = async () => {

        const url = `https://api.tvmaze.com/episodes/${props.episodeId}?embed=show`;

        try {
            const response = await axios.get(url);
            const data = response.data;

            setEpisode(data._embedded.show);
            setNumber(data);
        } catch (err) {
            setError(err);
        }
    };

    const clickShow = (showId) => {
        const LinkTo = `/showDetails/${showId}`;
        navigate(LinkTo);
    }

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td className="clickShow"
                            onClick={() => {
                                clickShow(episode.id);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>
                            {episode.name}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
export default DetailsEpisode;