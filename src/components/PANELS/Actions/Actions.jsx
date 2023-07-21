import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import actionDataEN from "../../../assets/gameData/actionDataEN.json"
import actionDataDE from "../../../assets/gameData/actionDataDE.json"
import switchCategoryLogo from "../../../utils/switchCategoryLogo";

import { clickedActionAtom, unhealedTraumasAtom, willchainAtom } from "../../../recoil/atoms/levelAtoms";
import { languageAtom, statusAtom } from "../../../recoil/atoms/Atoms";

export function Actions({ setStep }) {

    const language = useRecoilValue(languageAtom)
    const [willchain, setWillchain] = useRecoilState(willchainAtom)
    const [clickedAction, setClickedAction] = useRecoilState(clickedActionAtom)
    const setStatus = useSetRecoilState(statusAtom)
    const unhealedTraumas = useRecoilValue(unhealedTraumasAtom)
    const [remainingActions, setRemainingActions] = useState([])
    const [actionsOnScreen, setActionsOnScreen] = useState([])

    const shuffleActionData = (language) => {
        let actionData = [];
        if (language === "en") {
            actionData = actionDataEN;
        } else if (language === "de") {
            actionData = actionDataDE;
        }
        const shuffled = actionData.sort(() => Math.random() - 0.5);
        setRemainingActions(shuffled);
        setActionsOnScreen(shuffled.slice(0, 4));
    }

    // const getActionsToScreen = () => {
    //     const nextActions = remainingActions.slice(0, 3);
    //     setRemainingActions(remainingActions.slice(3));
    //     setActionsOnScreen(nextActions);
    // }

    const handleActionButton = (action) => {
        setTimeout(() => {
            setStep((prev) => prev + 1)
            addToWillchain(action.category);
            setStatus("memory");
            setClickedAction(action);

            const nextActions = remainingActions.slice(0, 3);
            setRemainingActions(remainingActions.slice(3));
            setActionsOnScreen(nextActions);

            // addToHealing(action);
        }, 750);
    }

    const addToWillchain = (category) => {
        if (willchain.length < 3) {
            const emoji = switchCategoryLogo(category);
            setWillchain((prev) =>
                prev[prev.length - 1] === emoji
                    ? [...prev, emoji]
                    : [emoji]
            )
        }
    };

    useEffect(() => {
        const initData = () => {
            let actionData = [];
            if (language === "en") {
                actionData = actionDataEN;
            } else if (language === "de") {
                actionData = actionDataDE;
            }
            const shuffled = actionData.sort(() => Math.random() - 0.5);
            setRemainingActions(shuffled);
            setActionsOnScreen(shuffled.slice(0, 4));
        }
        initData();
    }, []);


    return (
        <div className="container-actions">
            {actionsOnScreen.map((action, index) =>
                <div className={`btn-action eightbit-btn ${unhealedTraumas.includes(action.category) && action.healing ? "healing" : ""}`}
                    key={index}
                    onClick={() => handleActionButton(action)}
                >
                    <h1>{switchCategoryLogo(action.category)}</h1>
                    <p>{action.text}</p>
                    <div className='center'>
                        {Object.entries(action.progress).filter(([key, value]) => value !== 0).map(([key, value]) => <div key={key}>
                            <span>{switchCategoryLogo(key)}</span>
                            <span className={`action-value ${value > 0 ? "positive" : "negative"} `}>
                                {value > 0 ? `+${value}` : <>&minus;{-value}</>}
                            </span>
                        </div>)}
                    </div>
                </div>)}
        </div>
    );
}
