import { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import logo from "../assets/images/logo-course.png";
import defaultImage from "../assets/images/seucursodigital.png";

const CACHE_KEY = "courses_cache";
const CACHE_DURATION = 5 * 60 * 1000;

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
    return;
  }
};

export const useCourses = () => {
  const [courses, setCourses] = useState(() => getLocalCache() || []);
  const [loading, setLoading] = useState(!getLocalCache());
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const cachedData = getLocalCache();
        if (cachedData) {
          setCourses(cachedData);
          setLoading(false);
          return;
        }

        const coursesRef = collection(db, "cursosMd");
        const coursesSnapshot = await getDocs(coursesRef);

        const coursesPromises = coursesSnapshot.docs.map(async (courseDoc) => {
          const courseId = courseDoc.id;
          const ptBrRef = doc(db, `cursosMd/${courseId}/pt_br/curso`);
          const ptBrDoc = await getDoc(ptBrRef);

          if (!ptBrDoc.exists()) {
            return null;
          }

          const courseData = ptBrDoc.data();
          const avaliacoesRef = collection(
            db,
            `cursosMd/${courseDoc.id}/avaliacoes`
          );
          const avaliacoesSnapshot = await getDocs(avaliacoesRef);

          let totalRating = 0;
          let validRatings = 0;

          avaliacoesSnapshot.docs.forEach((avaliacaoDoc) => {
            const nota = Number(avaliacaoDoc.data()?.nota);
            if (!isNaN(nota) && nota >= 0 && nota <= 5) {
              totalRating += nota;
              validRatings++;
            }
          });

          const averageRating =
            validRatings > 0 ? totalRating / validRatings : 0;

          return {
            id: courseData.idCursoMd || courseId,
            title: courseData.nome,
            image: courseData.bannerImage || defaultImage,
            duration: courseData.cargaHoraria,
            categories: courseData.categoria
              .split(/\s+e\s+|\s*,\s*/)
              .map((category) => ({
                id: category,
                name: category,
              })),
            rawCategory: courseData.categoria,
            description: courseData.descricao,
            rating: Number(averageRating.toFixed(1)),
            ratingCount: validRatings,
            provider: {
              name: "Seu Curso Digital",
              image: logo,
              description:
                "Plataforma de cursos online que se dedica a transformar vidas por meio da educação gratuita e acessível.",
            },
          };
        });

        const coursesData = (await Promise.all(coursesPromises)).filter(
          Boolean
        );
        setLocalCache(coursesData);
        setCourses(coursesData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (!getLocalCache()) {
      fetchCourses();
    }
  }, []);

  return { courses, loading, error };
};
