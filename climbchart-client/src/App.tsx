import { Rectangle } from "recharts";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import "react-date-picker/dist/DatePicker.css";

import { Card } from "./components/Card";
import { FlexContainer } from "./components/FlexContainer";
import { Text } from "./components/Text";
import addIconUrl from "../assets/add.svg";
import {
  ascentsByGradeThisMonth,
  climbingDaysThisMonth,
  sessionData,
} from "./testData";
import { MonthlySessionsCard } from "./cards/MonthlySessionsCard";
import { CalendarCard } from "./cards/CalendarCard";
import { MonthlySendsCard } from "./cards/MonthlySendsCard";
import { SessionsCard } from "./cards/SessionsCard";
import { AddModal } from "./AddModal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <FlexContainer
        style={{
          flexDirection: "column",
          padding: "16px",
          maxWidth: 1280,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Card>
          <Text bold title>
            Climb Chart
          </Text>
        </Card>
        <MonthlySessionsCard />
        <FlexContainer style={{ flexWrap: "wrap" }}>
          <MonthlySendsCard ascentsByGradeThisMonth={ascentsByGradeThisMonth} />
          <CalendarCard coloredDays={climbingDaysThisMonth} />
        </FlexContainer>
        <SessionsCard sessions={sessionData} />
      </FlexContainer>
      <div
        style={{
          position: "fixed",
          margin: 16,
          padding: 16,
          bottom: 0,
          right: 0,
          borderRadius: 8,
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 4px rgb(0 0 0 / 0.2)",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <img src={addIconUrl} />
      </div>
      <AddModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

//@ts-ignore
const CustomColorBar = (props) => {
  const gradeColors = {
    "3": "#66B572",
    "4": "#66B572",
    "5": "#E7C300",
    "5+": "#E7C300",
    "6a": "#4069A7",
    "6a+": "#4069A7",
    "6b": "#4069A7",
    "6b+": "#FF9533",
    "6c": "#FF9533",
    "6c+": "#FF9533",
    "7a": "#FF9533",
    "7a+": "#C62D37",
    "7b": "#C62D37",
    "7b+": "#C62D37",
  };

  //@ts-ignore
  return <Rectangle {...props} fill={gradeColors[props.grade]} />;
};

export default App;
