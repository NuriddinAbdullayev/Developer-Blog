import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  const config = new DocumentBuilder()
  .setTitle("Developer-Blog API")
  .setDescription("Backend API documentation")
  .setVersion("1.0")
  .addBearerAuth()
  .build()

  const document = SwaggerModule
    .createDocument(app, config)

  SwaggerModule.setup("api", app, document)

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    `Server running on http://localhost:${process.env.PORT ?? 3000}`,
  );

  console.log(
    `Swagger: http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}
await bootstrap();