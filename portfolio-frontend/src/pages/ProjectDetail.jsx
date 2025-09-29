// src/pages/ProjectDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/api/projects/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Project not found");
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl bg-gray-900 text-gray-300">
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-white">Project Not Found</h2>
          <Link
            to="/projects"
            className="text-purple-400 hover:text-purple-600 transition-colors"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-[-60px] left-[-60px] w-80 h-80 bg-purple-700 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 bg-green-600 rounded-full opacity-20 animate-pulse"></div>

      <div className="max-w-5xl mx-auto p-8 relative z-10 bg-gray-800 rounded-3xl shadow-3xl text-white">
        {/* Project Title */}
        <h2 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
          {project.title}
        </h2>

        {/* Project Type */}
        <p className="text-sm text-gray-400 mb-4 italic">{project.project_type_display}</p>

        {/* Project Description */}
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">{project.description}</p>

        {/* Technologies Used */}
        <h3 className="text-3xl font-semibold mb-4 text-white">Technologies Used</h3>
        <div className="flex flex-wrap gap-3 mb-8">
          {project.technologies_used.map((tech) => (
            <span
              key={tech.id}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white px-4 py-2 rounded-full font-medium cursor-pointer transform transition hover:scale-105 hover:shadow-lg"
            >
              {tech.name}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-black text-white px-6 py-3 rounded-lg shadow-md transition"
            >
              GitHub
            </a>
          )}
          {project.live_demo_url && (
            <a
              href={project.live_demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition"
            >
              Live Demo
            </a>
          )}
        </div>

        {/* Architecture Diagram */}
        {project.architecture_diagram && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-3 text-white">Architecture Diagram</h3>
            <img
              src={project.architecture_diagram}
              alt="Architecture Diagram"
              className="rounded-xl shadow-lg"
            />
          </div>
        )}

        {/* Metadata */}
        <p className="text-sm text-gray-400 mb-6">
          Created: {new Date(project.created).toLocaleDateString()} | Last Updated:{" "}
          {new Date(project.modified).toLocaleDateString()}
        </p>

        {/* Back Link */}
        <div>
          <Link
            to="/projects"
            className="text-purple-400 hover:text-purple-600 transition-colors text-lg"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
