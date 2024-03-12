import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import { Card } from "../components/Card";
import { FlexContainer } from "../components/FlexContainer";
import { Text } from "../components/Text";
import { CustomColorBar } from "../components/CustomColorBar";

type MonthlySendsCardProps = {
  ascentsByGradeThisMonth: { grade: string; count: number }[];
};

export const MonthlySendsCard = ({
  ascentsByGradeThisMonth,
}: MonthlySendsCardProps) => {
  return (
    <Card style={{ flexGrow: 2, display: "flex" }}>
      <FlexContainer style={{ flexDirection: "column", flex: 1 }}>
        <Text bold title>
          Sends this month
        </Text>
        <ResponsiveContainer minHeight={150} style={{ flex: 1 }}>
          <BarChart
            data={ascentsByGradeThisMonth.filter(
              (ascent) => ascent.count !== 0
            )}
          >
            <XAxis dataKey="grade" />
            <YAxis width={20} />
            <Bar type="monotone" dataKey="count" shape={CustomColorBar} />
          </BarChart>
        </ResponsiveContainer>
      </FlexContainer>
    </Card>
  );
};
