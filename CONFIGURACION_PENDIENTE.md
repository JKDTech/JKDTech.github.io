# 🔧 Configuración Pendiente - JKD Tech Portfolio

Este archivo contiene las configuraciones que necesitas completar manualmente con tus credenciales.

---

## 📊 1. Google Analytics 4 (GA4)

### Pasos para obtener tu ID de Google Analytics:

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una cuenta o inicia sesión
3. Crea una propiedad nueva:
   - Nombre: "JKD Tech Portfolio"
   - Zona horaria: Chile (GMT-4)
   - Moneda: CLP
4. Crea un flujo de datos web:
   - URL: `https://jkdtech.github.io`
   - Nombre: "Portfolio Website"
5. Copia el **ID de medición** que se ve así: `G-XXXXXXXXXX`

### Dónde configurarlo:

**Archivo:** `index.html`
**Líneas:** 71 y 76

Reemplaza ambas instancias de `G-XXXXXXXXXX` con tu ID real:

```javascript
// Línea 71
<script async src="https://www.googletagmanager.com/gtag/js?id=TU_ID_AQUI"></script>

// Línea 76
gtag('config', 'TU_ID_AQUI');
```

---

## 📧 2. EmailJS (Formulario de Contacto)

### Pasos para configurar EmailJS:

1. Ve a [EmailJS.com](https://www.emailjs.com/)
2. Crea una cuenta gratuita (500 emails/mes gratis)
3. Conecta tu servicio de email:
   - Gmail, Outlook, Yahoo, o cualquier SMTP
   - Sigue el wizard de configuración
4. Crea un **Email Template**:
   - Nombre: "Portfolio Contact Form"
   - Contenido sugerido:
   ```
   Nuevo mensaje de {{from_name}}

   Email: {{from_email}}
   Teléfono: {{phone}}
   Empresa: {{company}}
   Tipo de proyecto: {{project_type}}
   Presupuesto: {{budget}}

   Mensaje:
   {{message}}
   ```
5. Anota estos datos:
   - **Public Key:** Se encuentra en Account > General
   - **Service ID:** Se encuentra en Email Services
   - **Template ID:** Se encuentra en Email Templates

### Dónde configurarlo:

**Archivo 1:** `index.html` - Línea 1548
```javascript
emailjs.init("TU_PUBLIC_KEY_AQUI");
```

**Archivo 2:** `assets/js/main_moderno.js` - Línea 520
```javascript
emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', templateParams)
```

---

## 🧪 Cómo probar que funciona:

### Google Analytics:
1. Abre tu sitio web en un navegador
2. Ve a Google Analytics > Informes > Tiempo real
3. Deberías ver tu visita aparecer en tiempo real

### EmailJS:
1. Llena el formulario de contacto de tu sitio
2. Envía un mensaje de prueba
3. Verifica que recibiste el email
4. Verifica en EmailJS Dashboard > Email History

---

## ✅ Checklist de Configuración

- [ ] Google Analytics ID configurado en `index.html:71`
- [ ] Google Analytics ID configurado en `index.html:76`
- [ ] EmailJS Public Key en `index.html:1548`
- [ ] EmailJS Service ID en `assets/js/main_moderno.js:520`
- [ ] EmailJS Template ID en `assets/js/main_moderno.js:520`
- [ ] Probado Google Analytics (aparece visita en tiempo real)
- [ ] Probado formulario de contacto (email recibido)

---

## 💡 Notas Importantes

1. **Google Analytics es GRATIS** y siempre será gratuito para sitios pequeños
2. **EmailJS versión gratuita** permite 500 emails/mes (suficiente para un portfolio)
3. Ambos servicios requieren solo 5-10 minutos de configuración
4. Las credenciales son privadas, NO las compartas públicamente
5. Después de configurar, puedes eliminar este archivo si quieres

---

## 🆘 ¿Necesitas ayuda?

Si tienes problemas configurando:
- Google Analytics: https://support.google.com/analytics
- EmailJS: https://www.emailjs.com/docs/

¡Una vez configurado, tu portfolio estará 100% funcional! 🚀
