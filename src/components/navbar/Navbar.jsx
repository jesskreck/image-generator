import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { LoginButton } from "./LoginButton";

import LanguageSwitch from "./LanguageSwitch";
import { AuthFeedback } from "../auth/AuthFeedback";


function Navbar() {
  
  const { user } = useContext(AuthContext)



  return (
    <>
      <nav>
        <LanguageSwitch />
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/ImageGenerator"}>DALL·E</NavLink>

        <NavLink to={"/Players"}>Player Selection</NavLink>
        <NavLink to={"/Actions"}>Dashboard</NavLink>
        
          {user
            ? <div className="btn--nav">
              <AuthFeedback />
            </div>
            : <LoginButton label={"Login"} />
          }

      </nav>
    </>
  );
}

export default Navbar;
