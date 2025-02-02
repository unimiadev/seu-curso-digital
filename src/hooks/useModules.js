import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const useModules = (courseId) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      if (!courseId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const modulesRef = collection(db, "cursosMd", courseId, "modules");
        const modulesSnapshot = await getDocs(modulesRef);

        const modulesData = modulesSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => a.order - b.order);

        setModules(modulesData);
      } catch (err) {
        console.error("Error fetching modules:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [courseId]); // Only re-run when courseId changes

  return { modules, loading, error };
};
