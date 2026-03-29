"use client";

import { motion } from "framer-motion";
import { promiseStagger, promiseItem } from "./animations";
import { useLanguage } from "@/contexts/LanguageContext";

const promises = [
  "Primera sesión sin costo", 
  "Métodos validados por Scrum.org",
];

export default function ContactPromises() {
  const { language } = useLanguage();

  const promisesLocalized = language === 'es' ? promises : [
    "First session free of charge",
    "Methods validated by Scrum.org", 
  ];

  return (
    <motion.div
      variants={promiseStagger}
      initial="hidden"
      animate="visible"
      className="mt-12 space-y-3"
    >
      {promisesLocalized.map((promise, index) => (
        <motion.div
          key={index}
          variants={promiseItem}
          className="flex items-center gap-3 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          <div className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
          {promise}
        </motion.div>
      ))}
    </motion.div>
  );
}
