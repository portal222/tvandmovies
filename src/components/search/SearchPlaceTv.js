import React from "react";
import SearchTvShow from "./SearchTvShow.js";
import SearchActors from "./SearchActors.js";

const SearchPlaceTv = () => {

    return (

        <div className="place">
            <div className="placeBut">
                <SearchTvShow placeholder={'Tv Show & Actor'} linkTo={'/tvShow'} />
                <SearchActors placeholder={'Movies & Series'} linkTo={'/movies'} />
            </div>
        </div>
    )
}
export default SearchPlaceTv;