import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Certifications = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_URL}/api/certifications/`);
        const data = await response.json();
        setCerts(data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCerts();
  }, []);

  const isExpired = (expirationDate) => {
    if (!expirationDate) return false;
    return new Date(expirationDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <motion.h2
        className="text-5xl font-bold text-center text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Certifications
      </motion.h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading certifications...</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {certs.map((cert) => (
            <motion.div
              key={cert.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition flex flex-col"
            >
              {cert.image && (
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-white">{cert.name}</h3>
              <p className="text-gray-300">{cert.issuer}</p>
              <p className="text-sm text-gray-400">
                Issued: {new Date(cert.issue_date).toLocaleDateString()}
              </p>
              {cert.expiration_date && (
                <p
                  className={`text-sm ${
                    isExpired(cert.expiration_date)
                      ? "text-red-500"
                      : "text-green-400"
                  }`}
                >
                  {isExpired(cert.expiration_date)
                    ? "Expired"
                    : `Valid until: ${new Date(cert.expiration_date).toLocaleDateString()}`}
                </p>
              )}
              {cert.credential_id && (
                <p className="text-sm text-gray-400">ID: {cert.credential_id}</p>
              )}
              {cert.credential_url && (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline text-sm mt-2 block"
                >
                  View Credential
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Certifications;
