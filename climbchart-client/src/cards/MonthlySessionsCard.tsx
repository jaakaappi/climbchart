import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Bar,
  Line,
} from "recharts";
import { Card } from "../components/Card";
import { FlexContainer } from "../components/FlexContainer";
import { Text } from "../components/Text";
import { allMonthlySessions } from "../testData";
import { useEffect, useState } from "react";
import { useApi, ResponseType } from "../useApi";

export const MonthlySessionsCard = () => {
  const [monthlyAscentsResponse, setMonthlyAscentsResponse] =
    useState<ResponseType>({ status: "initial" });
  const apiResponse = import.meta.env.VITE_GH_BUILD
    ? { status: "fetched", data: allMonthlySessions }
    : useApi(`${import.meta.env.VITE_SERVER_URL}/statistics/totalSessions`);

  useEffect(() => {
    setMonthlyAscentsResponse(apiResponse);
  }, [apiResponse]);

  const isMobile = window.innerWidth <= window.innerHeight;

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
      <Card
        style={{ display: "flex", ...(!isMobile ? { minHeight: 300 } : {}) }}
      >
        <FlexContainer style={{ flexDirection: "column", flex: 1 }}>
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
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="duration"
                fill="#4069A7"
              />
            </ComposedChart>
          </ResponsiveContainer>
          <FlexContainer style={{ justifyContent: "center" }}>
            <Text style={{ color: "#E7C300" }}>Count (bars)</Text>
            <Text style={{ color: "#4069A7" }}>Duration (line)</Text>
          </FlexContainer>
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
