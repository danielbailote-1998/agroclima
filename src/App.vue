<script setup>
import { ref } from 'vue'
import InfoCards  from './components/InfoCards.vue'
import WeatherCard from './components/WeatherCard.vue'
import CropCard   from './components/CropCard.vue'
import AboutCard  from './components/AboutCard.vue'

const previsaoDia  = ref(null)
const avisos       = ref([])
const distritoNome = ref('')
const observacao   = ref(null)
</script>

<template>
  <!-- ── Navbar ── -->
  <nav class="navbar navbar-expand-md app-navbar px-3 px-md-4">
    <div class="container-fluid px-0">
      <span class="navbar-brand d-flex align-items-center gap-2 mb-0">
        <span class="brand-icon">🌿</span>
        <span class="brand-name">AgroClima</span>
        <span class="brand-sub d-none d-sm-inline">Monitorização Agrícola</span>
      </span>
      <div class="d-flex align-items-center gap-2">
        <span class="navbar-badge">Feito por Daniel Bailote</span>
      </div>
    </div>
  </nav>

  <!-- ── Hero / Info Cards ── -->
  <div class="hero-strip py-3 px-3 px-md-4">
    <div class="app-container">
      <!-- Contexto de localização se já há distrito selecionado -->
      <div v-if="distritoNome" class="d-flex align-items-center gap-2 mb-2">
        <span class="location-pill">📍 {{ distritoNome }}</span>
        <span class="location-pill-sub">Dados IPMA em tempo real</span>
      </div>
      <InfoCards :previsaoDia="previsaoDia" :observacao="observacao" />
    </div>
  </div>

  <!-- ── Main content ── -->
  <div class="app-container px-3 px-md-4 py-3">

    <!-- Linha 1: WeatherCard + CropCard -->
    <div class="row g-3 mb-3">
      <WeatherCard
        @update:previsaoDia="previsaoDia = $event"
        @update:avisos="avisos = $event"
        @update:distritoNome="distritoNome = $event"
        @update:observacao="observacao = $event"
      />
      <CropCard
        :previsaoDia="previsaoDia"
        :avisos="avisos"
        :distrito="distritoNome"
      />
    </div>

    <!-- Linha 2: Sobre o Projeto + Autor -->
    <AboutCard />

    <!-- Footer -->
    <footer class="app-footer text-center py-3 mt-2">
      <span>AgroClima © {{ new Date().getFullYear() }} · Daniel Bailote </span>
    </footer>
  </div>
</template>

<style>
/* ── Reset & base ── */
*, *::before, *::after { box-sizing: border-box; }
body {
  background: #f1f5f2;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  font-size: 14px;
  color: #1a1a1a;
  margin: 0;
}

/* ── Layout ── */
.app-container { max-width: 1200px; margin: 0 auto; }

/* ── Navbar ── */
.app-navbar {
  background: #fff;
  border-bottom: 1px solid #e0e8e1;
  padding-top: 0.55rem;
  padding-bottom: 0.55rem;
  position: sticky; top: 0; z-index: 100;
}
.brand-icon { font-size: 1.2rem; }
.brand-name {
  font-size: 1rem; font-weight: 700; color: #1a4a22;
  letter-spacing: -0.01em;
}
.brand-sub {
  font-size: 0.72rem; color: #6b8f72;
  border-left: 1px solid #c8ddc8; margin-left: 6px; padding-left: 8px;
}
.navbar-badge {
  font-size: 0.68rem; color: #3a6b42;
  background: #e8f4e9; border: 1px solid #c5dfc6;
  border-radius: 20px; padding: 2px 10px;
}

/* ── Hero strip ── */
.hero-strip {
  background: linear-gradient(135deg, #1e4d28 0%, #2d7a3a 60%, #3a8f47 100%);
}

/* Location pill */
.location-pill {
  font-size: 0.75rem; font-weight: 600; color: #fff;
  background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.3);
  border-radius: 20px; padding: 2px 10px;
}
.location-pill-sub {
  font-size: 0.68rem; color: rgba(255,255,255,0.7);
}

/* ── InfoCards override: branco sobre verde ── */
.hero-strip .card {
  background: rgba(255,255,255,0.96) !important;
  border: none !important;
}

/* ── Footer ── */
.app-footer {
  font-size: 0.65rem; color: #7a8f7e;
  border-top: 1px solid #dde8de;
}
</style>