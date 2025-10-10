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
            console.log("detalji freemovies", data)

        } catch (err) {
            setError(err);
        }
    };

    return (
        <>
            <div className="character-grid">
                {movies.main?.castV2?.[0].credits.map((char, idx) => {
                    const imgUrl = char?.name?.primaryImage?.url;
                    return (
                        <div key={idx} className="character-item">
                            <img
                                src={imgUrl || fallback}
                                alt={"no picture" || "unknown"}
                                className="avatar-img"
                                onClick={() => imgUrl && handleImageClick(imgUrl)}
                                onError={(e) => {
                                    if (!e.target.src.includes(fallback)) {
                                        e.target.src = fallback;
                                    }
                                }}
                            />
                            <div>
                                <MovieActor actor={char.name.nameText?.text} />
                                {char.creditedRoles.edges?.[0]?.node.characters.edges?.[0]?.node.name && (
                                    <p> as {char.creditedRoles.edges?.[0]?.node.characters.edges?.[0]?.node.name}</p>
                                )}
                                {char.creditedRoles.edges?.[0]?.node.characters.edges?.[1]?.node.name && (
                                    <p> aka {char.creditedRoles.edges?.[0]?.node.characters.edges?.[1]?.node.name}</p>
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




