import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Rectangle,
  Line,
  ComposedChart,
} from "recharts";
import { useMemo, useState } from "react";
import { v4 } from "uuid";
import "react-calendar/dist/Calendar.css";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import "react-date-picker/dist/DatePicker.css";

import { DateTime } from "luxon";
import { Card } from "./components/Card";
import { FlexContainer } from "./components/FlexContainer";
import { Text } from "./components/Text";
import addIconUrl from "../assets/add.svg";
import closeIconUrl from "../assets/close.svg";
import { Calendar } from "./components/Calendar";
import {
  Ascent,
  grades,
  allMonthlySessions,
  ascentsByGradeThisMonth,
  climbingDaysThisMonth,
  sessionData,
  gyms,
} from "./testData";

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
        <Card style={{ flexGrow: 1 }}>
          <FlexContainer style={{ flexDirection: "column" }}>
            <Text bold title>
              Sessions this year
            </Text>
            <ResponsiveContainer height={320}>
              <ComposedChart data={allMonthlySessions}>
                <XAxis dataKey="month" />
                <YAxis
                  yAxisId="left"
                  label={{ value: "Count", angle: -90, position: "insideLeft" }}
                  orientation="left"
                />
                <YAxis
                  yAxisId="right"
                  label={{
                    value: "Duration",
                    angle: 90,
                    position: "insideRight",
                  }}
                  orientation="right"
                />
                <Bar
                  yAxisId="left"
                  type="monotone"
                  dataKey="count"
                  fill="#E7C300"
                />
                <Line yAxisId="right" type="monotone" dataKey="duration" />
              </ComposedChart>
            </ResponsiveContainer>
          </FlexContainer>
        </Card>
        <FlexContainer style={{ flexWrap: "wrap" }}>
          <Card style={{ flexGrow: 2 }}>
            <FlexContainer style={{ flexDirection: "column" }}>
              <Text bold title>
                Sends this month
              </Text>
              <ResponsiveContainer height={320}>
                <BarChart data={ascentsByGradeThisMonth}>
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Bar type="monotone" dataKey="count" shape={CustomColorBar} />
                </BarChart>
              </ResponsiveContainer>
            </FlexContainer>
          </Card>
          <Card style={{ flexGrow: 1 }}>
            <FlexContainer
              style={{ flexDirection: "column", alignItems: "center" }}
            >
              <Text bold title>
                Session calendar
              </Text>
              <Calendar
                year={DateTime.now().year}
                month={DateTime.now().month}
                coloredDays={climbingDaysThisMonth}
              />
            </FlexContainer>
          </Card>
        </FlexContainer>
        <Card style={{ flexGrow: 1 }}>
          <Text bold title>
            Last 10 sessions
          </Text>
          {sessionData
            .slice(-11, -1)
            .reverse()
            .map((session, index) => {
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
                <FlexContainer
                  key={`session-${index}`}
                  style={{ padding: "12px" }}
                >
                  <FlexContainer
                    style={{ flexDirection: "column", minWidth: "fit-content" }}
                  >
                    <Text>{timestampString}</Text>
                    <Text>{`${duration.hours} hours ${Math.round(
                      duration.minutes
                    )} minutes`}</Text>
                  </FlexContainer>
                  <ResponsiveContainer height={160}>
                    <BarChart data={session.ascents}>
                      <XAxis dataKey="grade" />
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
              {Object.entries(newAscentsByGrade).map(
                ([grade, count], index) => (
                  <div key={`grade-input-${index}`}>
                    <Text>{grade}</Text>
                    <button onClick={() => handleAscentRemoved(grade)}>
                      -
                    </button>
                    <Text>{count}</Text>
                    <button onClick={() => handleAscentAdded(grade)}>+</button>
                  </div>
                )
              )}
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
