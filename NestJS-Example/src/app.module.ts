import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({ //decorator
  imports: [ProductsModule], // can import another module into another module, thats how we connect our app together
  controllers: [AppController], //they handle request and send back the response
  providers: [AppService], // extra classes which can inject into controllers to provide functionality (database service)
})
export class AppModule {}
