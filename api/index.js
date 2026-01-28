const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const { ValidationPipe } = require('@nestjs/common');
const express = require('express');

let app;
let bootstrapError = null;

async function bootstrap() {
  if (bootstrapError) {
    throw bootstrapError;
  }

  if (app) {
    return app;
  }

  try {
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
  } catch (error) {
    bootstrapError = error;
    console.error('Bootstrap error:', error);
    throw error;
  }
}

module.exports = async (req, res) => {
  try {
    const expressApp = await bootstrap();
    expressApp(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined,
    });
  }
};
