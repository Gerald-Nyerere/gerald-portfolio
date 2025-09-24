// src/components/SkillCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaDatabase } from "react-icons/fa";

const levelMap = {
  Beginner: "33%",
  Intermediate: "66%",
  Advanced: "100%",
};

const SkillCard = ({ skill, index }) => {
  return (
    <motion.div
      key={skill.id}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center 
                 transform transition hover:scale-105 hover:shadow-2xl border border-gray-700"
    >
      {/* Skill Icon */}
      <div className="mb-3 text-4xl text-purple-400">
        {skill.icon || <FaDatabase className="w-10 h-10 text-gray-400" />}
      </div>

      {/* Skill Name */}
      <h4 className="font-semibold text-lg text-center text-white">
        {skill.name}
      </h4>

      {/* Progress Bar */}
      <div className="w-full h-2 mt-3 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: levelMap[skill.level] || "50%" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
        ></motion.div>
      </div>

      {/* Skill Level */}
      <p className="text-gray-300 text-sm mt-2">{skill.level}</p>
    </motion.div>
  );
};

export default SkillCard;
