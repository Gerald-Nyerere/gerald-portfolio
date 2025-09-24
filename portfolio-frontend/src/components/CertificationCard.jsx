// src/components/CertificationCard.jsx
import React from "react";

const CertificationCard = ({ cert }) => {
  return (
    <div className="flex flex-col items-center bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-2xl transition w-full">
      {/* Certificate Image */}
      {cert.image && (
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-40 object-cover rounded-lg mb-4 shadow-md"
        />
      )}

      {/* Certificate Details */}
      <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
      <p className="text-gray-300">{cert.issuer}</p>
      <p className="text-sm text-gray-400">
        {new Date(cert.date).toDateString()}
      </p>
    </div>
  );
};

export default CertificationCard;
