import React, {useState, useEffect, useRef} from 'react'
import Map from '../components/Map/Map'

import styles from './MainPage.module.scss'
import yearSelectButton from '../images/yearSelectButton.png'
import HamburgerIcon from '../images/Hamburger_icon.png'
import YearSelect from '../components/YearSelect/YearSelect'
import ElectionResult from '../components/ElectionResult/ElectionResult'
import DetailResult from '../components/DetailResult/DetailResult'
import MovePageButton from '../components/MovePageButton/MovePageButton'
import dataProcess from '../functions/dataProcess'
import UseMediaQuery from '../customHooks/useMediaQuery'

function MainPage() {
    const isDeviceMobile = UseMediaQuery('(max-width: 750px)');
    const isDeviceTablet = UseMediaQuery('(min-height: 1024px)');
    const isDeviceDesktop = !(isDeviceMobile || isDeviceTablet);
    const [district, setDistrict] = useState<string>("전국");
    const [year, setYear] = useState<number>(20);
    const [visibleYearSelect, setVisibleYearSelect] = useState<boolean>(true);
    const [electionData, setElectionData] = useState<any>();
    const [detailVisible, setDetailVisible] = useState<boolean>(true);

    const showDetailResult = () => {
        setDetailVisible(true);
        setVisibleYearSelect(false);
    }
    
    const selectDistrict = (district: string) => {
      setDistrict(district)
    }

    const selectYear = (year: number) => {
        setYear(year);
    }

    const controlYearSelect = () => {
        setVisibleYearSelect(!visibleYearSelect)
    }

    const districtMapData = (year: number) => {
        var data: any
        switch(year) {
            default:
                data = {
                    전국: 0, 서울: 1, 부산: 2, 대구: 3, 인천: 4, 광주: 5, 경기: 6, 강원: 7, 충북: 8, 충남: 9, 전북: 10, 전남: 11, 경북: 12, 경남: 13, 제주: 14
                }
                break;
            case 14:
                data = {
                    전국: 0, 서울: 1, 부산: 2, 대구: 3, 인천: 4, 광주: 5, 대전: 6, 경기: 7, 강원: 8, 충북: 9, 충남: 10, 전북: 11, 전남: 12, 경북: 13, 경남: 14, 제주: 15
                }
                break;
            case 15:
            case 16:
            case 17:
                data = {
                    전국: 0, 서울: 1, 부산: 2, 대구: 3, 인천: 4, 광주: 5, 대전: 6, 울산: 7, 경기: 8, 강원: 9, 충북: 10, 충남: 11, 전북: 12, 전남: 13, 경북: 14, 경남: 15, 제주: 16
                }
                break;
            case 18:
            case 19:
            case 20:
                data = {
                    전국: 0, 서울: 1, 부산: 2, 대구: 3, 인천: 4, 광주: 5, 대전: 6, 울산: 7, 세종: 8, 경기: 9, 강원: 10, 충북: 11, 충남: 12, 전북: 13, 전남: 14, 경북: 15, 경남: 16, 제주: 17
                }
                break;
        }
        return data
    }
    

    const parseData = async(req: number) => {
        const data = new FormData();
        data.append('req', req.toString())
        var url = ""
        switch(req) {
            default:
                url = '/results'
                break;
            case 20:
                url = '/current'
                break;
        }
        const response = await fetch(url, {
            method: "POST",
            body: data
        })
        const json = await response.json()
        .then(value => {
            dataProcess(value);
            setElectionData(value);
            
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
        <button className = {styles.openYearSelect} onClick = {controlYearSelect}>
            <img src = {yearSelectButton}/>
        </button>
        <div className={styles.yearSelectArea} id = {visibleYearSelect === true ? styles.visible : styles.invisible}>
            {(()=>{
                let list = []
                for(let order = 20; order >= 13; order=order-1) {
                    list.push(
                    <React.Fragment key={order}>
                        <YearSelect order={order} visibleYearSelect={visibleYearSelect} selectYear={selectYear} selectedYear={year}/>
                    </React.Fragment>)
                }
                return list
            })()}
        </div>  
        {electionData === undefined ? null : 
        <>
        <div className = {styles.frame}>
            <div className = {styles.container} id = {detailVisible === true ? styles.moveUpward : undefined}>
                <section>
                    <h2>제<span>{year}</span>대 대통령 선거</h2>
                </section>
                <div className = {styles.wrapper} style = {isDeviceDesktop ? {flexDirection: "row"} : {flexDirection:"column"}}>
                    {(district === "세종" && year <= 17) || (district === "울산" && year <= 14) || (district === "대전" && year ==13) ? null :
                    <ElectionResult electionData={electionData} year={year} district={district} districtMapData={districtMapData} isDeviceDesktop={isDeviceDesktop}/>}
                    <div id = {isDeviceDesktop ? styles.map : styles.mobile_map}>
                        <Map selectDistrict={selectDistrict} district={district} year = {year} electionData={electionData} districtMapData={districtMapData} isDeviceDesktop={isDeviceDesktop}/>
                    </div>
                </div>
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
            </div>
            {district !== "전국" && !((district === "세종" && year <= 17) || (district === "울산" && year <= 14) || (district === "대전" && year ==13)) ? 
            <DetailResult year={year} region={district} detailVisible={detailVisible} setDetailVisible={setDetailVisible} isDeviceDesktop={isDeviceDesktop}/> : null}
            </div>
        
    
            </>}
        </>
    )
}

export default MainPage;