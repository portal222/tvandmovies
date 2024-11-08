import React, { useState, useEffect } from "react";
import axios from 'axios';

const ActorCharacter = (props) => {
    const [error, setError] = useState(null);
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        getSerije();
    }, []);

    const getSerije = async () => {

        const urlCast = `${props.character}`

        try {

            const responseCast = await axios.get(urlCast);

            const dataCast = responseCast.data;

            setPersons(dataCast);
        } catch (err) {
            setError(err);
        }
    };
    return (
        <>
            <div>
                <img src={persons.image?.medium} />
                <p>
                    {persons.name}</p>
            </div>
        </>
    );
};
export default ActorCharacter;