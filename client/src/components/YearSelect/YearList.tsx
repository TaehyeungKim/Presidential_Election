import React from "react";
import styles from "./YearList.module.scss";

const MAX = 20;

type YearSelectUnitProps = YearListProps & {
  order: number;
};

function YearSelectUnit({
  order,
  visibleYearSelect,
  selectYear,
  selectedYear,
  removeDom,
}: YearSelectUnitProps) {
  return (
    <div
      className={selectedYear === order ? "bar selected" : "bar"}
      id={visibleYearSelect === true ? `order_${order}` : `hide_order_${order}`}
      onClick={() => {
        selectYear(order);
      }}
      onAnimationEnd={() => {
        !visibleYearSelect && order === MAX && removeDom();
      }}
    >
      {`제${order}대`}
    </div>
  );
}

interface YearListProps {
  visibleYearSelect: boolean;
  selectYear: (year: number) => void;
  selectedYear: number;
  removeDom: () => void;
}

export default function YearList({
  visibleYearSelect,
  selectYear,
  selectedYear,
  removeDom,
}: YearListProps) {
  return (
    <div
      className={styles.yearSelectArea}
      id={visibleYearSelect === true ? styles.visible : styles.invisible}
    >
      {(() => {
        let list = [];
        for (let order = MAX; order >= 13; order = order - 1) {
          list.push(
            <React.Fragment key={order}>
              <YearSelectUnit
                order={order}
                visibleYearSelect={visibleYearSelect}
                selectYear={selectYear}
                selectedYear={selectedYear}
                removeDom={removeDom}
              />
            </React.Fragment>
          );
        }
        return list;
      })()}
    </div>
  );
}
