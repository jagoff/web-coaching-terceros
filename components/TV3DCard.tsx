"use client";

import React from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function TV3DCard() {
  return (
    <div className="w-full flex justify-center items-center p-4">
      <CardContainer className="inter-var">
        <CardBody className="relative group/card w-full max-w-md sm:w-[30rem] h-auto p-4">
          <CardItem translateZ="50" className="w-full">
            <Image
              src="/img/tv.png"
              alt="TV"
              width={1000}
              height={1000}
              className="w-full object-contain group-hover/card:shadow-2xl transition-all duration-300"
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}
