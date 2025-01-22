import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import './Terms.css';

const Terms = () => {
  return (
    <div>
      <Header />
      <div className="terms-page">
        <div className="terms-container">
          <h1>Termos e Condições</h1>
          
          <section className="terms-section">
            <h2>1. Introdução</h2>
            <p>
              Bem-vindo ao cursos.seucursodigital.com. Estes Termos e Condições regem o uso do nosso site. 
              Ao acessar e utilizar o nosso site, você concorda com estes Termos e Condições na íntegra. 
              Se você não concordar com qualquer parte destes termos, não deve utilizar o nosso site.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Modificações nos Termos</h2>
            <p>
              Nós nos reservamos o direito de modificar estes Termos e Condições a qualquer momento. 
              As mudanças serão publicadas nesta página e, ao continuar a utilizar o site após tais mudanças, 
              você concorda em estar vinculado aos Termos e Condições modificados.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. Elegibilidade</h2>
            <p>
              Para utilizar nosso site e serviços, você deve ter pelo menos 18 anos de idade ou a idade 
              legal de maioridade em seu país de residência.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Conta de Usuário</h2>
            <p>
              Para acessar alguns dos nossos cursos, você pode precisar criar uma conta. Você é responsável 
              por manter a confidencialidade das suas informações de login e por todas as atividades que 
              ocorrem na sua conta. Você concorda em nos notificar imediatamente sobre qualquer uso não 
              autorizado da sua conta.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Conteúdo do Curso</h2>
            <p>
              Todos os conteúdos dos cursos oferecidos no cursos.seucursodigital.com são protegidos por 
              direitos autorais e não podem ser reproduzidos, distribuídos, ou utilizados de qualquer forma 
              sem a permissão expressa do proprietário dos direitos autorais.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Pagamentos e Reembolsos</h2>
            <p>
              Todos os pagamentos realizados por cursos são não reembolsáveis, exceto conforme exigido por lei. 
              Certifique-se de revisar todas as informações do curso e confirmar que ele atende às suas 
              necessidades antes de efetuar a compra.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Uso Aceitável</h2>
            <p>
              Você concorda em utilizar o nosso site de forma responsável e legal. Você não deve usar o nosso 
              site para qualquer propósito ilegal ou não autorizado. A violação de qualquer uma das regras de 
              uso aceitável pode resultar na suspensão ou encerramento da sua conta.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. Limitação de Responsabilidade</h2>
            <p>
              Embora nos esforcemos para fornecer informações precisas e atualizadas, não garantimos que o 
              conteúdo do site esteja livre de erros. Nós não seremos responsáveis por qualquer dano 
              resultante do uso ou incapacidade de uso do nosso site.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. Links para Sites de Terceiros</h2>
            <p>
              Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelo conteúdo ou 
              práticas de privacidade desses sites. Você acessa esses links por sua própria conta e risco.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. Privacidade</h2>
            <p>
              O uso do nosso site também é regido pela nossa Política de Privacidade. Por favor, revise nossa 
              Política de Privacidade para entender nossas práticas.
            </p>
          </section>

          <section className="terms-section">
            <h2>11. Lei Aplicável</h2>
            <p>
              Estes Termos e Condições são regidos pelas leis do Brasil. Qualquer disputa será resolvida nos 
              tribunais competentes do Brasil.
            </p>
          </section>

          <section className="terms-section">
            <h2>12. Contato</h2>
            <p>
              Se você tiver qualquer dúvida sobre estes Termos e Condições, entre em contato conosco pelo 
              e-mail suporte@seucursodigital.com.
            </p>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Terms; 