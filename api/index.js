const serverlessExpress = require('@vendia/serverless-express');
const express = require('express');

let cachedServer;

async function bootstrap() {
  if (cachedServer) {
    return cachedServer;
  }

  // Import the compiled NestJS app
  const { NestFactory } = require('@nestjs/core');
  const { ExpressAdapter } = require('@nestjs/platform-express');
  const { ValidationPipe } = require('@nestjs/common');
  const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');
  const { AppModule } = require('../dist/app.module');

  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  const app = await NestFactory.create(AppModule, adapter, {
    logger: ['error', 'warn', 'log'],
  });

  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Enable validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Taxi24 API')
    .setDescription('API documentation for Taxi24 backend test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.init();

  cachedServer = serverlessExpress({ app: expressApp });
  return cachedServer;
}

module.exports = async (req, res) => {
  const server = await bootstrap();
  return server(req, res);
};
