import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import logo from "../assets/images/logo-course.png";
import defaultImage from "../assets/images/seucursodigital.png";

// Configurações de cache
const CACHE_KEY = "course_details_cache";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Função para obter dados do cache local
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

// Função para salvar dados no cache local
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

export const useCourseDetails = (courseId, slug) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lista de cursos especiais que possuem versão "-2"
  const specialCourses = [
    "administracao-em-enfermagem",
    "agente-comunitario-de-saude",
    "atendente-de-farmacia",
    "automaquiagem",
    "auxiliar-de-necropsia",
    "cuidador-infantil",
    "frentista",
    "gestao-de-salao-de-beleza",
    "motorista-de-aplicativo",
    "operador-de-prensa",
    "tecnicas-de-vendas",
  ];

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);

        // Verifica cache primeiro
        if (courseId) {
          const cachedData = getLocalCache(courseId);
          if (cachedData) {
            setCourse(cachedData);
            setLoading(false);
            return;
          }
        }

        let courseDoc;

        if (courseId) {
          courseDoc = await getDoc(doc(db, "cursosMd", courseId));
        } else if (slug) {
          // Busca todos os cursos em uma única consulta
          const coursesRef = collection(db, "cursosMd");
          const coursesSnapshot = await getDocs(coursesRef);

          // Busca todos os documentos pt_br em paralelo
          const ptBrDocs = await Promise.all(
            coursesSnapshot.docs.map((docSnapshot) =>
              getDoc(doc(db, "cursosMd", docSnapshot.id, "pt_br", "curso"))
            )
          );

          const searchSlug = slug.endsWith("-2") ? slug.slice(0, -2) : slug;
          const normalizedSlug = searchSlug
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

          // Encontra o curso correspondente
          for (let i = 0; i < coursesSnapshot.docs.length; i++) {
            const docSnapshot = coursesSnapshot.docs[i];
            const ptBrDoc = ptBrDocs[i];

            if (ptBrDoc.exists()) {
              const courseData = ptBrDoc.data();
              const courseTitle = courseData.nome || "";
              const courseSlug = courseTitle
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");

              if (courseSlug === normalizedSlug) {
                const isSpecialCourse = specialCourses.includes(courseSlug);
                const hasSpecialSuffix = slug.endsWith("-2");

                if (
                  (isSpecialCourse && hasSpecialSuffix) ||
                  (!isSpecialCourse && !hasSpecialSuffix)
                ) {
                  courseDoc = docSnapshot;
                  break;
                }
              }
            }
          }
        }

        if (courseDoc?.exists()) {
          // Busca dados do curso e avaliações em paralelo
          const [ptBrDoc, avaliacoesSnapshot] = await Promise.all([
            getDoc(doc(db, "cursosMd", courseDoc.id, "pt_br", "curso")),
            getDocs(collection(db, `cursosMd/${courseDoc.id}/avaliacoes`)),
          ]);

          if (ptBrDoc.exists()) {
            const courseData = ptBrDoc.data();

            // Calcula avaliações usando reduce
            const { totalRating, validRatings } =
              avaliacoesSnapshot.docs.reduce(
                (acc, avaliacaoDoc) => {
                  const nota = Number(avaliacaoDoc.data()?.nota);
                  if (!isNaN(nota) && nota >= 0 && nota <= 5) {
                    acc.totalRating += nota;
                    acc.validRatings++;
                  }
                  return acc;
                },
                { totalRating: 0, validRatings: 0 }
              );

            const transformedCourseData = {
              id: courseDoc.id,
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
              rating: Number(
                (validRatings > 0 ? totalRating / validRatings : 0).toFixed(1)
              ),
              ratingCount: validRatings,
              level: courseData.nivel || "Iniciante",
              language: courseData.idioma || "Português",
              features: courseData.recursos || [
                "Certificado de Conclusão",
                "Acesso Vitalício",
                "Suporte Online",
                "Material Complementar",
              ],
              provider: {
                name: "Seu Curso Digital",
                image: logo,
                description:
                  "Plataforma de cursos online que se dedica a transformar vidas por meio da educação gratuita e acessível.",
              },
            };

            if (courseId) {
              setLocalCache(courseId, transformedCourseData);
            }

            setCourse(transformedCourseData);
            setError(null);
          }
        } else {
          setError(new Error("Curso não encontrado"));
          setCourse(null);
        }
      } catch (err) {
        console.error("Erro ao buscar curso:", err);
        setError(err);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    if (courseId || slug) {
      fetchCourse();
    }
  }, [courseId, slug]);

  return { course, loading, error };
};
