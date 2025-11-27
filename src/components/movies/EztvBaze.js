import React, { useEffect, useState } from "react";
import axios from "axios";

const EztvBaze = (props) => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    const showId = props.numId

    console.log("broj koji dolazi u eztvBaze", showId)

    useEffect(() => {
        getDetails();
    }, [showId]);

    const getDetails = async () => {

        const url = ` https://eztvx.to/api/get-torrents?imdb_id=${showId}`;



        try {
            const response = await axios.get(url);
            const data = response.data
            setMovies(data.torrents);


            console.log("eztv podaci", response);

        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
            {movies?.[0]?.torrent_url && (
                <button className="torrButt">
                    <a href={movies?.[0]?.torrent_url} target="_blank">Download Torrent</a>
                </button>
            )}
        </>
    )

}
export default EztvBaze;