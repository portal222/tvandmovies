import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import BackToTop from "../BackToTop";
import Loader from "../Loader";

const FreeMoviesImg = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [photo, setPhoto] = useState([]);

    const params = useParams()
    const images = params.images;

    useEffect(() => {
        getImg();
    }, [])

    const getImg = async () => {

        const urlImg = `https://imdb.iamidiotareyoutoo.com/search?tt=${images}`

        try {
            const response = await axios.get(urlImg);
            const dataImg = response.data.main.titleMainImages.edges

            setPhoto(dataImg);

            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    }

    if (isLoading) {
        return (
            <>
                <Loader />
            </>
        )
    }

    return (
        <>
            <div className="showMain">
                {photo.map((image, id) => (
                    <div key={id} className="bigImg">
                        {image.node.url && (
                            <img src={image.node.url} alt="" />
                        )}
                        {image.node.caption.plainText && (
                            <p>
                                {image.node.caption.plainText}
                            </p>
                        )}
                    </div>
                ))}
            </div>
            <BackToTop />
        </>
    )
}
export default FreeMoviesImg;