import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import './Privacy.css';

const Privacy = () => {
  return (
    <div>
      <Header />
      <div className="privacy-page">
        <div className="privacy-container">
          <h1>Política de Privacidade</h1>
          
          <section className="privacy-section">
            <p>
              A sua privacidade é importante para nós. É política do Seu Curso Digital – CURSOS respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Seu Curso Digital – CURSOS, e outros sites que possuímos e operamos.
            </p>
            
            <p>
              Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
            </p>

            
            <h2>Política de Cookies Seu Curso Digital – CURSOS</h2>
            <h3>O que são cookies?</h3>
            <p>
              Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar sua experiência. Esta página descreve quais informações eles coletam, como as usamos e por que às vezes precisamos armazenar esses cookies. Também compartilharemos como você pode impedir que esses cookies sejam armazenados, no entanto, isso pode fazer o downgrade ou 'quebrar' certos elementos da funcionalidade do site.
            </p>


            <h2>Compromisso do Usuário</h2>
            <p>
              O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Seu Curso Digital – CURSOS oferece no site e com caráter enunciativo, mas não limitativo:
            </p>
            <ul>
              <li>A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</li>
              <li>B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
              <li>C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Seu Curso Digital – CURSOS, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</li>
            </ul>

            <h2>Mais informações</h2>
            <p>
              Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
            </p>
            <p>
              Esta política é efetiva a partir de Maio/2022.
            </p>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Privacy; 