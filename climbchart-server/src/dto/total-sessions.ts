export class TotalSessionsDto {
  /** Month the sessions are for */
  month: string;
  /** How many sessions in this month */
  count: number;
  /** How long the sessions were on average in minutes */
  duration: number;
}
