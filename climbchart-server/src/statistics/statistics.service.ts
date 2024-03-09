import { Info } from 'luxon';
import { Injectable } from '@nestjs/common';
import { TotalSessionsDto } from 'src/dto/total-sessions';

@Injectable()
export class StatisticsService {
  totalSessions(): TotalSessionsDto[] {
    return allMonthlySessions;
  }

  findOne(id: number) {
    return `This action returns a #${id} statistic`;
  }

  remove(id: number) {
    return `This action removes a #${id} statistic`;
  }
}

export const allMonthlySessions = Info.months('short').map((month) => {
  return {
    month,
    count: Math.round(Math.random() * 10 + 10),
    duration: Math.round(Math.random() * 210 + 30),
  };
});
