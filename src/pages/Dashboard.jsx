import { useState, useEffect, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { statusAtom } from '../recoil/atoms/Atoms'
import { clickedActionAtom } from '../recoil/atoms/levelAtoms'
import { attracAtom } from '../recoil/atoms/levelAtoms'
import { mentalAtom } from '../recoil/atoms/levelAtoms'
import { educAtom } from '../recoil/atoms/levelAtoms'
import { wealthAtom } from '../recoil/atoms/levelAtoms'
import { socialAtom } from '../recoil/atoms/levelAtoms'
import { unhealedTraumasAtom } from '../recoil/atoms/levelAtoms'
import { willchainAtom } from '../recoil/atoms/levelAtoms'
import { healedAtom } from '../recoil/atoms/levelAtoms'
import { albumAtom } from '../recoil/atoms/levelAtoms'
import { ageAtom } from '../recoil/atoms/playerAtoms'
import { reincarnationAtom } from '../recoil/atoms/playerAtoms'
import { progressAtom } from '../recoil/atoms/playerAtoms'

import { wellbeingSelector } from '../recoil/selectors/levelSelectors'

import { examplePlayer } from '../assets/gameData/examplePlayer'


import { AIphoto } from '../components/AIphoto/AIphoto'
import { Typewriter } from 'react-simple-typewriter'
import { PlayerInfo } from '../components/PANELS/Progress/PlayerInfo.jsx'
import { Progress } from '../components/PANELS/Progress/Progress.jsx'
import { UnhealedTraumas } from '../components/PANELS/Progress/UnhealedTraumas'
import { Actions } from '../components/PANELS/Actions/Actions'


export default function Dashboard() {

  //recoil states
  const [status, setStatus] = useRecoilState(statusAtom)
  const [clickedAction, setClickedAction] = useRecoilState(clickedActionAtom)

  const [attrac, setAttrac] = useRecoilState(attracAtom)
  const [mental, setMental] = useRecoilState(mentalAtom)
  const [educ, setEduc] = useRecoilState(educAtom)
  const [wealth, setWealth] = useRecoilState(wealthAtom)
  const [social, setSocial] = useRecoilState(socialAtom)
  const [unhealedTraumas, setUnhealedTraumas] = useRecoilState(unhealedTraumasAtom)
  const [willchain, setWillchain] = useRecoilState(willchainAtom)
  const [healed, setHealed] = useRecoilState(healedAtom)
  const [album, setAlbum] = useRecoilState(albumAtom)
  const [age, setAge] = useRecoilState(ageAtom)
  const [reincarnation, setReincarnation] = useRecoilState(reincarnationAtom)
  const [progress, setProgress] = useRecoilState(progressAtom)

  //recoil selectors
  const wellbeing = useRecoilValue(wellbeingSelector)


  //local states
  const [activePlayer, setActivePlayer] = useState(examplePlayer)


  //TODO bring to work again
  // const [highlightUnhealedTrauma, setHighlightUnhealedTrauma] = useState(false)

  //SECTION ACTION FUNCTIONS


  //SECTION PROGRESS FUNCTION

  const getUnhealedTraumas = useMemo(() => {
    const traumas = [
      // check which traumas are truthy and return corresponding strings as array
      activePlayer.traumas.attrac && "attrac",
      activePlayer.traumas.mental && "mental",
      activePlayer.traumas.educ && "educ",
      activePlayer.traumas.wealth && "wealth",
      activePlayer.traumas.social && "social",
    ];

    return traumas;
  }, [activePlayer.traumas]);




  //SECTION WILL FUNCTIONS


  //SECTION HEALING FUNCTIONS


  //SECTION WELLBEING FUNCTIONS

  const getWidth = (value) => {
    return { width: `${value}%` }
  }



  useEffect(() => {
    setUnhealedTraumas(getUnhealedTraumas)
    setAge(activePlayer.age)
    setReincarnation(activePlayer.reincarnation)
    setAttrac(activePlayer.progress.attrac)
    setMental(activePlayer.progress.mental)
    setEduc(activePlayer.progress.educ)
    setWealth(activePlayer.progress.wealth)
    setSocial(activePlayer.progress.social)

    //TODO bring to work again: unhealed trauma should be blinking in progress if healing action is on screen
    // const getHealingActionsOnScreen = actionsOnScreen.some(
    //   (action) => unhealedTraumas.includes(action.category) && action.healing
    // );
    // setHealingItemsOnScreen(getHealingActionsOnScreen);

  }, [])


  // useEffect(() => {
  //     console.log("fire2 start");
  //     setAttrac(activePlayer.progress.attrac)
  //     setMental(activePlayer.progress.mental)
  //     setEduc(activePlayer.progress.educ)
  //     setWealth(activePlayer.progress.wealth)
  //     setSocial(activePlayer.progress.social)
  //     getActionsToScreen()
  //     console.log("fire2 end");
  //     console.log('actionsOnScreen :>> ', actionsOnScreen);
  // }, [activePlayer.progress])

  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">
        <div className="grid-container-main">

          {status === "action" && (
            <Actions />
          )}

          {status === "memory" && (
            <AIphoto
              action={clickedAction}
              player={activePlayer}
              traumas={unhealedTraumas}
            />
          )}


          <div className='container'>
            <PlayerInfo activePlayer={activePlayer} />
            <Progress />
            <UnhealedTraumas />
          </div>
        </div>

        <div className="grid-container-level">
          <div className="container-leveltask">

            <div className='emoji-container'>
              {willchain.map((emoji, index) => (
                <h2 key={index}>{emoji}</h2>
              ))}
              {[...Array(3 - willchain.length)].map((_, index) => (
                <h2 key={index}>◽️</h2>
              ))}
            </div>
            <h3>{3 - willchain.length} more missing for <span className='highlight'>will chain</span></h3>

          </div>


          <div className="container-leveltask">
            {healed ? (
              <>
                <div className='emoji-container'>
                  <h2>💖</h2>
                </div>
                <h3><span className='highlight'>Trauma</span> healed!</h3>
              </>
            ) : (
              <>
                <div className='emoji-container'>
                  <h2>💔</h2>
                </div>
                <h3>No <span className='highlight'>trauma</span> healed yet</h3>
              </>
            )}
          </div>

          <div className="container-leveltask">
            <div>
              <div className="progressbar-outline">
                <div className={"progressbar-fill"} style={getWidth(wellbeing)}>
                  {`${wellbeing}%`}
                </div>
              </div>
            </div>
            {wellbeing < 66 ? (
              <h3><span className='highlight'>Overall wellbeing</span> not high enough</h3>
            ) : (
              <h3><span className='highlight'>Overall wellbeing</span> high enough</h3>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}
