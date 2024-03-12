import { DateTime } from "luxon";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import { Card } from "../components/Card";
import { FlexContainer } from "../components/FlexContainer";
import { Text } from "../components/Text";
import { CustomColorBar } from "../components/CustomColorBar";

type SessionsCardProps = {
  sessions: {
    startTime: DateTime<true>;
    endTime: DateTime<true>;
    location: string;
    ascents: {
      grade: string;
      count: number;
    }[];
  }[];
};

export const SessionsCard = ({ sessions }: SessionsCardProps) => {
  return (
    <Card style={{ flexGrow: 1 }}>
      <Text bold title>
        Last 10 sessions
      </Text>
      {sessions
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
              style={{ padding: "12px", flexWrap: "wrap" }}
            >
              <FlexContainer
                style={{
                  flexDirection: "column",
                  minWidth: 200,
                  flexGrow: 1,
                }}
              >
                <Text>{timestampString}</Text>
                <Text>{session.location}</Text>
                <Text>{`${duration.hours} hours ${Math.round(
                  duration.minutes
                )} minutes`}</Text>
              </FlexContainer>
              <FlexContainer
                style={{
                  flexGrow: 1,
                  minWidth: "50%",
                }}
              >
                <ResponsiveContainer minHeight={128}>
                  <BarChart data={session.ascents}>
                    <XAxis dataKey="grade" />
                    <YAxis width={20} />
                    <Bar
                      type="monotone"
                      dataKey="count"
                      shape={CustomColorBar}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </FlexContainer>
            </FlexContainer>
          );
        })}
    </Card>
  );
};
