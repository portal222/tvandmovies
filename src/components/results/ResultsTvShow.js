import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";
import ResultsTvTime from "./ResultsTvTime";
import { useNavigate } from "react-router-dom";
import BackToTop from "../BackToTop";

const ResultsTvShow = () => {
    const [error, setError] = useState(null);
    const [tvShow, setTvShow] = useState([]);
    const [tvActor, setTvActor] = useState([]);
    const [results, setResults] = useState([]);
    const [resAct, setResAct] = useState([]);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const globalCtx = useContext(GlobalContext);
    const searchStringValue = globalCtx.searchStringValue;

    useEffect(() => {
        getTvShow(searchStringValue);
    }, [searchStringValue]);
    console.log("iz results tvShow", searchStringValue)

    const getTvShow = async (searchStringValue) => {
        const url = `https://api.tvmaze.com/search/shows?q=${searchStringValue}`;
        const urlAct = `https://api.tvmaze.com/search/people?q=${searchStringValue}`;


        try {
            const response = await axios.get(url);
            const responseAct = await axios.get(urlAct);

            const data = response.data;
            const dataAct = responseAct.data;

            console.log("rezultat serija tvShow", data);
            console.log("rezultat glumaca tvShow", dataAct);

            setTvShow(data);
            setTvActor(dataAct);
            setResults(data.length);
            setResAct(dataAct.length);
        } catch (err) {
            setError(err);
        }
    };

    const clickShow = (showId) => {
        const LinkTo = `/showDetails/${showId}`;
        navigate(LinkTo);
    }

    const clickActor = (actorId) => {
        const LinkTo = `/actorDetails/${actorId}`;
        navigate(LinkTo);
    }


    if (results == 0 && resAct == 0) {
        return (
            <>
               <div className="gridTv" style={{ paddingTop: "60px", paddingLeft: "25px" }}>
                <p className="time">{searchStringValue} Not found</p>
            </div>
                <div className="place"></div>
            </>
        )
    }
    return (
        <>
            <table className="showMain">
                {tvShow.map((dataObj) => (
                    <tbody key={dataObj.show.id}>
                        <tr>
                            <td rowSpan={7} className="holdImg">
                                <img className="imgShow"
                                    src={dataObj.show.image?.original}
                                    onClick={() => clickShow(dataObj.show.id)} />
                            </td>
                            <td className="clickShow"
                                onClick={() => clickShow(dataObj.show.id)}>
                                {dataObj.show.name}
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <ul className="genres">
                                    {dataObj.show.genres.map((genre, id) => (
                                        <li key={id}>{genre}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="language">{dataObj.show.language}</td>
                        </tr>
                        <tr>
                            <td>Premiered:{" " + dataObj.show.premiered}</td>
                        </tr>
                        <tr>
                            {dataObj.show.summary && (
                                <td className="summaryRes" dangerouslySetInnerHTML={{ __html: dataObj.show.summary }}>
                                </td>
                            )}
                        </tr>
                        <tr>
                            <ResultsTvTime datum={dataObj.show.updated} />
                        </tr>
                        <tr>
                            <td>
                                <a href={dataObj.show.url} target="_blank">TvMaze</a>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}><hr></hr></td>
                        </tr>
                    </tbody>
                ))}
            </table >
            <table className="showMain">
                {tvActor.map((dataObj) => (
                    <tbody key={dataObj.person.id}>
                        <tr>
                            <td rowSpan={5} className="holdImg">
                                <img className="imgActor"
                                    src={dataObj.person.image?.original} />
                            </td>
                            <td colSpan={2}
                                className="showNameActor"
                                onClick={() => clickActor(dataObj.person.id)}>
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
export default ResultsTvShow;