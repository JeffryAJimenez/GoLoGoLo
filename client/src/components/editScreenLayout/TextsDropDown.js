import React, { Fragment } from "react";
import Text from "./Text";

const TextDropDown = ({ text }) => {
  return (
    <Fragment>
      {text.map((e) => (
        <Text logoText={e} />
      ))}
    </Fragment>
  );
};
