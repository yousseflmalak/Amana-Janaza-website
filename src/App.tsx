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

        <section id="valeurs" className="section bg-dark">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Nos Valeurs</h2>
              <div className="gold-separator"></div>
              <p className="section-subtitle">
                Notre mission est guidée par des principes fondamentaux ancrés dans notre foi et notre éthique professionnelle.
              </p>
            </div>
            
            <div className="services-grid">
              <div className="service-card reveal">
                <div className="service-icon-wrapper">
                  <div className="service-icon">🤝</div>
                </div>
                <h3 className="service-title">Dignité & Respect</h3>
                <p className="service-desc">
                  Chaque défunt est traité avec le plus profond respect, la plus grande douceur et une pudeur absolue, comme le recommande la tradition prophétique.
                </p>
              </div>
              
              <div className="service-card reveal" style={{animationDelay: '0.1s'}}>
                <div className="service-icon-wrapper">
                  <div className="service-icon">⚖️</div>
                </div>
                <h3 className="service-title">Transparence & Intégrité</h3>
                <p className="service-desc">
                  Nous privilégions une communication claire et honnête avec les familles, sans coûts cachés ni mauvaises surprises, dans un esprit de totale confiance.
                </p>
              </div>
              
              <div className="service-card reveal" style={{animationDelay: '0.2s'}}>
                <div className="service-icon-wrapper">
                  <div className="service-icon">🕋</div>
                </div>
                <h3 className="service-title">Conformité à la Sunna</h3>
                <p className="service-desc">
                  L'intégralité de nos rites (lavage, linceul, prière, inhumation) est exécutée en stricte conformité avec le Coran et la Sunna authentique.
                </p>
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
              <a href="#valeurs">Nos Valeurs</a>
            </div>
            <div className="footer-contact" id="contact">
              <h4>Contactez-nous (24/7)</h4>
              <p>📍 Bruxelles, Belgique</p>
              <p>📞 +32 (0) 4XX XX XX XX</p>
              <p>✉️ <a href="mailto:contact@amana-janaza.com" style={{color: 'inherit', textDecoration: 'none'}}>contact@amana-janaza.com</a></p>
            </div>
            <div className="footer-social">
              <h4>Suivez-nous</h4>
              <a
                href="https://www.instagram.com/alaamanah.be"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-link"
                aria-label="Suivez Amana-Janaza sur Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#feda75" />
                      <stop offset="25%" stopColor="#fa7e1e" />
                      <stop offset="50%" stopColor="#d62976" />
                      <stop offset="75%" stopColor="#962fbf" />
                      <stop offset="100%" stopColor="#4f5bd5" />
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)"/>
                  <rect x="6" y="6" width="12" height="12" rx="3" fill="none" stroke="white" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" fill="none" stroke="white" strokeWidth="2"/>
                  <circle cx="16.5" cy="7.5" r="1.1" fill="white"/>
                </svg>
                <span>@alaamanah.be</span>
              </a>
              <a
                href="https://www.facebook.com/amana.janaza.brussels"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-link"
                aria-label="Suivez Amana-Janaza sur Facebook"
                style={{marginTop: '10px'}}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" fill="#1877F2"/>
                  <path d="M13.5 8H12C11.4 8 11 8.4 11 9v2H9v2.5h2V19h2.5v-5.5H14l.5-2.5h-2V9.5c0-.3.2-.5.5-.5h1V8z" fill="white"/>
                </svg>
                <span>Amana Janaza</span>
              </a>
              <p className="social-desc">Conseils, informations et actualités sur les rites funéraires islamiques.</p>
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
