import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import BackToTop from "../BackToTop";

const ShowImg = () => {

    const [error, setError] = useState(null);

    const [imageShow, setImageShow] = useState([]);

    const params = useParams()
    const images = params.images;

    useEffect(() => {
        getImg();
    }, [])

    const getImg = async () => {

        const urlImg = `https://api.tvmaze.com/shows/${images}/images`

        try {
            const response = await axios.get(urlImg);
            const data = response.data;
            setImageShow(data)
        } catch (err) {
            setError(err);
        }
    }

    return (
        <>
            <div
                className="showMain">
                {imageShow.map((image) => (
                    <div key={image.id}
                        className="bigImg">
                        <img src={image.resolutions.original.url} />
                    </div>
                ))}
            </div>
            <BackToTop />
        </>
    )
}
export default ShowImg;