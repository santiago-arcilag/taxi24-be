const serverlessExpress = require('@vendia/serverless-express');
const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');
const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');

let cachedServer;

async function bootstrap() {
  if (cachedServer) {
    return cachedServer;
  }

  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  const { AppModule } = require('../dist/app.module');
  const app = await NestFactory.create(AppModule, adapter);

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Taxi24 API')
    .setDescription('API documentation for Taxi24 backend test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.init();

  cachedServer = serverlessExpress({ app: expressApp });
  return cachedServer;
}

module.exports = async (req, res) => {
  const server = await bootstrap();
  return server(req, res);
};
