import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Bar,
  Line,
  Legend,
} from "recharts";
import { Card } from "../components/Card";
import { FlexContainer } from "../components/FlexContainer";
import { Text } from "../components/Text";
import { allMonthlySessions } from "../testData";
import { useEffect, useState } from "react";
import { useApi, ResponseType } from "../useApi";

export const MonthlyAscentsCard = () => {
  const [monthlyAscentsResponse, setMonthlyAscentsResponse] =
    useState<ResponseType>({ status: "initial" });
  const apiResponse = import.meta.env.VITE_GH_BUILD
    ? { status: "fetched", data: allMonthlySessions }
    : useApi(`${import.meta.env.VITE_SERVER_URL}/statistics/totalSessions`);

  useEffect(() => {
    setMonthlyAscentsResponse(apiResponse);
  }, [apiResponse]);

  if (
    monthlyAscentsResponse.status === "initial" ||
    monthlyAscentsResponse.status === "fetching"
  )
    return (
      <Card>
        <Text>Loading</Text>
      </Card>
    );
  else if (
    monthlyAscentsResponse.status === "fetched" &&
    !monthlyAscentsResponse.error &&
    monthlyAscentsResponse.data
  )
    return (
      <Card>
        <FlexContainer style={{ flexDirection: "column" }}>
          <Text bold title>
            Sessions this year
          </Text>
          <ResponsiveContainer minHeight={150}>
            <ComposedChart data={monthlyAscentsResponse.data}>
              <XAxis dataKey="month" height={18} />
              <YAxis width={20} yAxisId="left" orientation="left" />
              <YAxis width={30} yAxisId="right" orientation="right" />
              <Bar
                yAxisId="left"
                type="monotone"
                dataKey="count"
                fill="#E7C300"
              />
              <Line yAxisId="right" type="monotone" dataKey="duration" />
              <Legend verticalAlign="bottom" height={24} />
            </ComposedChart>
          </ResponsiveContainer>
        </FlexContainer>
      </Card>
    );
  else
    return (
      <Card>
        <Text>There was an error loading yearly session stats</Text>
      </Card>
    );
};
