import React from "react";

const EpisodeNumber = (props) => {

    const classFunction = (episodeOrder) => {
        if (episodeOrder == null) {
            return 'average';
        }
    }

    return (
        <>
            <tr>
                <td colSpan={2}>
                    <div className="sezone">
                        {props.sezones.map((sezone) => (
                            <div key={sezone.id}>
                                <p>{"Sezone: " + sezone.number + " "}</p>
                                <p className={`rating ${classFunction(sezone.episodeOrder)}`}>
                                    {" Episode: " + sezone.episodeOrder}
                                </p>
                            </div>
                        ))}
                    </div>
                </td>
            </tr>
        </>
    )
}
export default EpisodeNumber;