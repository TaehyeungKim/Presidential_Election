import React from 'react'
import './YearSelect.scss'
import styles from './YearSelect.module.scss'
import yearSelectButton from '../../images/yearSelectButton.png'

interface YearSelectProps {
    controlYearSelect: ()=>void;
    visibleYearSelect: boolean;
    selectYear: (year:number)=>void;
    year: number

}


function YearSelect({controlYearSelect, visibleYearSelect, selectYear, year}:YearSelectProps) {
    return(
        <>
        <button className = {styles.openYearSelect} onClick = {controlYearSelect}>
            <img src = {yearSelectButton}/>
        </button>
        <div className={styles.yearSelectArea} id = {visibleYearSelect === true ? styles.visible : styles.invisible}>
            {(()=>{
                let list = []
                for(let order = 20; order >= 13; order=order-1) {
                    list.push(
                    <React.Fragment key={order}>
                        <YearSelectUnit order={order} visibleYearSelect={visibleYearSelect} selectYear={selectYear} selectedYear={year}/>
                    </React.Fragment>)
                }
                return list
            })()}
        </div>  
        </>
    )
    
}

interface YearSelectUnitProps {
    order: number,
    visibleYearSelect: boolean,
    selectYear: (year: number) => void,
    selectedYear: number;
}

function YearSelectUnit({order, visibleYearSelect, selectYear, selectedYear}: YearSelectUnitProps) {
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