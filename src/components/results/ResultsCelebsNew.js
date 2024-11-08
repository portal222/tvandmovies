import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import BackToTop from "../BackToTop";
import ResultsTvActorsNew from "./ResultsTvActorsNew";
import Loader from "../Loader";


const ResultsCelebsNew = () => {
    const [error, setError] = useState(null);
    const [tvShow, setTvShow] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const navigate = useNavigate();

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getTvShow(searchStringValue);
    }, [searchStringValue]);
    console.log("iz results tvShow", searchStringValue)

    const getTvShow = async (searchStringValue) => {
        const url = `https://api.tvmaze.com/search/people?q=${searchStringValue}`;

        try {
            const response = await axios.get(url)
           
            const data = response.data;

            console.log("rezultat Celebs New actors", data)

            setTvShow(data);
            setResults(data.length);
            setIsLoading(false);

        } catch (err) {
            setError(err);
        }
    };
    if (isLoading) {
        return (

            <Loader />)
    }

    return (
        <>
            <div >
                {tvShow.map((dataObj) => (
                    <div key={dataObj.name}>
                        <ResultsTvActorsNew celebs={dataObj.name} />
                    </div>
                ))}
            </div >
            <BackToTop />
        </>
    );
};
export default ResultsCelebsNew;