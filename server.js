const express = require('express');
const f1 = require('f1-api-node');
const app = express();
const PORT = process.env.PORT || 3000;

// Servimos los archivos estáticos de la carpeta public
app.use(express.static('public'));

// Ruta dinámica para cualquier método disponible de la API
app.get('/api/:metodo', async (req, res) => {
  const metodo = req.params.metodo;

  // Comprueba si existe el método en la API
  if (typeof f1[metodo] !== 'function') {
    return res.status(404).json({ error: `Método '${metodo}' no encontrado.` });
  }

  try {
    const datos = await f1[metodo]();
    res.json(datos);
  } catch (error) {
    console.error('Error al obtener datos:', error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});





