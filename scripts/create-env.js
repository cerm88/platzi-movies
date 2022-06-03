const fs = require('fs');

const ENV = `API_KEY=${process.env.API_KEY}\nAPI_TOKEN=${process.env.API_TOKEN}\n`;

fs.writeFileSync('./.env', ENV);
