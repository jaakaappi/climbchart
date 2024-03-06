import { DateTime, Info } from "luxon";
import React from "react";

type CalendarProps = {
  month: number;
  year: number;
  coloredDays: number[];
};

const coloredDayStyle: React.CSSProperties = {
  background: "#E7C300",
  borderRadius: 4,
  textAlign: "center",
};

export const Calendar = ({ month, year, coloredDays }: CalendarProps) => {
  const dateTime = DateTime.fromObject({ year, month, day: 1 });
  const offset = dateTime.weekday - 1;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        padding: 8,
      }}
    >
      {Info.weekdays("short").map((weekday) => {
        return <div style={{ padding: 8, textAlign: "center" }}>{weekday}</div>;
      })}
      {Array(31 + offset)
        .fill("")
        .map((_, index) => (
          <div key={"calendar-day-" + index} style={{ padding: 8 }}>
            {index < offset ? (
              <div></div>
            ) : (
              <div
                style={{
                  ...(coloredDays.includes(index + 1 - offset)
                    ? coloredDayStyle
                    : {}),
                }}
              >
                {index + 1 - offset}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
