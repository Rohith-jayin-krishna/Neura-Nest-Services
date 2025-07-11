// src/components/ScrollHero.js

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import smarthomeImage from '../assets/smarthomeimage.png';
import '../Pages/Pages.css';
const ScrollHero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="scroll-hero" ref={ref}>
      <motion.img
        src={smarthomeImage}
        alt="Smart Home"
        className="scroll-image"
        style={{ scale, opacity }}
      />
      <motion.h1 style={{ opacity }} className="scroll-title">
        The Future of Smart Living
      </motion.h1>
    </div>
  );
};

export default ScrollHero;