import { DateTime, DayNumbers } from "luxon";
import { Calendar } from "../components/Calendar";
import { Card } from "../components/Card";
import { FlexContainer } from "../components/FlexContainer";
import { Text } from "../components/Text";

type CalendarCardProps = {
  coloredDays: DayNumbers[];
};

export const CalendarCard = ({ coloredDays }: CalendarCardProps) => {
  return (
    <Card style={{ flexGrow: 1 }}>
      <FlexContainer
        style={{ flexDirection: "column", alignItems: "center", gap: 8 }}
      >
        <Text bold title>
          Session calendar
        </Text>
        <Calendar
          year={DateTime.now().year}
          month={DateTime.now().month}
          coloredDays={coloredDays}
        />
      </FlexContainer>
    </Card>
  );
};
