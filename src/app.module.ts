import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
