import React, { useState, useEffect } from "react";
import axios from 'axios';
import ResultsTvTime from "./ResultsTvTime";
import { useNavigate } from "react-router-dom";
import BackToTop from "../BackToTop";

const ResultsTvActorsNew = (props) => {
    const [error, setError] = useState(null);
    const [tvShow, setTvShow] = useState([]);
    const [results, setResults] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getTvShow();
    }, []);


    const getTvShow = async () => {
        const url = `https://api.tvmaze.com/search/people?q=${props.celebs}`;

        try {
            const response = await axios.get(url);

            const data = response.data;

            setTvShow(data);
            setResults(data.length);


        } catch (err) {
            setError(err);
        }
    };

    const clickActor = (actorId) => {
        const LinkTo = `/actorDetails/${actorId}`;
        navigate(LinkTo);
    }

    return (
        <>
            <table className="showMain">
                {tvShow.map((dataObj) => (
                    <tbody key={dataObj.person.id}>
                        <tr>
                            <td rowSpan={5} className="holdImg">
                                <img className="imgShow"
                                    src={dataObj.person.image?.original} />
                            </td>
                            <td colSpan={2}
                                className="showNameActor"
                                onClick={() => {
                                    clickActor(dataObj.person.id);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>
                                {dataObj.person?.name}
                            </td>
                        </tr>
                        <tr>
                            <td className="language">
                                {dataObj.person.country?.name}
                            </td>
                            <td >
                                {dataObj.person.gender}
                            </td>
                        </tr>
                        <tr>
                            <td className="language">{dataObj.person.birthday}</td>
                            <td className="language">{dataObj.person.deathday}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>

                                <a href={dataObj.person.url} target="_blank">
                                    TvMaze</a>
                            </td>
                        </tr>
                        <tr>
                            <ResultsTvTime datum={dataObj.person.updated} />
                        </tr>
                        <tr>
                            <td colSpan={3}><hr></hr></td>
                        </tr>
                    </tbody>
                ))}
            </table >
            <BackToTop />
        </>
    );
};
export default ResultsTvActorsNew;