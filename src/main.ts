import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { BaseAPIDocument } from './document/swagger.document';
import helmet from 'helmet';

function disableUpgradeInsecureRequests(app, helmet) {
  const defaultDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();
  delete defaultDirectives['upgrade-insecure-requests'];

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        ...defaultDirectives,
      },
    }),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  disableUpgradeInsecureRequests(app, helmet);

  const config = new BaseAPIDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
  await app.listen(3001);
}
bootstrap();
