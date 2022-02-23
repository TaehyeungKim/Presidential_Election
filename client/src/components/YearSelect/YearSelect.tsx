import React from 'react'
import './YearSelect.scss'

interface YearSelectProps {
    order: number,
    visibleYearSelect: boolean,
    selectYear: (year: number) => void,
    selectedYear: number;
}

function YearSelect({order, visibleYearSelect, selectYear, selectedYear}: YearSelectProps) {
    return(
        <div className = {selectedYear === order ? "bar selected":"bar"} id ={visibleYearSelect === true ? `order_${order}` : `hide_order_${order}`} 
        onClick = {()=>{
            selectYear(order);
        }}>
            {`제${order}대`}
        </div>
    )
}

export default YearSelect;