import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import BackToTop from "../BackToTop";
import Loader from "../Loader";

const FreeMoviesImg = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [photo, setPhoto] = useState([]);
    const [status, setStatus] = useState([]);

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

            setIsLoading(false);
            setPhoto(dataImg);
            setStatus(response.status);

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
    } else if (photo.length == 0) {
        return (
            <div className="showMain">
                <div className="bigImg">
                    <p>
                        picture not found
                    </p>
                </div>
            </div>
        )
    } else if (status == 500) {
        return (
            <div className="showMain">
                <div className="bigImg">
                    <p>
                        picture not found
                    </p>
                </div>
            </div>
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