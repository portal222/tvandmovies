import React from "react";
import EpisodeList from "./EpisodeList";

const SezoneList = (props) => {

    return (
        <>
            {props.sezone.map((sezon) => (
                <div key={sezon.id}>
                    <div className="sezoneList">
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="sezonNum">S{sezon.number}</td>
                                        <td className="sezonDate">
                                            {sezon.premiereDate + " to " + sezon.endDate}</td>
                                        <td>{sezon.episodeOrder} ep.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <img className="imgSezons"
                                src={sezon.image?.original} />
                        </div>
                        <div className="summEpis" dangerouslySetInnerHTML={{ __html: sezon.summary }}>
                        </div>
                    </div>
                    <div className="hrGenre"></div>
                    <EpisodeList sezonId={sezon.id} />
                </div>
            ))}
        </>
    )
}
export default SezoneList;