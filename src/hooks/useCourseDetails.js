import { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import logo from "../assets/images/logo-course.png";
import defaultImage from "../assets/images/seucursodigital.png";

const CACHE_KEY = "course_details_cache";
const CACHE_DURATION = 5 * 60 * 1000;

const getLocalCache = (courseId) => {
  try {
    const cached = localStorage.getItem(`${CACHE_KEY}_${courseId}`);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
      localStorage.removeItem(`${CACHE_KEY}_${courseId}`);
    }
  } catch (error) {
    return null;
  }
  return null;
};

const setLocalCache = (courseId, data) => {
  try {
    localStorage.setItem(
      `${CACHE_KEY}_${courseId}`,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    return;
  }
};

export const useCourseDetails = (courseId) => {
  const [course, setCourse] = useState(() => getLocalCache(courseId));
  const [loading, setLoading] = useState(!getLocalCache(courseId));
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      console.log("Fetching course details for ID:", courseId);
      try {
        const cachedData = getLocalCache(courseId);
        if (cachedData) {
          console.log("Found cached data:", cachedData);
          setCourse(cachedData);
          setLoading(false);
          return;
        }

        const coursesRef = collection(db, "cursosMd");
        const coursesSnapshot = await getDocs(coursesRef);
        console.log("Total courses found:", coursesSnapshot.docs.length);

        let foundCourseDoc = null;

        for (const doc of coursesSnapshot.docs) {
          const courseData = doc.data();
          if (courseData.idCursoMd === parseInt(courseId)) {
            console.log("Found matching course:", courseData);
            foundCourseDoc = doc;
            break;
          }
        }

        if (!foundCourseDoc) {
          console.error("No course found for ID:", courseId);
          throw new Error("Curso não encontrado");
        }

        const ptBrRef = doc(db, `cursosMd/${foundCourseDoc.id}/pt_br/curso`);
        const ptBrDoc = await getDoc(ptBrRef);

        if (!ptBrDoc.exists()) {
          console.error(
            "PT-BR details not found for course:",
            foundCourseDoc.id
          );
          throw new Error("Detalhes do curso não encontrados");
        }

        const ptBrData = ptBrDoc.data();
        console.log("PT-BR course data:", ptBrData);

        const avaliacoesRef = collection(
          db,
          `cursosMd/${foundCourseDoc.id}/avaliacoes`
        );
        const avaliacoesSnapshot = await getDocs(avaliacoesRef);

        let totalRating = 0;
        let validRatings = 0;
        const reviews = [];

        avaliacoesSnapshot.docs.forEach((avaliacaoDoc) => {
          const avaliacaoData = avaliacaoDoc.data();
          const nota = Number(avaliacaoData?.nota);

          if (!isNaN(nota) && nota >= 0 && nota <= 5) {
            totalRating += nota;
            validRatings++;

            if (avaliacaoData.descricao) {
              reviews.push({
                id: avaliacaoDoc.id,
                rating: nota,
                description: avaliacaoData.descricao,
                date: avaliacaoData.dataRealizacao,
                userId: avaliacaoData.idUser,
              });
            }
          }
        });

        const averageRating = validRatings > 0 ? totalRating / validRatings : 0;

        const formattedCourse = {
          id: courseId,
          title: ptBrData.nome,
          image: ptBrData.bannerImage || defaultImage,
          duration: ptBrData.cargaHoraria,
          categories: [{ id: ptBrData.categoria, name: ptBrData.categoria }],
          description: ptBrData.descricao,
          rating: Number(averageRating.toFixed(1)),
          ratingCount: validRatings,
          level: "Iniciante",
          language: "Português",
          lastUpdated: new Date().toISOString(),
          totalLessons: 0,
          features: [
            "Acesso vitalício",
            "Certificado de conclusão",
            "Suporte ao aluno",
          ],
          provider: {
            name: "Seu Curso Digital",
            image: logo,
            description:
              "Plataforma de cursos online que se dedica a transformar vidas por meio da educação gratuita e acessível.",
          },
          reviews: reviews.sort((a, b) => {
            const dateA = new Date(
              a.date.split(" ")[0].split("/").reverse().join("-")
            );
            const dateB = new Date(
              b.date.split(" ")[0].split("/").reverse().join("-")
            );
            return dateB - dateA;
          }),
        };

        console.log("Final formatted course:", formattedCourse);
        setLocalCache(courseId, formattedCourse);
        setCourse(formattedCourse);
        setLoading(false);
      } catch (err) {
        console.error("Error in useCourseDetails:", err);
        setError(err);
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    } else {
      console.warn("No courseId provided to useCourseDetails");
    }
  }, [courseId]);

  return { course, loading, error };
};
