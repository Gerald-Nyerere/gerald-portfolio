import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { 
  FaJsSquare, FaPython, FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaCss3Alt
} from "react-icons/fa";
import { SiDjango, SiTailwindcss } from "react-icons/si";
import { useAboutMe } from "../hooks/useAboutMe";

const iconMap = {
  JavaScript: <FaJsSquare className="text-yellow-400 w-10 h-10" />,
  Python: <FaPython className="text-blue-400 w-10 h-10" />,
  React: <FaReact className="text-blue-300 w-10 h-10" />,
  Django: <SiDjango className="text-green-500 w-10 h-10" />,
  "Node.js": <FaNodeJs className="text-green-400 w-10 h-10" />,
  SQL: <FaDatabase className="text-indigo-400 w-10 h-10" />,
  "Tailwind CSS": <SiTailwindcss className="text-teal-400 w-10 h-10" />,
  "Git & GitHub": <FaGitAlt className="text-orange-400 w-10 h-10" />,
  CSS: <FaCss3Alt className="text-blue-500 w-10 h-10" />,
};

const levelMap = {
  Beginner: "33%",
  Intermediate: "66%",
  Advanced: "100%",
};

const About = () => {
  const { aboutMe, loading, error } = useAboutMe();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    fetch(`${API_URL}/api/skills/`)
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Error loading profile: {error}</p>
        </div>
      </div>
    );
  }

  const fullName = aboutMe?.about_me?.name || "Full Name";
  const firstName = fullName.split(" ")[0];

  return (
    <div className="min-h-screen w-full bg-gray-900 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-[-60px] left-[-60px] w-72 h-72 bg-purple-700 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-60px] right-[-60px] w-72 h-72 bg-green-600 rounded-full opacity-20 animate-pulse"></div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            {firstName}
          </h1>
        </motion.div>

        {/* Bio Section */}
        {aboutMe?.about_me?.bio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 rounded-2xl shadow-xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">About Me</h2>
            <div className="prose prose-lg max-w-none text-gray-300 leading-relaxed">
              <ReactMarkdown>{aboutMe.about_me.bio}</ReactMarkdown>
            </div>
          </motion.div>
        )}

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-white text-center"
          >
            Skills & Technologies
          </motion.h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-700 rounded-2xl shadow-lg p-6 flex flex-col items-center transform transition hover:scale-105 hover:shadow-xl border border-gray-600"
                >
                  {/* Icon */}
                  <div className="mb-3">
                    {iconMap[skill.name] || (
                      <FaDatabase className="text-gray-400 w-10 h-10" />
                    )}
                  </div>

                  {/* Skill Name */}
                  <h4 className="font-semibold text-lg text-center text-white">
                    {skill.name}
                  </h4>

                  {/* Progress Bar */}
                  <div className="w-full h-2 mt-3 bg-gray-600 rounded-full overflow-hidden">
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
              ))
            ) : (
              <p className="text-center text-gray-400 col-span-full">
                No skills found.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
