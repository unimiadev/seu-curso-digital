import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const CACHE_KEY = "categories_cache";
const CACHE_DURATION = 10 * 60 * 1000; 

const getLocalCache = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
      localStorage.removeItem(CACHE_KEY);
    }
  } catch (error) {
    console.error("Cache error:", error);
    return null;
  }
  return null;
};

const setLocalCache = (data) => {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.error("Cache set error:", error);
  }
};

export const useCategories = () => {
  const [categories, setCategories] = useState(() => getLocalCache() || []);
  const [loading, setLoading] = useState(!getLocalCache());
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cachedData = getLocalCache();
        if (cachedData) {
          setCategories(cachedData);
          setLoading(false);
          return;
        }

        const categoriesRef = collection(db, "categorias");
        const snapshot = await getDocs(categoriesRef);

        const categoriesData = snapshot.docs
          .map((doc) => ({
            id: doc.id, 
            name: doc.data().name, 
          }))
          .sort((a, b) => a.name.localeCompare(b.name)); 

        setLocalCache(categoriesData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err);
        setLoading(false);
      }
    };

    if (!getLocalCache()) {
      fetchCategories();
    }
  }, []);

  return { categories, loading, error };
};
