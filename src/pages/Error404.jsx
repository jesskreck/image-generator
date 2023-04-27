import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

function Error404() {
  const navigate = useNavigate();
  console.log("navigate:", navigate);
  const [redirect, setRedirect] = useState(false);
  const [countdown, setCountdown] = useState(5);

  //NOTE the same as you did are doing in the useEffect in your AuthConext , cleaning the sideeffects inside the useEffect, would be nice if you implemented that here aswell.
  //NOTE Additonaly , if what you try is to create a countdown, you could do it by taken advantage of how react "reacts" to the state change of countdown together with the use effec. Using only one settimeout, or maybe better, setinterval
  useEffect(() => {
    async function test() {
      timeoutFunction(1000, 4);
      timeoutFunction(2000, 3);
      timeoutFunction(3000, 2);
      timeoutFunction(4000, 1);

      setTimeout(() => {
        setRedirect(true);
        // navigate(-1);
      }, 5000);
    }
    test();
  }, []);

  function timeoutFunction(count, timeout) {
    setTimeout(() => {
      setCountdown(timeout);
    }, count);
  }

  return (
    <div className="page container">
      {redirect ? <Navigate to={"/"} replace={true} /> : null}
      <h1>Error404 Page not found :/</h1>
      <p>Redirecting in {countdown} seconds</p>
      <button onClick={() => navigate(-1)}>Go back...</button>
      <button onClick={() => navigate("/")}>Go home...</button>
    </div>
  );
}

export default Error404;
