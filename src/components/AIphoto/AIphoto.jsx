import { useEffect, useState } from 'react'

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { albumAtom, attracAtom, clickedActionAtom, educAtom, healedAtom, mentalAtom, socialAtom, unhealedTraumasAtom, wealthAtom } from '../../recoil/atoms/levelAtoms';
import { statusAtom } from '../../recoil/atoms/Atoms';

import { ageAtom } from '../../recoil/atoms/playerAtoms';
import { AImodeAtom } from '../../recoil/atoms/Atoms';

import switchCategoryLogo from '../../utils/switchCategoryLogo';
import { generateDalleImage } from "../../utils/generateDalleImage"
import { calcToBeCollected } from "../../utils/calcToBeCollected"


export const AIphoto = ({ player }) => {

    //STUB delete when fetching players from Firebase works
    const sex = "woman"


    const action = useRecoilValue(clickedActionAtom)
    const unhealedTraumas = useRecoilValue(unhealedTraumasAtom)
    const [age, setAge] = useRecoilState(ageAtom)
    const AImode = useRecoilState(AImodeAtom)

    const setHealed = useSetRecoilState(healedAtom)
    const setAlbum = useSetRecoilState(albumAtom)
    const setStatus = useSetRecoilState(statusAtom)

    const [AIphotoURL, setAIphotoURL] = useState(null)
    const [showHealing, setShowHealing] = useState(false)

    const [collected, setCollected] = useState({
        done: [],
        toBeCollected: 1,
    });

    const { done, toBeCollected } = collected;



    const setAtom = {
        attrac: useSetRecoilState(attracAtom),
        mental: useSetRecoilState(mentalAtom),
        educ: useSetRecoilState(educAtom),
        wealth: useSetRecoilState(wealthAtom),
        social: useSetRecoilState(socialAtom),
    }

    const aiBG = {
        backgroundImage: `url(${AIphotoURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }

    const loadingBG = {
        // backgroundImage: `url(https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif)`,
        backgroundImage: `url(https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif)`,
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }


    const handleKeyClick = (key) => {
        if (setAtom[key]) {
            setAtom[key]((oldValue) => {
                let newValue = oldValue + action.progress[key];
                if (newValue < 0) {
                    newValue = 0;
                } else if (newValue > 100) {
                    newValue = 100;
                }
                return newValue;
            })
            setCollected(prev => ({
                ...prev,
                done: [...prev.done, key],
                toBeCollected: prev.toBeCollected - 1,
            }));
        }
    };

    const handlePhotoClick = () => {
        setAlbum((prev) => [...prev, AIphotoURL])
        setCollected(prev => ({
            ...prev,
            done: [...prev.done, "📸"],
            toBeCollected: prev.toBeCollected - 1,
        }));
    }

    const handleHealingClick = () => {
        setHealed(true);
        setCollected(prev => ({
            ...prev,
            done: [...prev.done, "💖"],
            toBeCollected: prev.toBeCollected - 1,
        }));
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const imageData = await generateDalleImage(AImode, age, sex, action.text);
                setAIphotoURL(imageData);
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();

        if (unhealedTraumas.includes(action.category) && action.healing) {
            setShowHealing(true)
        }
        setCollected(prev => ({
            ...prev,
            toBeCollected: calcToBeCollected(action, unhealedTraumas),
        }));
    }, []);

    // useEffect(() => {
    //     generateDalleImage(AImode, player, action);

    //     if (unhealedTraumas.includes(action.category) && action.healing) {
    //         setHealed(true);
    //     };
    //     calcToBeCollected(action, unhealedTraumas);

    // }, [])

    useEffect(() => {
        if (toBeCollected === 0) {
            setAge(age + 10);
            setStatus("action");
        }
    }, [toBeCollected, setStatus]);



    return (
        <div
            style={AIphotoURL ? aiBG : loadingBG}
            className="container-photo"
        >
            <div className='note'>Note: Dall-e integration deactivated</div>
            <div className="container-rewards">
                {Object.entries(action.progress)
                    .filter(([key, value]) => value !== 0)
                    .map(([key, value]) => (

                        <div
                            key={key}
                            onClick={() => handleKeyClick(key)}
                            className={`btn-emoji ${done.includes(key) ? "hidden" : ""}`}
                        >
                            {switchCategoryLogo(key)}
                        </div>
                    ))}
                <div
                    className={`btn-emoji ${done.includes("📸") ? "hidden" : ""}`}
                    onClick={handlePhotoClick}
                >
                    📸
                </div>

                {showHealing && (
                    <div
                        className={`btn-emoji ${done.includes("💖") ? "hidden" : ""}`}
                        onClick={handleHealingClick}
                    >
                        💖
                    </div>)}
            </div>
        </div>
    );
}
