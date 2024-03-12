import { FlexContainer } from "./components/FlexContainer";
import { Text } from "./components/Text";
import closeIconUrl from "../assets/close.svg";
import { useState, useMemo, Fragment } from "react";
import { Ascent, grades, gyms } from "./testData";
import { v4 } from "uuid";

type AddModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddModal = ({ isOpen, onClose }: AddModalProps) => {
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
    <div
      style={{
        display: isOpen ? "inline-flex" : "none",
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
          <Text title>Add new session</Text>
          <div onClick={onClose}>
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
        <FlexContainer direction="column">
          <Text>Session date and time</Text>
          <FlexContainer>
            <Text>Start</Text>
            <input type="datetime-local" />
            <button>Today</button>
          </FlexContainer>
          <FlexContainer>
            <Text>End</Text>
            <input type="time" />
            <button>Now</button>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer direction="column">
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
            {Object.entries(newAscentsByGrade).map(([grade, count], index) => (
              <Fragment key={"grade-input-row-" + index}>
                <Text>{grade}</Text>
                <button onClick={() => handleAscentRemoved(grade)}>-</button>
                <Text style={{ textAlign: "center" }}>{count}</Text>
                <button onClick={() => handleAscentAdded(grade)}>+</button>
              </Fragment>
            ))}
          </div>
        </FlexContainer>
        <FlexContainer style={{ justifyContent: "space-between" }}>
          <button onClick={onClose}>Cancel</button>
          <button>Save</button>
        </FlexContainer>
      </FlexContainer>
    </div>
  );
};
