/**
 * Portofolio Digital - Muzamil Habibi
 * Power Plant Engineer | Operation, Maintenance & Renewable Energy
 * Interactive Engine:
 * 1. Mobile Navigation & Drawer Overlay
 * 2. Header Scroll Effect & Active Section Tracking
 * 3. Engineering Telemetry & Spec Console Widget
 * 4. Project Category Filter
 * 5. One-Click Copy Email & Telemetry JSON
 * 6. Contact Form Email Launcher
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Mobile Navigation & Overlay ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('active', isOpen);
    mobileOverlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    navMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // --- 2. Header Scroll Effect & Active Section Spy ---
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Header blur/solid background
    if (scrollPos > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // --- 3. Engineering Telemetry & Spec Console Widget ---
  const specTabs = document.querySelectorAll('.api-tab');
  const specFileName = document.getElementById('specFileName');
  const telemetryDataContent = document.getElementById('telemetryDataContent');
  const btnCopyTelemetry = document.getElementById('btnCopyTelemetry');

  const telemetrySpecs = {
    turbine: {
      file: 'turbine_shaft_blade.dwg.json',
      data: {
        subsystem: "Steam & Gas Turbine Assembly",
        components: [
          "Turbine Blades (Sudu)",
          "Main Rotor Shaft (Poros)"
        ],
        projection_standard: "Third Angle Projection (ISO/DIN)",
        drafting_tools: ["AutoCAD", "SolidWorks 3D"],
        maintenance_scope: [
          "Geometry & tolerance verification",
          "Clearance inspection against vibration",
          "Orthographic fabrication reference"
        ],
        operational_focus: "High rotational integrity & thermal expansion tolerancing"
      }
    },
    power: {
      file: 'linear_psu_78xx_module.kicad_sch.json',
      data: {
        circuit_module: "Triple-Rail Linear Regulated Power Supply",
        design_eda: "KiCad EDA",
        topology: "Full-Wave Rectifier + Low-ESR Capacitive Ripple Filter",
        voltage_rails: {
          V1: "+5V DC (Digital logic / MCU controller)",
          V2: "+9V DC (Auxiliary subsystems & signal conditioning)",
          V3: "+12V DC (Field transducers & analog sensor loop)"
        },
        regulator_ics: ["LM7805", "LM7809", "LM7812"],
        pcb_layout: "Isolated analog ground plane with enhanced thermal trace width"
      }
    },
    thermal: {
      file: 'energy_efficiency_sim.py.json',
      data: {
        toolchain: ["Python 3.x", "Microsoft Excel", "Mermaid.js"],
        thermodynamic_cycle: "Rankine & Brayton Cycle Efficiency Calculator",
        governing_formulas: [
          "η_thermal = (W_turbine - W_pump) / Q_in",
          "Crystal density calculation: ρ = (n * M) / (V_c * N_A)"
        ],
        logic_engine: "Multi-conditional validation for safe operating margins",
        visualization: "Mermaid.js energy flow diagram & heat recovery loop"
      }
    }
  };

  specTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      specTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const specKey = tab.getAttribute('data-spec');
      const currentSpec = telemetrySpecs[specKey];

      if (currentSpec && telemetryDataContent && specFileName) {
        specFileName.textContent = currentSpec.file;
        telemetryDataContent.textContent = JSON.stringify(currentSpec.data, null, 2);
      }
    });
  });

  // Copy Telemetry Spec JSON
  if (btnCopyTelemetry) {
    btnCopyTelemetry.addEventListener('click', () => {
      const codeToCopy = telemetryDataContent ? telemetryDataContent.textContent : '';
      navigator.clipboard.writeText(codeToCopy).then(() => {
        const originalHtml = btnCopyTelemetry.innerHTML;
        btnCopyTelemetry.innerHTML = '<span style="color:#00d2ff; font-size:11px; font-weight:700;">Tersalin!</span>';
        setTimeout(() => {
          btnCopyTelemetry.innerHTML = originalHtml;
        }, 1800);
      }).catch(err => {
        console.error('Gagal menyalin:', err);
      });
    });
  }

  // --- 4. Project Category Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCategory === filterVal) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --- 5. One-Click Copy Email Address ---
  const btnCopyEmail = document.getElementById('btnCopyEmail');
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      const email = 'muzamilhabibi079@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        btnCopyEmail.textContent = 'Tersalin!';
        btnCopyEmail.style.background = '#00d2ff';
        btnCopyEmail.style.color = '#030d1a';
        setTimeout(() => {
          btnCopyEmail.textContent = 'Salin';
          btnCopyEmail.style.background = '';
          btnCopyEmail.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Gagal menyalin email:', err);
      });
    });
  }

  // --- 6. Quick Contact Email Form ---
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const subject = document.getElementById('senderSubject').value.trim();
      const message = document.getElementById('senderMessage').value.trim();

      const fullSubject = encodeURIComponent(`[Portofolio Inquiry] ${subject} - ${name}`);
      const fullBody = encodeURIComponent(`Halo Muzamil Habibi,\n\nNama/Perusahaan: ${name}\n\nPesan:\n${message}\n\n---\nDikirim melalui Formulir Portofolio Digital`);

      const mailtoUrl = `mailto:muzamilhabibi079@gmail.com?subject=${fullSubject}&body=${fullBody}`;

      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = '✓ Membuka aplikasi email Anda untuk mengirim pesan...';
      }

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 400);
    });
  }

});
