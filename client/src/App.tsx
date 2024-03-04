import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Rectangle,
} from "recharts";
import { Card } from "./Card";
import { FlexContainer } from "./FlexContainer";
import { Text } from "./Text";
import "react-calendar/dist/Calendar.css";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import "react-date-picker/dist/DatePicker.css";
import addIconUrl from "../assets/add.svg";
import closeIconUrl from "../assets/close.svg";
import { useMemo, useState } from "react";
import { v4 } from "uuid";
import { DateTime, Duration, Info } from "luxon";
import { Calendar } from "./Calendar";

const grades = [
  "3",
  "4",
  "5",
  "5+",
  "6a",
  "6a+",
  "6b",
  "6b+",
  "6c",
  "6c+",
  "7a",
  "7a+",
  "7b",
  "7b+",
] as const;

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

const gyms = [
  "TK Nekala",
  "TK Lielahti",
  "Kiipeilyareena Ristikko",
  "Kiipeilyareena Salmisaari",
  "Kiipeilyareena Kalasatama",
];

type Ascent = {
  id: string;
  grade: string;
};

type Session = {
  startTime: DateTime;
  endTime: DateTime;
  ascents: Ascent[];
};

const ascentsByGradeThisMonth = grades.map((grade) => {
  return {
    grade,
    count: Math.round(Math.random() * 10 + 1),
  };
});

const allMonthlySessions = Info.months("short").map((month) => {
  return {
    month,
    count: Math.round(Math.random() * 10 + 10),
  };
});

const sessionData = Array.from({ length: 12 })
  .map((_) => {
    const startTime = DateTime.now().minus({
      minutes: Math.round(Math.random() * 60 * 24 * 365),
    });
    const endTime = startTime.plus({
      minutes: Math.round(Math.random() * 210 + 30),
    });

    return {
      startTime,
      endTime,
      ascents: grades.map((grade) => {
        return { grade, count: Math.round(Math.random() * 10) };
      }),
    };
  })
  .sort((a, b) => a.startTime.toUnixInteger() - b.startTime.toUnixInteger());

const climbingDaysThisMonth = sessionData.map(
  (session) => session.startTime.day
);

