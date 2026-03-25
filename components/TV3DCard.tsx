"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function TV3DCard() {
  return (
    <div className="w-full flex justify-center items-center p-4">
      <CardContainer className="inter-var">
        <CardBody className="relative group/card w-full max-w-md sm:w-[30rem] h-auto p-4">
          <CardItem translateZ="50" className="w-full">
            <img
              src="/img/tv.png"
              height="1000"
              width="1000"
              className="w-full object-contain group-hover/card:shadow-2xl transition-all duration-300"
              alt="TV"
            />
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}
