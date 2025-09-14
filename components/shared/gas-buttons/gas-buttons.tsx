"use client";
import React from "react";

import { FirstLine } from "./first-line";
import { SecondLine } from "./second-line";
import { ThirdLine } from "./third-line";
import { FourthLine } from "./fourth-line";
import { SixLine } from "./six-line";
import { SevenLine } from "./seven-line";
import { EightLine } from "./eight-line";

interface Props {
  className?: string;
  globalVisible: boolean;
}

export const GasButtons = ({ className, globalVisible }: Props) => {
  return (
    <div className={className}>
      <FirstLine globalVisible={globalVisible} />
      <SecondLine globalVisible={globalVisible} />
      <ThirdLine globalVisible={globalVisible} />
      <FourthLine globalVisible={globalVisible} />
      <SixLine globalVisible={globalVisible} />
      <SevenLine globalVisible={globalVisible} />
      <EightLine globalVisible={globalVisible} />
    </div>
  );
};
