document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    
    // Comprobar preferencia del sistema
    const prefiereDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Aplicar el tema guardado en localStorage o usar la preferencia del sistema
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark" || (savedTheme === null && prefiereDarkMode)) {
      body.classList.add("dark");
      themeToggle.checked = true;
    }
    
    // Cambiar el tema cuando se hace clic en el switch
    themeToggle.addEventListener("change", function() {
      // Añadir animación de transición
      body.style.transition = "background-color 0.5s ease, color 0.5s ease";
      
      // Cambiar la clase
      body.classList.toggle("dark");
      
      // Guardar preferencia
      if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        
        // Animar el logotipo en modo oscuro
        animateLogoForDarkMode();
      } else {
        localStorage.setItem("theme", "light");
        
        // Restaurar el logotipo en modo claro
        animateLogoForLightMode();
      }
      
      // Eliminar la transición después de completarla
      setTimeout(() => {
        body.style.transition = "";
      }, 500);
    });
    
    // Animar el logotipo al cambiar el tema
    function animateLogoForDarkMode() {
      const logo = document.querySelector('.logo');
      if (logo) {
        logo.style.transition = "transform 0.5s ease";
        logo.style.transform = "rotate(360deg)";
        
        setTimeout(() => {
          logo.style.transform = "rotate(0deg)";
        }, 500);
      }
    }
    
    function animateLogoForLightMode() {
      const logo = document.querySelector('.logo');
      if (logo) {
        logo.style.transition = "transform 0.5s ease";
        logo.style.transform = "rotate(-360deg)";
        
        setTimeout(() => {
          logo.style.transform = "rotate(0deg)";
        }, 500);
      }
    }
    
    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem("theme")) {
        // Si el usuario no ha establecido una preferencia explícita
        if (e.matches) {
          body.classList.add("dark");
          themeToggle.checked = true;
        } else {
          body.classList.remove("dark");
          themeToggle.checked = false;
        }
      }
    });
  });
