import React from "react";

export function Album({
    album,
    photo,
    index
}) {
    return <div className="grid-container-album">
        <div>
            <h2>Album</h2>
            {album && album.map((photo, index) => <img src={photo} key={index} alt="album" />)}
        </div>
    </div>;
}
