import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CourseCard from './CourseCard';
import CategoryFilter from './CategoryFilter';
import CoursesFilter from './CoursesFilter';
import { useCategories } from '../hooks/useCategories';
import { useCourses } from '../hooks/useCourses';
import './CourseSection.css';

const CourseSection = () => {
  const location = useLocation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 15;

  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { courses, loading: coursesLoading, error: coursesError } = useCourses();

  const filterAndSortCourses = () => {
    let filteredCourses = [...courses];

    if (selectedCategories.length > 0) {
      filteredCourses = filteredCourses.filter(course => {
        const courseCategories = course.rawCategory.toLowerCase().split(/\s+e\s+|\s*,\s*/);
        return selectedCategories.some(categoryId => {
          const category = categories.find(cat => cat.id === categoryId);
          if (!category) return false;
          
          const categoryName = category.name.toLowerCase();
          return courseCategories.some(courseCategory => 
            courseCategory.includes(categoryName) || categoryName.includes(courseCategory)
          );
        });
      });
    }

    if (searchTerm) {
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case 'name-asc':
        filteredCourses.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filteredCourses.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating-desc':
        filteredCourses.sort((a, b) => {
          const ratingDiff = b.rating - a.rating;
          if (ratingDiff === 0) {
            return b.ratingCount - a.ratingCount;
          }
          return ratingDiff;
        });
        break;
      case 'rating-asc':
        filteredCourses.sort((a, b) => {
          const ratingDiff = a.rating - b.rating;
          if (ratingDiff === 0) {
            return a.ratingCount - b.ratingCount;
          }
          return ratingDiff;
        });
        break;
      case 'duration-asc':
        filteredCourses.sort((a, b) => a.duration - b.duration);
        break;
      case 'duration-desc':
        filteredCourses.sort((a, b) => b.duration - a.duration);
        break;
      default:
        filteredCourses.sort((a, b) => {
          const ratingDiff = b.rating - a.rating;
          if (ratingDiff === 0) {
            return b.ratingCount - a.ratingCount;
          }
          return ratingDiff;
        });
        break;
    }

    return filteredCourses;
  };

  const filteredAndSortedCourses = filterAndSortCourses();
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredAndSortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  useEffect(() => {
    if (location.state?.selectedCategories && location.state?.fromCourseDetails) {
      setSelectedCategories(location.state.selectedCategories);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  if (coursesLoading || categoriesLoading) {
    return <div className="loading-message">Carregando cursos...</div>;
  }

  if (coursesError || categoriesError) {
    return <div className="error-message">Erro ao carregar os dados</div>;
  }

  const totalPages = Math.ceil(filteredAndSortedCourses.length / coursesPerPage);
  const paginationButtons = [];

  if (currentPage > 1) {
    paginationButtons.push(
      <button key="first" onClick={() => setCurrentPage(1)}>
        Primeira
      </button>
    );
  }

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={currentPage === i ? 'active' : ''}
      >
        {i}
      </button>
    );
  }

  if (endPage < totalPages) {
    paginationButtons.push(
      <button
        key="ellipsis"
        onClick={() => setCurrentPage(endPage + 1)}
        className="ellipsis"
      >
        ...
      </button>
    );
    paginationButtons.push(
      <button
        key={totalPages}
        onClick={() => setCurrentPage(totalPages)}
        className={currentPage === totalPages ? 'active' : ''}
      >
        {totalPages}
      </button>
    );
  }

  return (
    <section className="course-section">
      <h2>CURSOS</h2>
      <div className="course-container">
        <div className="filters-section">
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
        </div>
        <div className="courses-content">
          <CoursesFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />
          <div className="course-grid">
            {currentCourses.map(course => (
              <CourseCard 
                key={`course-${course.id}`}
                course={course} 
              />
            ))}
          </div>
          <div className="pagination">
            {paginationButtons}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection; 