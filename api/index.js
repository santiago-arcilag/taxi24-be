const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const { ValidationPipe } = require('@nestjs/common');
const express = require('express');

let app;

async function bootstrap() {
  if (app) {
    return app;
  }

  const { AppModule } = require('../dist/app.module');

  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  const nestApp = await NestFactory.create(AppModule, adapter, {
    logger: ['error', 'warn', 'log'],
  });

  nestApp.enableCors({
    origin: true,
    credentials: true,
  });

  nestApp.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await nestApp.init();
  app = expressApp;
  return app;
}

module.exports = async (req, res) => {
  const expressApp = await bootstrap();
  expressApp(req, res);
};