const App = () => {
  // Main view
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal
  const [newAscents, setNewAscents] = useState<Ascent[]>([]);

  const newAscentsByGrade = useMemo<{ [key: string]: number }>(
    () =>
      newAscents.reduce(
        (previous, currentAscent) => ({
          ...previous,
          [currentAscent.grade]: previous[currentAscent.grade] + 1,
        }),
        Object.fromEntries(grades.map((grade) => [grade, 0]))
      ),
    [newAscents]
  );

  const handleAscentAdded = (grade: string) => {
    setNewAscents([...newAscents, { id: v4(), grade: grade }]);
  };

  const handleAscentRemoved = (grade: string) => {
    if (newAscentsByGrade[grade] > 0) {
      const newAscentsCopy = [...newAscents];
      newAscentsCopy.splice(
        newAscents.findIndex((ascent) => ascent.grade === grade),
        1
      );
      setNewAscents([...newAscentsCopy]);
    }
  };

  //@ts-ignore
  const CustomColorBar = (props) => {
    //@ts-ignore
    return <Rectangle {...props} fill={gradeColors[props.grade]} />;
  };

  // const renderCalendarTileContent = ({ date }: { date: Date }) => {
  //   if (
  //     sessionDayTree[date.getFullYear()]?.[date.getMonth()].includes(
  //       date.getDate()
  //     )
  //   )
  //     return "climbedTile";
  //   else return "dayTile";
  // };

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
          <Text>Climb Chart</Text>
        </Card>
        <Card style={{ flexGrow: 1 }}>
          <FlexContainer style={{ flexDirection: "column" }}>
            <Text>Sessions this year</Text>
            <ResponsiveContainer height={320}>
              <BarChart
                data={allMonthlySessions}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Bar type="monotone" dataKey="count" fill="#E7C300" />
              </BarChart>
            </ResponsiveContainer>
          </FlexContainer>
        </Card>
        <FlexContainer style={{ flexWrap: "wrap" }}>
          <Card style={{ flex: 1 }}>
            <FlexContainer style={{ flexDirection: "column" }}>
              <Text>Sends this month</Text>
              <ResponsiveContainer height={320}>
                <BarChart
                  data={ascentsByGradeThisMonth}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Bar type="monotone" dataKey="count" shape={CustomColorBar} />
                </BarChart>
              </ResponsiveContainer>
            </FlexContainer>
          </Card>
          <Card style={{ maxWidth: "fit-content" }}>
            <FlexContainer style={{ flexDirection: "column" }}>
              <Text>Session calendar</Text>
              <Calendar
                year={DateTime.now().year}
                month={DateTime.now().month}
                coloredDays={climbingDaysThisMonth}
              />
            </FlexContainer>
          </Card>
        </FlexContainer>
        <Card style={{ flexGrow: 1 }}>
          <Text>Last 10 sessions</Text>
          {sessionData
            .slice(-11, -1)
            .reverse()
            .map((session) => {
              const timestampString = session.startTime.hasSame(
                DateTime.local(),
                "day"
              )
                ? "Today"
                : session.startTime.hasSame(
                    DateTime.local().minus({ day: 1 }),
                    "day"
                  )
                ? "Yesterday"
                : session.startTime.toFormat("dd.MM.yyyy HH:mm");

              const duration = session.endTime.diff(session.startTime, [
                "hours",
                "minutes",
              ]);

              return (
                <FlexContainer style={{ padding: "12px" }}>
                  <Text>{`${timestampString} - ${
                    duration.hours
                  } hours ${Math.round(duration.minutes)} minutes`}</Text>
                  <ResponsiveContainer height={160}>
                    <BarChart
                      data={session.ascents}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Bar
                        type="monotone"
                        dataKey="count"
                        shape={CustomColorBar}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </FlexContainer>
              );
            })}
        </Card>
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
      <div
        style={{
          display: isModalOpen ? "inline-flex" : "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <FlexContainer
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 8px rgb(0 0 0 / 0.4)",
            borderRadius: 8,
            flexDirection: "column",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 72,
            padding: 16,
            height: "fit-content",
            alignItems: "stretch",
          }}
        >
          <FlexContainer
            style={{
              justifyContent: "space-between",
            }}
          >
            <Text>Add new session</Text>
            <div onClick={() => setIsModalOpen(false)}>
              <img src={closeIconUrl} />
            </div>
          </FlexContainer>
          <FlexContainer>
            <Text>Gym / outdoor area</Text>
            <select>
              {gyms.map((gym) => (
                <option key={gym} value={gym.replace(" ", "").toLowerCase()}>
                  {gym}
                </option>
              ))}
            </select>
          </FlexContainer>
          <FlexContainer>
            <Text>Session date and time</Text>
            <Text>Start</Text>
            <input type="datetime-local" />
            <Text>End</Text>
            <input type="time" />
          </FlexContainer>
          <FlexContainer>
            <div style={{ flex: 0.5 }}>
              <Text>Climbed routes</Text>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "0.25fr 0.25fr 0.25fr 0.25fr",
                columnGap: 8,
                rowGap: 8,
                flex: 0.5,
              }}
            >
              {Object.entries(newAscentsByGrade).map(([grade, count]) => (
                <>
                  <Text>{grade}</Text>
                  <button onClick={() => handleAscentRemoved(grade)}>-</button>
                  <Text>{count}</Text>
                  <button onClick={() => handleAscentAdded(grade)}>+</button>
                </>
              ))}
            </div>
          </FlexContainer>
          <FlexContainer style={{ justifyContent: "space-between" }}>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button>Save</button>
          </FlexContainer>
        </FlexContainer>
      </div>
    </>
  );
};

const sortAscentsToGrades = (ascents: Ascent[]) => {};

export default App;
