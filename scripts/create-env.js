const fs = require('fs');

const ENV = [
    '# Llave API (v3 auth)',
    `API_KEY=${process.env.API_KEY}\n`,
    '# Token de acceso de lectura a la API (v4 auth)',
    `API_TOKEN=${process.env.API_TOKEN}\n`,
].join('\n');

fs.writeFileSync('./.ENV', ENV);
