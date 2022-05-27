import React from "react";
import { Centered } from "./Centered";
import { Typography } from "./Typography";

type ErrorPageFC = {
  message: string;
};

export function ErrorPage({ message }: ErrorPageFC) {
  return (
    <Centered>
      <Typography>{message}</Typography>
    </Centered>
  );
}
