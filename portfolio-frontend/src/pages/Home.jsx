import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import myImage from "../assets/gerald.png";
import Certifications from "./Certifications";
import About from "./About";
import Contact from "./Contact";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;
  const CLOUDINARY_BASE = import.meta.env.VITE_CLOUDINARY_BASE;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects/`);
        const data = await res.json();

        const formatted = data
          .sort((a, b) => new Date(b.created) - new Date(a.created))
          .slice(0, 3)
          .map((project) => ({
            id: project.id,
            title: project.title,
            description: project.description,
            tech: project.technologies_used?.map((t) => t.name) || [],
            link: `/projects/${project.id}`,
            architecture_diagram: project.architecture_diagram
              ? project.architecture_diagram.startsWith("http")
                ? project.architecture_diagram
                : `${CLOUDINARY_BASE}${project.architecture_diagram.replace(
                    "127.0.0.1",
                    "localhost"
                  )}`
              : null,
          }));

        setProjects(formatted);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [API_URL, CLOUDINARY_BASE]);

  return (
    <div className="min-h-screen w-full bg-gray-900 relative overflow-hidden">
      {/* Animated background circles */}
      <motion.div
        className="absolute top-[-60px] left-[-60px] w-72 h-72 bg-purple-600 rounded-full opacity-30"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[-60px] right-[-60px] w-72 h-72 bg-green-500 rounded-full opacity-30"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto p-6 relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center mb-16 gap-8">
          {/* Left Image */}
          <motion.div
            className="w-full md:w-1/3 mb-6 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={myImage}
              alt="Gerald Nyerere"
              className="rounded-full shadow-2xl w-full object-cover border-4 border-purple-400 hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          {/* Right Text */}
          <motion.div
            className="w-full md:w-2/3 md:pl-8 text-center md:text-left space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-5xl font-bold text-white">
              Hi, I’m <span className="text-purple-500">Gerald Nyerere</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              A passionate Software Developer focused on building scalable and
              efficient web applications. I love turning ideas into powerful,
              user-centered digital experiences.
            </p>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/projects"
                className="inline-block bg-purple-600 hover:bg-purple-800 text-white px-6 py-3 rounded-lg shadow-lg transition"
              >
                View My Projects
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Featured Projects */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">
            Featured Projects
          </h2>

          {loading ? (
            <p className="text-gray-400">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-gray-400">No projects available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/projects/${project.id}`}>
                    <ProjectCard project={project} />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Other Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white mt-16 space-y-16"
        >
          <Certifications />
          <About />
          <Contact />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
