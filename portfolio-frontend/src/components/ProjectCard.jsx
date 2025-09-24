import React from "react";

const ProjectCard = ({ project }) => {
  const placeholderImage = "https://via.placeholder.com/400x250.png?text=Project+Image";

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg hover:shadow-2xl transition flex flex-col h-full">
      {/* Project Image */}
      <img
        src={project.architecture_diagram || placeholderImage}
        alt={project.title}
        onError={(e) => (e.target.src = placeholderImage)}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      {/* Project Title & Description */}
      <h3 className="text-xl font-bold text-white">{project.title}</h3>
      <p className="text-gray-300 my-2">{project.description}</p>

      {/* Technologies */}
      <div className="flex gap-2 mb-2 flex-wrap">
        {project.tech.map((tech, idx) => (
          <span
            key={idx}
            className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Link */}
      <a
        href={project.link}
        className="mt-auto text-purple-400 hover:text-purple-600 font-semibold transition-colors"
      >
        View Project
      </a>
    </div>
  );
};

export default ProjectCard;
