import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder,SwaggerModule } from "@nestjs/swagger";
import * as session from "express-session";
import * as passport from "passport";

import { AppModule } from "./app.module";
import { loginSecret } from "./auth/constants";
import { memoryStore } from "./memory-store";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use(
    session({
      secret: loginSecret,
      resave: false,
      saveUninitialized: false,
      unset: "destroy",
      store: memoryStore,
      // TODO: should have secure cookies
      // cookie: {
      //   secure: app.get('env') === 'production',
      // },
    })
  );

  app.use(passport.initialize());
  // todo check this
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("PEPSI Machine")
    .setDescription("PEPSI API docs")
    .setVersion("1.0")
    .addBearerAuth()
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup("/docs", app, document);

  await app.listen(3000);
}
bootstrap();
