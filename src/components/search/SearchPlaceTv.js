import React from "react";
import SearchTvShow from "./SearchTvShow.js";
import SearchActors from "./SearchActors.js";

const SearchPlaceTv = () => {

    return (

        <div className="place">
            <div className="placeBut">
                <div>
                    <div className="text">
                        Search TvMaze baze, <br></br> for actors and TV show.
                    </div>
                    <SearchTvShow placeholder={'Tv Show & Actor'} linkTo={'/tvShow'} />
                </div>
                <div>
                    <div className="text"> Search for movies and series. <br></br>
                        You can download series via torrent</div>
                    <SearchActors placeholder={'Movies & Series'} linkTo={'/movies'} />
                </div>
            </div>
        </div>
    )
}
export default SearchPlaceTv;