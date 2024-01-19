import {useState, useEffect, useContext} from 'react'
import { DeviceModeContext } from '../App'
import styles from './MainPage.module.scss'

import ElectionResult from '../components/ElectionResult/ElectionResult'
import DetailResult from '../components/DetailResult/DetailResult'
import MovePageButton from '../components/MovePageButton/MovePageButton'
import YearSelect from '../components/YearSelect/YearSelect'
import Map from '../components/Map/Map'


import dataProcess from '../functions/dataProcess'

import { districtMapData, District } from './district'
import { ElectionData } from './data'

interface GTDProps {
    district: District;
    year: number;
    showDetailResult: ()=>void
}

function GoToDetailPageArea({district, year, showDetailResult}:GTDProps) {

    const isDeviceDesktop = useContext(DeviceModeContext)

    return(
        <>
        {district !== "전국" ?
            (district === "세종" && year <= 17) || (district === "울산" && year <= 14) || (district === "대전" && year ==13) ? 
            isDeviceDesktop ?
                <h3 className = {styles.noExistence}>
                    {`제${year}대 대통령 선거 당시 ${district}은 광역자치단체로 분류되지 않았습니다.`}
                </h3>
                :
                <h3 className = {styles.noExistence}>
                    {`제${year}대 대통령 선거 당시 ${district}은`}<br/>{`광역자치단체로 분류되지 않았습니다.`}
                </h3>
            
            :
            <MovePageButton movePage={showDetailResult} direction = {"down"}/> 
        : <div className = {styles.pad}>
            <div/></div>}
        </>
    )
}



function MainPage() {
    
    const [district, setDistrict] = useState<District>("전국");
    const [year, setYear] = useState<number>(20);
    const [visibleYearSelect, setVisibleYearSelect] = useState<boolean>(true);
    const [electionData, setElectionData] = useState<ElectionData>();
    const [detailVisible, setDetailVisible] = useState<boolean>(true);

    const isDeviceDesktop = useContext(DeviceModeContext)

    const showDetailResult = () => {
        setDetailVisible(true);
        setVisibleYearSelect(false);
    }
    
    const selectDistrict = (district: District) => setDistrict(district)
    
    const selectYear = (year: number) => setYear(year);

    const controlYearSelect = () => setVisibleYearSelect(!visibleYearSelect)
    
    const parseData = async(req: number) => {
        const data = new FormData();
        data.append('req', req.toString())
        const url = req === 20 ? '/current' : '/results'
        
        const response = await fetch(url, {
            method: "POST",
            body: data
        })
        await response.json()
        .then(value => {
            try {
                dataProcess(value);    
                setElectionData(value);
            } catch(e) {
                console.log(e)
            }
        })
    }

    useEffect(()=>{
        parseData(year)
        setDetailVisible(false);
        return()=>{
            setDistrict("전국")
            setElectionData(undefined)}
    },[year])

    return(
        
        <>
        <YearSelect controlYearSelect={controlYearSelect} visibleYearSelect={visibleYearSelect} selectYear={selectYear} year={year}/>
        {electionData === undefined ? null : 
        <>
        <div className = {styles.frame}>
            <div className = {styles.container} id = {detailVisible === true ? styles.moveUpward : undefined}>
                <section>
                    <h2>제<span>{year}</span>대 대통령 선거</h2>
                </section>
                <div className = {styles.wrapper} style = {isDeviceDesktop ? {flexDirection: "row"} : {flexDirection:"column"}}>
                    {(district === "세종" && year <= 17) || (district === "울산" && year <= 14) || (district === "대전" && year ==13) ? null :
                    <ElectionResult electionData={electionData} year={year} district={district} districtMapData={districtMapData}/>}
                    <div id = {isDeviceDesktop ? styles.map : styles.mobile_map}>
                    <Map selectDistrict={selectDistrict} district={district} year = {year} electionData={electionData} districtMapData={districtMapData}/>
                    </div>
                </div>
                <GoToDetailPageArea district={district} year={year} showDetailResult={showDetailResult}/>
            </div>
            {district !== "전국" && !((district === "세종" && year <= 17) || (district === "울산" && year <= 14) || (district === "대전" && year ==13)) ? 
            <DetailResult year={year} region={district} detailVisible={detailVisible} setDetailVisible={setDetailVisible}/> : null}
            </div>
        
    
            </>}
        </>
    )
}

export default MainPage;