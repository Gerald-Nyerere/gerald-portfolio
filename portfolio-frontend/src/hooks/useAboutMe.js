import { useEffect, useState } from "react";

export const useAboutMe = () => {
  const [aboutMe, setAboutMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutMe = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;

      

        const response = await fetch(`${API_URL}/api/about/`); 
        // 👆 Your Django AboutMe API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch About Me data");
        }
        const data = await response.json();
        setAboutMe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutMe();
  }, []);

  return { aboutMe, loading, error };
};
