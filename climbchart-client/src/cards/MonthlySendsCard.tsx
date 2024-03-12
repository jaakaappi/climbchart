import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Rectangle,
} from "recharts";
import { Card } from "../components/Card";
import { FlexContainer } from "../components/FlexContainer";
import { Text } from "../components/Text";

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
