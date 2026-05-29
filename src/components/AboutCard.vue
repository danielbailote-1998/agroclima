<template>
  <div class="about-section py-4 px-2 px-md-0">
    <div class="row g-3">

      <!-- ── Sobre o Projeto ── -->
      <div class="col-md-7">
        <div class="card border-0 shadow-sm h-100 about-project-card">
          <div class="card-body p-4">
            <div class="d-flex align-items-center gap-2 mb-3">
              <span class="about-icon-badge">🌿</span>
              <h5 class="mb-0 fw-bold about-title">AgroClima — Monitorização Agrícola</h5>
            </div>

            <p class="about-desc mb-3">
              Ferramenta digital que cruza dados meteorológicos em tempo real do
              <strong>IPMA</strong> com regras agronómicas validadas por instituições
              portuguesas para apoiar decisões práticas no campo.
            </p>

            <div class="row g-2 mb-3">
              <div class="col-6 col-md-3">
                <div class="about-stat">
                  <div class="about-stat-value">7</div>
                  <div class="about-stat-label">Culturas</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="about-stat">
                  <div class="about-stat-value">40+</div>
                  <div class="about-stat-label">Regras agronómicas</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="about-stat">
                  <div class="about-stat-value">278</div>
                  <div class="about-stat-label">Estações IPMA</div>
                </div>
              </div>
              <div class="col-6 col-md-3">
                <div class="about-stat">
                  <div class="about-stat-value">3</div>
                  <div class="about-stat-label">Dias previsão</div>
                </div>
              </div>
            </div>

            <div class="d-flex flex-wrap gap-2">
              <span class="about-tag">🌡️ Dados IPMA em tempo real</span>
              <span class="about-tag">🏫 Fontes: INIAV · ISA · ESAC · DRAP</span>
              <span class="about-tag">📍 Geolocalização de estações</span>
              <span class="about-tag">⚠️ Alertas fitossanitários</span>
              <span class="about-tag">💧 Gestão hídrica</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Sobre o Autor ── -->
      <div class="col-md-5">
        <div class="card border-0 shadow-sm h-100 about-author-card">
          <div class="card-body p-4">
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="author-avatar">DB</div>
              <div>
                <h5 class="mb-0 fw-bold about-title">Daniel Bailote</h5>
                <div class="d-flex flex-wrap gap-1 mt-1">
                  <span class="author-badge">💻 Full Stack Developer</span>
                  <span class="author-badge">🌱 Eng. Agrónomo</span>
                </div>
              </div>
            </div>

            <p class="about-desc mb-3">
              Une agricultura, dados e programação para criar soluções mais eficientes e sustentáveis.
              Este projeto nasceu da necessidade real de ter informação agronómica útil no campo,
              sem parar o trabalho.
            </p>

            <div class="d-flex flex-column gap-2">
              <a href="mailto:danielbailotedev@gmail.com" class="author-contact">
                <span>✉️</span>
                <span>danielbailotedev@gmail.com</span>
              </a>
              <a href="https://github.com/danielbailote-1998" target="_blank" class="author-contact">
                <span>💻</span>
                <span>github.com/danielbailote-1998</span>
              </a>
              <div class="author-contact non-link">
                <span>📍</span>
                <span>Évora, Portugal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.about-section { max-width: 1200px; margin: 0 auto; }

/* Cards */
.about-project-card { border-top: 3px solid #2d7a3a !important; }
.about-author-card  { border-top: 3px solid #1a5276 !important; }

/* Títulos */
.about-title { font-size: 1rem; color: #1a1a1a; letter-spacing: -0.01em; }

/* Descrição */
.about-desc { font-size: 0.82rem; color: #444; line-height: 1.55; }

/* Stats */
.about-stat {
  background: #f4f8f4;
  border: 1px solid #d5e8d4;
  border-radius: 8px;
  padding: 0.5rem 0.4rem;
  text-align: center;
}
.about-stat-value { font-size: 1.15rem; font-weight: 700; color: #2d7a3a; line-height: 1.1; }
.about-stat-label { font-size: 0.65rem; color: #666; margin-top: 1px; }

/* Tags */
.about-tag {
  display: inline-block;
  font-size: 0.68rem;
  background: #f0f7f1;
  color: #2d5a33;
  border: 1px solid #c8e0ca;
  border-radius: 20px;
  padding: 2px 9px;
}

/* Avatar autor */
.author-avatar {
  width: 46px; height: 46px;
  min-width: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a5276, #2d7a3a);
  color: #fff;
  font-weight: 700;
  font-size: 0.9rem;
  display: flex; align-items: center; justify-content: center;
  letter-spacing: 0.03em;
}

/* Badges autor */
.author-badge {
  font-size: 0.66rem;
  background: #eaf2fb;
  color: #1a4f72;
  border: 1px solid #b9d6ed;
  border-radius: 20px;
  padding: 1px 8px;
}

/* Contactos */
.author-contact {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.78rem; color: #333;
  text-decoration: none;
  padding: 5px 8px;
  border-radius: 7px;
  transition: background 0.15s;
}
.author-contact:hover:not(.non-link) {
  background: #f0f4f8;
  color: #1a5276;
}
.author-contact.non-link { cursor: default; }
</style>