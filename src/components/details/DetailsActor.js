import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import ActorCharacters from "./ActorCharacters";
import ActorCharacterShow from "./ActorCharacterShow";
import BackToTop from "../BackToTop";
import Loader from "../Loader"
import GuestCast from "./GuestCast";
import PaginationGuest from "./PaginationGuest";
import { Box, Pagination } from "@mui/material";

const DetailsActor = () => {
    const [error, setError] = useState(null);
    const [person, setPerson] = useState([]);
    const [cast, setCast] = useState([]);
    const [guestCast, setGuestCast] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [results, setResults] = useState();

    const params = useParams()
    const actorId = params.actorId;

    useEffect(() => {
        getPerson();
    }, []);

    const getPerson = async () => {

        const url = ` https://api.tvmaze.com/people/${actorId}?embed=castcredits`;
        const urlCrow = `https://api.tvmaze.com/people/${actorId}/crewcredits`
        const urlCast = `https://api.tvmaze.com/people/${actorId}/guestcastcredits?embed=episode`

        try {
            const response = await axios.get(url);
            const responseCrow = await axios.get(urlCrow);
            const responseCast = await axios.get(urlCast);

            const data = response.data;
            const dataCrow = responseCrow.data;
            const dataCast = responseCast.data;

            setPerson(data);
            setCast(data._embedded.castcredits)
            setGuestCast(dataCast);
            setIsLoading(false);
            setResults(data.length);

        } catch (err) {
            setError(err);
        }
    };

    const pageSize = 8;
    const paginatedPosts = PaginationGuest(guestCast, pageSize);
    const currentPosts = paginatedPosts[currentPage - 1];


    if (isLoading) {
        return <Loader />
    }
    if (results == 0) {
        return (
            <div className="showMain">
                <br></br>

                <h3>Nothing found</h3>
            </div>
        )
    }

    return (
        <>
            <div className="details">
                <div className="holdImg">
                    <img className="imgShow"
                        src={person.image?.original} />
                </div>
                <table >
                    <tbody>
                        <tr>
                            <td colSpan={2}
                                className="showName">
                                {person.name}
                            </td>
                        </tr>
                        <tr>
                            <td className="language">
                                {person.country?.name}
                            </td>
                            <td >
                                {person.gender}
                            </td>
                        </tr>
                        <tr>
                            <td className="language">{person.birthday}</td>
                            <td className="language">{person.deathday}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <a href={person.url} target="_blank">
                                    TvMaze</a>
                            </td>
                        </tr>
                        <tr className="showCast">
                            <td>Show name</td>
                            <td>Cast</td>
                        </tr>
                        {cast.map((dataCast, id) => (
                            <tr key={id}>
                                <td className="borderBotom">
                                    <ActorCharacterShow show={dataCast._links.show.href} />
                                </td>
                                <td className="borderBotom">
                                    <ActorCharacters character={dataCast._links.character.href} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <p className="guestCast">Guest Cast</p>
            </div>

            <Box>
                {paginatedPosts.length > 1 && (
                    <Box mt={2} display="flex" justifyContent="center" className="guestCast">
                        <Pagination
                            color="primary"
                            count={paginatedPosts.length}
                            page={currentPage}
                            siblingCount={0}
                            onChange={(_, newPage) =>
                                setCurrentPage(newPage)
                            }
                        />
                    </Box>
                )}
                <div >
                    {currentPosts &&
                        currentPosts.map((guestCast, id) => (
                            <GuestCast key={id} guestCast={guestCast} />
                        ))}
                </div>
                {paginatedPosts.length > 1 && (
                    <Box mt={2} display="flex" justifyContent="center" className="guestCast">
                        <Pagination
                            color="primary"
                            count={paginatedPosts.length}
                            page={currentPage}
                            siblingCount={0}
                            onChange={(_, newPage) =>
                                setCurrentPage(newPage)
                            }
                        />
                    </Box>
                )}
            </Box>
            <BackToTop />
        </>
    )
};
export default DetailsActor;