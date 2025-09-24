import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projects/")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((project) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          tech: project.technologies_used.map((t) => t.name),
          link: `/projects/${project.id}`,
          architecture_diagram: project.architecture_diagram
            ? project.architecture_diagram.replace("127.0.0.1", "localhost")
            : null,
        }));
        setProjects(formatted);
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-900 relative overflow-hidden">
      {/* Decorative animated circles */}
      <div className="absolute top-[-60px] left-[-60px] w-72 h-72 bg-purple-700 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-60px] right-[-60px] w-72 h-72 bg-green-600 rounded-full opacity-20 animate-pulse"></div>

      <div className="max-w-6xl mx-auto p-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-10 text-white text-center md:text-left"
        >
          My Projects
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="transform transition hover:scale-105"
            >
              <Link to={project.link}>
                <div className="bg-gray-800 rounded-2xl shadow-lg p-4">
                  <ProjectCard project={project} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Add Button */}
      <Link
        to="/projects/add"
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white 
                   p-4 rounded-full shadow-lg flex items-center justify-center 
                   transform transition hover:scale-110 z-20"
      >
        <FaPlus className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default Projects;
