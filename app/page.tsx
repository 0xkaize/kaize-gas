"use client";
import React from "react";
import { Container, GasButtons, SideHeader } from "@/components/shared";

export default function Home() {
  const [globalVisible, setGlobalVisible] = React.useState(true);

  const toggleAll = () => setGlobalVisible((prev) => !prev);

  return (
    <>
      <Container>
        <SideHeader globalVisible={globalVisible} toggleAll={toggleAll} />
        <GasButtons globalVisible={globalVisible} />
      </Container>
    </>
  );
}
