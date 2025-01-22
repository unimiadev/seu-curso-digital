import React from 'react';
import { Link } from 'react-router-dom';
import './CourseAccess.css';
import coursesImage from '../../../assets/images/certificado.png';

const CourseAccess = () => {
  return (
    <section className="course-access">
      <div className="course-access-container">
        <h2>Comece Sua Jornada de Aprendizado</h2>
        <p>
          Acesse nossa plataforma e descubra uma nova maneira de aprender. 
          Com cursos gratuitos e certificados reconhecidos, você está a um passo 
          de transformar seu futuro profissional.
        </p>
        <Link to="/cursos" className="access-button">
          Explorar Cursos
        </Link>
        <div className="courses-image-container">
          <img 
            src={coursesImage} 
            alt="Preview dos cursos" 
            className="courses-image"
          />
        </div>
      </div>
    </section>
  );
};

export default CourseAccess; 