import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const setupCategories = async () => {
  try {
    console.log("Starting categories setup...");

    const coursesRef = collection(db, "cursosMd");
    const coursesSnapshot = await getDocs(coursesRef);
    const uniqueCategories = new Set();

    
    const normalizeCategory = (category) => {
      return category
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    };

    
    const standardizeCategory = (category) => {
      
      const commonVariations = {
        "beleza estetica": "beleza e estetica",
        "gestao negocios": "gestao e negocios",
        
      };

      const normalized = normalizeCategory(category);
      return commonVariations[normalized] || category;
    };

    
    for (const courseDoc of coursesSnapshot.docs) {
      const ptBrRef = doc(db, `cursosMd/${courseDoc.id}/pt_br/curso`);
      const ptBrDoc = await getDoc(ptBrRef);

      if (ptBrDoc.exists()) {
        const courseData = ptBrDoc.data();
        if (courseData.categoria) {
          
          const categories = courseData.categoria
            .split(",")
            .map((cat) => cat.trim())
            .filter((cat) => cat.length > 0);

          categories.forEach((category) => {
            
            const standardizedCategory = standardizeCategory(category);
            uniqueCategories.add(standardizedCategory);
          });
        }
      }
    }

    console.log("Found unique categories:", uniqueCategories);

    
    const categoriesRef = collection(db, "categorias");

    for (const categoryName of uniqueCategories) {
      const docId = categoryName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      const categoryDoc = doc(categoriesRef, docId);
      await setDoc(categoryDoc, {
        name: categoryName,
        createdAt: new Date().toISOString(),
      });
      console.log("Added category:", categoryName);
    }

    console.log("Categories setup completed successfully!");
    return true;
  } catch (error) {
    console.error("Error setting up categories:", error);
    throw error;
  }
};
