import { Rectangle } from "recharts";

//@ts-ignore
export const CustomColorBar = (props) => {
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
