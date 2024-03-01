import React from "react";

export default function RecipePage({props}) {
  return <div>{props.match.params.id}</div>;
}
