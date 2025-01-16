import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const useModules = (courseId) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const modulesRef = collection(
          db,
          `cursosMd/${courseId}/pt_br/modulos/modulos`
        );
        const modulesSnapshot = await getDocs(modulesRef);

        const modulesData = modulesSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            title: doc.data().titulo,
          }))
          .sort((a, b) => parseInt(a.id) - parseInt(b.id));

        setModules(modulesData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (courseId) {
      fetchModules();
    }
  }, [courseId]);

  return { modules, loading, error };
};
