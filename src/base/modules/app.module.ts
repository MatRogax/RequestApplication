import { AdminController } from '@controllers/admin.controller';
import { CartController } from '@controllers/cart.controller';
import { CategoryController } from '@controllers/category.controller';
import { OrderController } from '@controllers/order.controller';
import { ProductsController } from '@controllers/product.controller';
import { UserController } from '@controllers/user.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ProductsController, UserController, CategoryController, CartController, OrderController, AdminController],
  providers: [],
})

export class AppModule { }
