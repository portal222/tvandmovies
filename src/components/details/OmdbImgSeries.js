import React, { useEffect, useState } from "react";
import axios from "axios";

const OmdbImgSeries = (props) => {

    const [series, setSeries] = useState([]);
    const [error, setError] = useState(null);

    const imdbId = props.number
  
    useEffect(() => {
        getDetails();

    }, [imdbId]);

    const getDetails = async () => {

        const url = `https://www.omdbapi.com/?i=${imdbId}&apikey=f91358c4`;

        try {
            const response = await axios.get(url);
            const data = response.data
            setSeries(data)
        } catch (err) {
            setError(err);
        }
    };

    return (
        <>   
                <img src={series.Poster} alt=" "  className="imgOmdb" />
        </>
    )
}
export default OmdbImgSeries;