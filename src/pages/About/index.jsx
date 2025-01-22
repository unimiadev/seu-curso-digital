import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import './About.css';
import aboutImage1 from '../../assets/images/about-1.png';
import aboutImage2 from '../../assets/images/about-2.png';
import aboutImage3 from '../../assets/images/about-3.png';

const About = () => {
  return (
    <div>
      <Header />
      <div className="about-page">
        <div className="about-container">
          <div className="about-header">
            <div className="header-decoration">
              <div className="decoration-circle"></div>
              <div className="decoration-line"></div>
            </div>
            <h1 className="about-title">Sobre Nós</h1>
            <div className="title-underline"></div>
            <p className="header-subtitle">Conheça nossa história e missão</p>
          </div>
          
          <section className="about-section">
            <div className="about-content">
              <div className="content-wrapper">
                <span className="section-number">01</span>
                <div className="content-header">
                  <h2>Nossa História</h2>
                  <div className="section-decoration"></div>
                </div>
                <p>
                  O Seu Curso Digital é uma plataforma de cursos online que se dedica a transformar 
                  vidas por meio da educação gratuita e acessível. Fundado em 2021, o nosso site 
                  surgiu a partir de um sonho: proporcionar educação de qualidade para todos e 
                  capacitar indivíduos para que alcancem seus objetivos profissionais.
                </p>
              </div>
            </div>
            <div className="about-image">
              <div className="image-frame">
                <img src={aboutImage1} alt="Sobre o Seu Curso Digital" />
                <div className="image-overlay"></div>
              </div>
              <div className="image-decoration"></div>
            </div>
          </section>

          <section className="about-section">
            <div className="about-image">
              <div className="image-frame">
                <img src={aboutImage2} alt="Nossa Missão" />
                <div className="image-overlay"></div>
              </div>
              <div className="image-decoration"></div>
            </div>
            <div className="about-content">
              <div className="content-wrapper">
                <span className="section-number">02</span>
                <div className="content-header">
                  <h2>Nossa Missão</h2>
                  <div className="section-decoration"></div>
                </div>
                <p>
                  Acreditamos que a educação é um direito fundamental e trabalhamos incansavelmente 
                  para que todos, independentemente de suas condições financeiras, idade ou localização, 
                  possam ter acesso às mesmas oportunidades de aprendizado.
                </p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <div className="about-content">
              <div className="content-wrapper">
                <span className="section-number">03</span>
                <div className="content-header">
                  <h2>Nossa Visão</h2>
                  <div className="section-decoration"></div>
                </div>
                <p>
                  Sabemos que o mercado de trabalho está cada vez mais exigente e que as habilidades 
                  necessárias para prosperar na carreira estão sempre mudando. Por isso, nossos cursos 
                  são cuidadosamente elaborados por uma equipe de especialistas para que os alunos 
                  estejam sempre à frente, e prontos para aproveitar as melhores oportunidades profissionais.
                </p>
              </div>
            </div>
            <div className="about-image">
              <div className="image-frame">
                <img src={aboutImage3} alt="Nossa Visão" />
                <div className="image-overlay"></div>
              </div>
              <div className="image-decoration"></div>
            </div>
          </section>
        </div>

        <div className="background-decoration">
          <div className="decoration-shape shape-1"></div>
          <div className="decoration-shape shape-2"></div>
          <div className="decoration-shape shape-3"></div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default About; 