import React from "react";
import logoSrc from "../assets/logo.png";

function Logo() {
  return (
    <>
      <img src={logoSrc} alt="logo" style={{ height: 48 }} />
    </>
  );
}

export default Logo;
