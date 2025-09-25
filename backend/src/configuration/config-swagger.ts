import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import type { ApiConfigService } from '../shared/services/api-config.service';

export function configureSwagger(
  app: INestApplication,
  configService: ApiConfigService,
) {
  if (configService.enableSwagger) {
    const config = new DocumentBuilder()
      .setTitle('Event Management')
      .setDescription('Event Management API')
      .setVersion('1.0')
      .addTag('api')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }
}
