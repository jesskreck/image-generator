import React from "react";
import switchCategoryLogo from "../../../utils/switchCategoryLogo";
import { useRecoilValue } from "recoil";
import { unhealedTraumasAtom } from "../../../recoil/atoms/levelAtoms";


export function UnhealedTraumas() {

    const traumas = useRecoilValue(unhealedTraumasAtom)

    return (
        <div className="container-traumas">
            <h3>Unhealed Traumas</h3>
            <div className="container-traumas-emojis">
                {traumas.map((trauma, index) => (
                    <div key={index}>
                        {switchCategoryLogo(trauma)}
                    </div>
                ))}



                {/* {healingOnScreen.map((trauma, index) => (
                    <div className={`${healingOnScreen ? "healing" : ""}`} key={index}>
                        {switchCategoryLogo(trauma)}
                    </div>
                ))} */}
            </div>
        </div>
    );
}
