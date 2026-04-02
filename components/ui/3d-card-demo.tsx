"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] h-auto rounded-xl p-4 sm:p-6 border">
        <CardItem
          translateZ="50"
          className="text-lg sm:text-xl font-bold text-neutral-600 dark:text-white"
        >
          Experiencia TV Inmersiva
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Descubre el poder del coaching transformador a través de nuestra plataforma interactiva
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="/images/ui/tv-icon.png"
            height="1000"
            width="1000"
            className="h-48 sm:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="TV Coaching Experience"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-6 sm:mt-20">
          <CardItem
            translateZ={20}
            as="button"
            className="px-3 sm:px-4 py-2 rounded-xl text-xs font-normal dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Ver demo →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-3 sm:px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Comenzar ahora
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
