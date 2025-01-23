import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as functions from 'firebase-functions';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const server = express();

const createNestServer = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));

  const isLocal = process.env.NODE_ENV === 'development'; // Set NODE_ENV to 'development' for local, 'production' for Firebase Cloud

  // Define the dynamic base URL for Swagger
  const baseURL = isLocal
    ? 'http://127.0.0.1:5001/my-tasks-qa/us-central1/api' // Firebase local emulator URL
    : `https://${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com/us-central1/api`;

  const config = new DocumentBuilder()
    .setTitle('My-Tasks API')
    .setDescription('API documentation for the My-Tasks API')
    .setVersion('1.0')
    .setBasePath('/my-tasks-qa/us-central1/api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.servers = [
    {
      url: baseURL,
      description: 'Local Firebase emulator server',
    },
  ];
  SwaggerModule.setup('api-docs', app, document);

  await app.init();
};

createNestServer(server);

export const api = functions.https.onRequest(server);
