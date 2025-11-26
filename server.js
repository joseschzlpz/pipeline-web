const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hola Mundo Gigante</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: Arial, sans-serif;
            }
            .hola-mundo {
                font-size: 8rem;
                font-weight: bold;
                color: white;
                text-align: center;
                text-shadow: 4px 4px 8px rgba(0,0,0,0.3);
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            .info {
                position: absolute;
                bottom: 20px;
                color: white;
                text-align: center;
                font-size: 1rem;
            }
        </style>
    </head>
    <body>
        <div class="hola-mundo">¡HOLA MUNDO!</div>
        <div class="info">
            Node.js App running on port ${PORT}<br>
            Commit: ${process.env.GIT_COMMIT || 'Local'}
        </div>
    </body>
    </html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    commit: process.env.GIT_COMMIT || 'unknown'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ejecutándose en http://0.0.0.0:${PORT}`);
  console.log(`📊 Health check disponible en http://0.0.0.0:${PORT}/health`);
});
