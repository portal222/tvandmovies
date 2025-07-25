import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieActor from "./MovieActor";
import fallback from "../../../public/assets/img/fallback.png"

const FreeMovies = (props) => {

    const [movies, setMovies] = useState([]);
    const [photo, setPhoto] = useState([]);
    const [error, setError] = useState(null);
    const [style, setStyle] = useState("largeImg");
    const [activeImage, setActiveImage] = useState(null);

    const handleImageClick = (url) => {
        setActiveImage(url);
    };

    useEffect(() => {
        getMovie();
    }, []);

    const getMovie = async () => {
        const url = `https://imdb.iamidiotareyoutoo.com/search?tt=${props.imdbId}`
    

        try {
            const response = await axios.get(url);
            const data = response.data
            const dataImg = response.data.main.titleMainImages.edges

            setMovies(data);

        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
            <div className="character-grid">
                {movies.main?.cast.edges.map((char, idx) => {
                    const imgUrl = char?.node?.name?.primaryImage?.url;
                    return (
                        <div key={idx} className="character-item">
                            <img
                                src={imgUrl || fallback}
                                alt={char?.node?.name?.nameText?.text || "unknown"}
                                className="avatar-img"
                                onClick={() => imgUrl && handleImageClick(imgUrl)}
                                onError={(e) => {
                                    if (!e.target.src.includes(fallback)) {
                                        e.target.src = fallback;
                                    }
                                }}
                            />
                            <div>
                            <MovieActor actor={char.node?.name.nameText?.text} />
                                {char.node.characters?.[0]?.name && (
                                    <p> as {char.node.characters?.[0]?.name}</p>
                                )}
                                {char.node.characters?.[1]?.name && (
                                    <p> aka {char.node.characters?.[1]?.name}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {activeImage && (
                <div className="lightbox" onClick={() => setActiveImage(null)}>
                    <img src={activeImage} alt="" className="lightbox-img" />
                </div>
            )}

        </>
    )
}
export default FreeMovies;




