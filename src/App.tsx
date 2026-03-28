import { useEffect, useState } from 'react';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-wrapper">
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-content">
          <a href="#" className="logo">
            <img src="/assets/logo-dark-moon.png" alt="Al Amanah Funérailles" className="logo-img" />
          </a>
          <nav className="nav-links">
            <a href="#services" className="nav-link">Nos Services</a>
            <a href="#rapatriement" className="nav-link">Rapatriement</a>
            <a href="#valeurs" className="nav-link">Nos Valeurs</a>
            <a href="#contact" className="nav-link contact-btn">Urgence 24/7</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-overlay"></div>
          <div className="hero-content fade-in-up">
            <div className="hero-subtitle">À Allah nous appartenons, à Lui nous retournons</div>
            <h1 className="hero-title">L'Excellence dans le respect des rites islamiques</h1>
            <p className="hero-text">
              <strong>Al Amanah Funérailles</strong> (Amana-Janaza) vous accompagne avec dignité, 
              transparence et dévouement dans ces moments de grande épreuve, en Belgique et vers le monde entier.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn-primary">Appeler une Urgence (24/7)</a>
              <a href="#services" className="btn-outline">Découvrir nos services</a>
            </div>
          </div>
        </section>

        <section id="services" className="section bg-dark">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Nos Services Fondamentaux</h2>
              <div className="gold-separator"></div>
              <p className="section-subtitle">
                Nous prenons en charge l'intégralité des démarches administratives et religieuses 
                pour vous permettre de vous recentrer sur l'essentiel : le recueillement.
              </p>
            </div>
            
            <div className="services-grid">
              <div className="service-card reveal">
                <div className="service-icon-wrapper">
                  <div className="service-icon">💧</div>
                </div>
                <h3 className="service-title">Toilette Rituelle (Ghusl)</h3>
                <p className="service-desc">
                  Réalisée par des équipes expérimentées avec une pudeur absolue et selon la stricte tradition prophétique (Sunna), dans des infrastructures dédiées.
                </p>
              </div>
              
              <div className="service-card reveal" style={{animationDelay: '0.1s'}}>
                <div className="service-icon-wrapper">
                  <div className="service-icon">🕊️</div>
                </div>
                <h3 className="service-title">Linceul (Kafan) & Inhumation</h3>
                <p className="service-desc">
                  Enveloppement dans des linceuls purifiés. Organisation d'inhumations locales dans les carrés musulmans de Belgique avec concession perpétuelle.
                </p>
              </div>
              
              <div className="service-card reveal" style={{animationDelay: '0.2s'}}>
                <div className="service-icon-wrapper">
                  <div className="service-icon">🤲</div>
                </div>
                <h3 className="service-title">Prière Funéraire (Janazah)</h3>
                <p className="service-desc">
                  Coordination totale avec les mosquées et imams locaux pour l'organisation de la prière Salat Al-Janazah afin de rassembler la communauté.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="rapatriement" className="section bg-black crescent-bg">
          <div className="container">
            <div className="rapatriement-content">
              <div className="rapatriement-text reveal">
                <h2 className="section-title">Rapatriement International</h2>
                <div className="gold-separator left"></div>
                <p className="large-text">
                  Le retour aux sources, encadré par des professionnels.
                </p>
                <p>
                  Nous gérons la complexité douanière et consulaire pour assurer un vol rapide vers le <strong>Maroc, l'Algérie, la Tunisie, la Turquie</strong>, et toutes les autres destinations mondiales.
                </p>
                <ul className="feature-list">
                  <li>➔ Obtention des laissez-passer mortuaires internationaux</li>
                  <li>➔ Soins de conservation (si exigés par le pays ou la compagnie aérienne)</li>
                  <li>➔ Réservation de fret cargo prioritaire (RAM, Turkish Airlines, etc.)</li>
                  <li>➔ Fourniture de cercueils hermétiques (zinc) agréés vols internationaux</li>
                </ul>
                <div style={{marginTop: '2rem'}}>
                  <button className="btn-primary">Demander un devis de rapatriement</button>
                </div>
              </div>
              <div className="rapatriement-image reveal" style={{animationDelay: '0.2s'}}>
                {/* Decorative element leveraging the dark calligraphy logo */}
                <div className="image-frame">
                   <img src="/assets/logo-dark-calligraphy.png" alt="Amana Janaza Calligraphy" className="decorative-logo" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/assets/logo-dark-moon.png" alt="Al Amanah Logo" className="footer-logo-img" />
              <p className="footer-tagline">L'excellence au service de la Ummah en Belgique.</p>
            </div>
            <div className="footer-links">
              <h4>Navigation</h4>
              <a href="#services">Nos Services</a>
              <a href="#rapatriement">Rapatriement</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-contact">
              <h4>Contactez-nous (24/7)</h4>
              <p>📍 Bruxelles, Belgique</p>
              <p>📞 +32 (0) 4XX XX XX XX</p>
              <p>✉️ contact@amana-janaza.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Al Amanah Funérailles (Amana-Janaza). Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
