import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics/statistics.controller';
import { StatisticsService } from './statistics/statistics.service';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [StatisticsModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class AppModule {}
