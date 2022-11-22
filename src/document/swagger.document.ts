import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocument {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle('방어잡이배 API Document')
      .setDescription('Dungeon & Sisters Mobile Api')
      .setVersion('1.0.0')
      .addTag('swagger')
      .addBearerAuth()
      .build();
  }
}
