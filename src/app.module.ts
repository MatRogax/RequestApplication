import { Module } from '@nestjs/common';
import { CustomerController } from './modules/customer/controllers/customer.controller';
import { ProductsController } from './modules/product/controllers/product.controller';
import { CategoryController } from './modules/category/category.controller';
import { CartController } from './modules/cart/cart.controller';
import { OrderController } from './modules/order/order.controller';
import { AdminController } from './modules/admin/admin.controller';

@Module({
  imports: [],
  controllers: [ProductsController, CustomerController, CategoryController, CartController, OrderController, AdminController],
  providers: [],
})

export class AppModule { }
