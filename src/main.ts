import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { INestApplication } from '@nestjs/common';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
class Main {
  private static instance: Main;

  private constructor() { }

  public static getInstance() {


    if (!Main.instance) {
      Main.instance = new Main();
    }
    return Main.instance;
  }

  public async initServer() {

    const app: INestApplication = await NestFactory.create(AppModule);
    // app.useGlobalFilters(new HttpExceptionFilter())
    // app.useGlobalPipes( new ValidationPipe());
    this.bootstrap(app);
    const port: number = 4080;
    
    await app.listen(port, () => {
      console.log("Server Listening On Port ", port)
    });
  }

  private bootstrap(app: INestApplication): void {
    app.use(cookieParser())
    this.initBodyParser(app);
    this.initSwagger(app);
  }



  private initBodyParser(app: INestApplication): void {

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
      extended: true,
      limit: "50mb",
    }));

    // parse application/json
    app.use(bodyParser.json({
      type: "application/json",
      limit: "100kb",
    }));

  }



  // async function bootstrap() {
  //   const app = await NestFactory.create(AppModule);
  //   app.use(cookieParser())
  //   const PORT = 4080;




  //   await app.listen(PORT);
  // }
  private initSwagger(app: INestApplication): void {

    const config = new DocumentBuilder()
      .setTitle('User & Document Management')
      .setDescription('API Description for the Project')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);

    const customOptions: SwaggerCustomOptions = {
      customSiteTitle: 'JK Tech',
    };

    SwaggerModule.setup('/api-doc', app, document, customOptions);
  }


}
const main = Main.getInstance();
main.initServer();

// bootstrap();
