const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');
const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');

let app;

async function bootstrap() {
  if (app) {
    return app;
  }

  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  const { AppModule } = require('../dist/app.module');
  const nestApp = await NestFactory.create(AppModule, adapter);

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Taxi24 API')
    .setDescription('API documentation for Taxi24 backend test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(nestApp, config);
  SwaggerModule.setup('docs', nestApp, document);

  nestApp.enableCors();
  await nestApp.init();

  app = expressApp;
  return app;
}

module.exports = async (req, res) => {
  const expressApp = await bootstrap();
  expressApp(req, res);
};
