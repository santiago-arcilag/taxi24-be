import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';
import express, { Express } from 'express';
import { AppModule } from '../src/app.module';
import { Handler, Context, Callback } from 'aws-lambda';

let cachedServer: Handler;

async function bootstrap(): Promise<Handler> {
  if (cachedServer) {
    return cachedServer;
  }

  const expressApp: Express = express();
  const adapter = new ExpressAdapter(expressApp);

  const app = await NestFactory.create(AppModule, adapter, {
    logger: ['error', 'warn', 'log'],
  });

  // Enable CORS for Vercel
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Enable validation pipe (same as your controllers expect)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Taxi24 API')
    .setDescription('API documentation for Taxi24 backend test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.init();

  cachedServer = serverlessExpress({ app: expressApp });
  return cachedServer;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  // Optimize for serverless: don't wait for event loop to empty
  context.callbackWaitsForEmptyEventLoop = false;

  const server = await bootstrap();
  return server(event, context, callback);
};
