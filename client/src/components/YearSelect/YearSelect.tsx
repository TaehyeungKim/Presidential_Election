import { useState, useEffect } from "react";
import "./YearSelect.scss";
import styles from "./YearSelect.module.scss";
import yearSelectButton from "../../images/yearSelectButton.png";
import YearList from "./YearList";

interface YearSelectProps {
  controlYearSelect: () => void;
  visibleYearSelect: boolean;
  selectYear: (year: number) => void;
  year: number;
}

function YearSelect({
  controlYearSelect,
  visibleYearSelect,
  selectYear,
  year,
}: YearSelectProps) {
  const [yearListOnDom, setYearListOnDom] = useState<boolean>(true);

  const removeYearListFromDom = () => {
    setYearListOnDom(false);
  };

  useEffect(() => {
    if (visibleYearSelect) setYearListOnDom(true);
  }, [visibleYearSelect]);

  return (
    <>
      <button className={styles.openYearSelect} onClick={controlYearSelect}>
        <img src={yearSelectButton} />
      </button>
      {yearListOnDom && (
        <YearList
          visibleYearSelect={visibleYearSelect}
          selectYear={selectYear}
          selectedYear={year}
          removeDom={removeYearListFromDom}
        />
      )}
    </>
  );
}

export default YearSelect;
