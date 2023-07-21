import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import { AImodeAtom, languageAtom, statusAtom } from '../recoil/atoms/Atoms';
import { Typewriter } from 'react-simple-typewriter';
import texts from "../assets/gameData/texts.json";

import { examplePlayer } from "../assets/gameData/examplePlayer";
import { PlayerInfo } from "../components/PANELS/Progress/PlayerInfo";
import { Progress } from "../components/PANELS/Progress/Progress";
import { Actions } from "../components/PANELS/Actions/Actions";
import { UnhealedTraumas } from "../components/PANELS/Progress/UnhealedTraumas";
import { AIphoto } from "../components/AIphoto/AIphoto";
import { attracAtom, clickedActionAtom, educAtom, mentalAtom, socialAtom, unhealedTraumasAtom, wealthAtom } from "../recoil/atoms/levelAtoms";

export default function Intro() {

  const language = useRecoilValue(languageAtom)
  const status = useRecoilValue(statusAtom)
  const clickedAction = useRecoilValue(clickedActionAtom)
  const unhealedTraumas = useRecoilValue(unhealedTraumasAtom)

  const [activePlayer, setActivePlayer] = useState(examplePlayer)

  const [showPlayer, setShowPlayer] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const [showWill, setShowWill] = useState(false)


  //typewriter settings
  const typeSpeed = 25;
  const cursor = true;

  function TypewriterHighlight({ text }) {
    return (<span style={{
      fontWeight: "bolder",
      fontSize: "x-large",
    }}>
      <Typewriter key={step} typeSpeed={60} words={[text]} cursor={cursor} />
    </span>);
  }

  const STEPS = [
    { text: "anim0", highlight: false, nextBTN: true },
    { text: "anim1", highlight: true, nextBTN: true },
    { text: "anim2", highlight: true, nextBTN: true },
    { text: "anim3", highlight: false, nextBTN: true },
    { text: "anim4", highlight: false, nextBTN: true },
    { text: "anim5", highlight: true, nextBTN: true },
    { text: "anim6", highlight: false, nextBTN: true },
    { text: "anim7", highlight: false, nextBTN: true },
    { text: "anim8", highlight: false, nextBTN: true },
    { text: "anim9", highlight: true, nextBTN: false },
    { text: "anim10", highlight: false, nextBTN: true },
    { text: "anim11", highlight: true, nextBTN: false },
    { text: "anim12", highlight: false, nextBTN: true },
    { text: "anim13", highlight: false, nextBTN: true },
  ]

  //extracting steps with props from steps array
  const [step, setStep] = useState(0);
  const { text: textKey, highlight, nextBTN } = STEPS[step];
  const text = texts.intro[textKey][language];

  const [attrac, setAttrac] = useRecoilState(attracAtom)
  const [mental, setMental] = useRecoilState(mentalAtom)
  const [educ, setEduc] = useRecoilState(educAtom)
  const [wealth, setWealth] = useRecoilState(wealthAtom)
  const [social, setSocial] = useRecoilState(socialAtom)
  const [AImode, setAImode] = useRecoilState(AImodeAtom)

  console.log(AImode);
  const getNextStep = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } if (step === 5) {
      setShowPlayer(true);
    } if (step === 6) {
      setShowProgress(true);
    } if (step === 7) {
      setShowActions(true);
    }
  }

  useEffect(() => {
    setAttrac(activePlayer.progress.attrac)
    setMental(activePlayer.progress.mental)
    setEduc(activePlayer.progress.educ)
    setWealth(activePlayer.progress.wealth)
    setSocial(activePlayer.progress.social)
  }, [])


  return (
    <>

      {/* TODO extract into dev header */}

      <div className="dev">
        <h3>Dev Tools:</h3>
        <div>
          <p>Step {step}</p>
          <button onClick={() => setStep(step - 1)}>prev</button>
          <button onClick={() => setStep(step + 1)}>next</button>
        </div>
        <div>
          <p>AI Mode set to {AImode ? "ON" : "OFF"}</p>
          <button onClick={() => setAImode(!AImode)}>toggle</button>
        </div>
      </div>

      {/* end of dev header */}

      <div className="dashboard-bg">
        <div className="dashboard-container">

          <div className="grid-container-header">

            <div className="introbox-avatar">
              <h1>👾</h1>
            </div>

            {
              step === 3
                ? <div className="introbox-text-gif">
                  <img src="/images/white_diamond.gif" alt="Avatar" />
                </div>
                : <div className="introbox-text">
                  {
                    highlight
                      ? <TypewriterHighlight text={text} />
                      : <Typewriter key={step} typeSpeed={typeSpeed} words={[text]} cursor={cursor} />
                  }
                </div>
            }
            {nextBTN && <button className="btn-story" onClick={getNextStep}>{texts.story.button[language]}</button>}

          </div>

          <div className="grid-container-main">

            {showActions && status === "action" && (
              <Actions setStep={setStep} />
            )}

            {showActions && status === "memory" && (
              <AIphoto
                action={clickedAction}
                player={activePlayer}
                traumas={unhealedTraumas}
              />
            )}


            <div className="container">
              {showPlayer &&
                <PlayerInfo activePlayer={examplePlayer} />
              }
              {showProgress &&
                <Progress />
              }



            </div>
          </div>

        </div>
      </div>
    </>
  );
}

