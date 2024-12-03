import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './base/modules/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        errorHttpStatusCode: 422,
      }),
    );


    const config = new DocumentBuilder()
      .setTitle('E-commerce API')
      .setDescription('API para gerenciamento do e-commerce de supermercado')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    // Inicialização do servidor
    const port = 3000;
    await app.listen(port);
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    console.log(`📖 Documentação disponível em http://localhost:${port}/api-docs`);
  } catch (error) {
    console.error('❌ Erro ao iniciar a aplicação', error);
    process.exit(1);
  }
}

bootstrap();
