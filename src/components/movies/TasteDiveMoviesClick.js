import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackToTop from "../BackToTop";

import Loader from "../Loader";


const TasteDiveMoviesClick
    = () => {


        const [error, setError] = useState(null);

        const [isLoading, setIsLoading] = useState(true);

        const [moviTaste, setMoviTaste] = useState([]);

        const navigate = useNavigate();

        const params = useParams();
        const movTitle = params.movName;





        useEffect(() => {
            getTaste();

        }, [movTitle])

        const getTaste = async () => {

            setIsLoading(true);

            const url = `https://ridlejoke-proxy.kvaka32.workers.dev/tastedive?q=${movTitle}`;


            try {
                const response = await axios.get(url);
                console.log("taste dive odgovor", response);
                setMoviTaste(response.data.similar.results)

            } catch (err) {

                setError(err.message);
            }
        }


        const clickShow = (movName) => {
            const LinkTo = `/testdive/${movName}`;
            navigate(LinkTo);
        }


        return (
            <>

                <div className="detailMain" style={{ paddingTop: "80px" }}>
                    <div style={{ textAlign: "left", fontSize: "24px" }}>

                        Similar movies
                    </div>
                </div>
                <div className="movieMainTaste">
                    {moviTaste.map((mov, id) => (
                        <div key={id}
                            className="holderTaste">
                            <p
                                onClick={() => {
                                    clickShow(mov.name);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >

                                {mov.name}</p>
                            <iframe
                                src={`https://www.youtube.com/embed/${mov.yID}`}
                                width="100%"
                                height="250px"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen

                            ></iframe>

                            <div className="desTaste">

                                {mov.description}


                            </div>

                        </div>
                    ))}
                </div>

                <BackToTop />
            </>
        )
    }
export default TasteDiveMoviesClick
    ;