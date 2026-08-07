import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import GlobalContext from "../GlobalContext";
import ResultsTvTime from "./ResultsTvTime";
import { useNavigate } from "react-router-dom";
import BackToTop from "../BackToTop";
import SearchTvShow from "../search/SearchTvShow";
import SearchActors from "../search/SearchActors";
import { useParams } from "react-router-dom";


const ResultsTasteShow = () => {
    const [error, setError] = useState(null);
    const [tvShow, setTvShow] = useState([]);
    const [tvActor, setTvActor] = useState([]);
    const [results, setResults] = useState([]);

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const params = useParams();
    const showTitle = params.showName;

    useEffect(() => {
        getTvShow(showTitle);
    }, [showTitle]);

    const getTvShow = async (showTitle) => {
        const url = `https://api.tvmaze.com/search/shows?q=${showTitle}`;


        try {
            const response = await axios.get(url);

            const data = response.data;

            setTvShow(data);


            setResults(data.length);


        } catch (err) {
            setError(err);
        }
    };

    const clickShow = (showId) => {
        const LinkTo = `/showDetails/${showId}`;
        navigate(LinkTo);
    }



    if (results == 0) {
        return (
            <>
                <div className="gridTv" style={{ paddingTop: "60px", paddingLeft: "25px" }}>
                    <p className="time">{showTitle} Not found</p>
                </div>
                <div className="place">
                    <div className="placeBut">
                        <SearchTvShow placeholder={'Tv Show & Actor'} linkTo={'/tvShow'} />
                        <SearchActors placeholder={'Movies'} linkTo={'/movies'} />
                    </div>
                </div>
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
                                    onClick={() => {
                                        clickShow(dataObj.show.id);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                />
                            </td>
                            <td className="clickShow"
                                onClick={() => {
                                    clickShow(dataObj.show.id);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}>
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

            <BackToTop />
        </>
    );
};
export default ResultsTasteShow;