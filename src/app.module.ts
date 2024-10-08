import { Module } from '@nestjs/common';
import { CustomerController } from './modules/customer/controllers/customer.controller';
import { ProductsController } from './modules/product/controllers/product.controller';
import { CategoryController } from './modules/category/category.controller';
import { CartController } from './modules/cart/cart.controller';
import { OrderController } from './modules/order/order.controller';

@Module({
  imports: [],
  controllers: [ProductsController, CustomerController, CategoryController, CartController, OrderController],
  providers: [],
})

export class AppModule { }
