import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaService } from '@app/common';

@Module({
  imports: [PrismaService],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
