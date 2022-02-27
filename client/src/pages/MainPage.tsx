import React, {useState, useEffect, useRef} from 'react'
import Map from '../components/Map/Map'

import styles from './MainPage.module.scss'
import yearSelectButton from '../images/yearSelectButton.png'
import YearSelect from '../components/YearSelect/YearSelect'
import ElectionResult from '../components/ElectionResult/ElectionResult'
import DetailResult from '../components/DetailResult/DetailResult'
import dataProcess from '../functions/dataProcess'

function MainPage() {
    const [district, setDistrict] = useState<string>("전국");
    const [year, setYear] = useState<number>(19);
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
        const response = await fetch('/results', {
            method: "POST",
            body: data
        })
        const json = await response.json()
        .then(value => {
            dataProcess(value);
            setElectionData(value)
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
                for(let order = 19; order >= 13; order=order-1) {
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
                <div className = {styles.wrapper}>
                    <ElectionResult electionData={electionData} year={year} district={district} districtMapData={districtMapData}/>
                    <div id = {styles.map}>
                        <section>
                            <h2>제<span>{year}</span>대 대통령 선거</h2>
                            <h3>{district}</h3>                            
                            <p style={(district === "세종" && year <= 17) || (district === "울산" && year <= 14) || (district === "대전" && year ==13) ? 
                            {opacity: 0} : {opacity: 1}}>투표율: {Math.floor(electionData.투표수[districtMapData(year)[`${district}`]] / electionData.선거인수[districtMapData(year)[`${district}`]]*10000)/100}%</p>
                        </section>
                        <Map selectDistrict={selectDistrict} district={district}/>
                    </div>
                </div>
                {district !== "전국" ?
                    (district === "세종" && year <= 17) || (district === "울산" && year <= 14) || (district === "대전" && year ==13) ? 
                    
                    <h3 className = {styles.noExistence}>{`제${year}대 대통령 선거 당시 ${district}은 광역자치단체로 분류되지 않았습니다.`}</h3>
                    :
                    <div className = {styles.buttonWrapper}>
                        <button onClick = {showDetailResult}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                        </svg>
                        </button>
                    </div> 
                : null}
            </div>
            {district !== "전국" && !((district === "세종" && year <= 17) || (district === "울산" && year <= 14) || (district === "대전" && year ==13)) ? 
            <DetailResult year={year} region={district} detailVisible={detailVisible} setDetailVisible={setDetailVisible}/> : null}
            </div>
        
    
            </>}
        </>
    )
}

export default MainPage;