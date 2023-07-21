import React from "react";
import { useRecoilValue } from "recoil";
import { ageAtom, reincarnationAtom } from "../../../recoil/atoms/playerAtoms";

export function PlayerInfo({ activePlayer }) {

    const age = useRecoilValue(ageAtom)
    const reincarnation = useRecoilValue(reincarnationAtom)


    return (
        <div className="container-playerinfo">
            <img src="images/garnet.gif" alt="" />
            <h2>{activePlayer.name}</h2>
            <div className='existence'>
                <h3>Existence</h3>
                <div className='counter'><p>#{reincarnation}</p>
                </div>
            </div>
            <div className='age'>
                <h3>Age</h3>
                <div className="counter"><p>{age}</p></div>
            </div>
        </div>
    );
}
