// Acordeón mejorado con animaciones suaves
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los acordeones
    const acordeones = document.querySelectorAll('.acordeon');
    
    acordeones.forEach((acordeon) => {
      acordeon.addEventListener('click', function() {
        // Toggle la clase activo para el estilo
        this.classList.toggle('activo');
        
        // Obtener el panel asociado al acordeón
        const panel = this.nextElementSibling;
        
        // Si está abierto, cerrarlo
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          // Si está cerrado, abrirlo y establecer la altura máxima
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
        
        // Cerrar otros paneles (efecto acordeón)
        acordeones.forEach((otroAcordeon) => {
          if (otroAcordeon !== this) {
            otroAcordeon.classList.remove('activo');
            const otroPanel = otroAcordeon.nextElementSibling;
            otroPanel.style.maxHeight = null;
          }
        });
      });
    });
    
    // Abrir la sección que está en la URL al cargar la página
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const targetAcordeon = document.getElementById(targetId);
      
      if (targetAcordeon) {
        // Simular clic después de un breve retraso para permitir que la página se cargue
        setTimeout(() => {
          targetAcordeon.click();
          // Desplazar suavemente a la sección
          targetAcordeon.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  
    // Navegación suave para los enlaces del menú
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Desplazarse suavemente a la sección
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Compensar la altura del encabezado
            behavior: 'smooth'
          });
          
          // Abrir el acordeón después de desplazarse
          setTimeout(() => {
            if (!targetElement.classList.contains('activo')) {
              targetElement.click();
            }
          }, 500);
          
          // Actualizar la URL sin recargar la página
          history.pushState(null, null, `#${targetId}`);
        }
      });
    });
  });