import {useState, useEffect, useRef} from 'react'
import candidates from '../../utils/candiates'
import styles from './ElectionResult.module.scss'

interface VoteRateProps {
    voteNum: number,
    rank: number,
    img: string,
    info: any,
    district: string,
    year: number,
    isDeviceDesktop: boolean;
}

function VoteRate({voteNum, rank, img, info, district, year, isDeviceDesktop}: VoteRateProps) {

    const [voteRate, setVoteRate] = useState<number>(0);
    const updated = useRef(0);

    const numberAnimation = () => {

        if(updated.current < 100) {
            const num = Math.floor(Math.random() * 10000)/100
            setVoteRate(num)
            setTimeout(numberAnimation, 5)
        } else if(updated.current === 100) {
            setVoteRate(voteNum)
            
        }
        updated.current = updated.current + 1
    }

    useEffect(()=>{
        numberAnimation()
        return ()=>{setVoteRate(0); updated.current = 0}
    },[district, year])
    

    
    return(
        <>
        {isDeviceDesktop ? 
        <>
            <div className = {styles.rank}>{district === "전국" && rank===1 && year !== 20 ? "당선" : `${rank}위`}</div>
            <img src = {img}/>
            <div className = {styles.name}>{info[1]}</div>
            <div className = {styles.party}>{info[0]}</div>
            <div className = {styles.rate} style = {(district === "세종" && year <= 17) || (district === "울산" && year <= 14) || (district === "대전" && year ==13) ? {opacity: 0} : {opacity: 1}}>{voteRate}%</div>
        </>
        :
        <> 
            <div className = {styles.mobile_rank}>{district === "전국" && rank===1 && year !== 20 ? "당선" : `${rank}위`}</div>
            <div className = {styles.mobile_candContent}>         
                <img src = {img}/>
                <div>
                    <div className = {styles.mobile_name}>{info[1]}</div>
                    <div className = {styles.mobile_party}>{info[0]}</div>
                </div>
                <div className = {styles.mobile_rate} style = {(district === "세종" && year <= 17) || (district === "울산" && year <= 14) || (district === "대전" && year ==13) ? {opacity: 0} : {opacity: 1}}>{voteRate}%</div>
            </div>
        </>}
    </>
    )
}


interface ElectionResultProps {
    electionData: any
    year: number,
    district: string,
    districtMapData:(year: number) => any,
    isDeviceDesktop: boolean;
}

function ElectionResult({electionData, year, district, districtMapData, isDeviceDesktop}:ElectionResultProps) {

    return(
        <>
        {(()=>{
            var arr = []
            switch(electionData) {
                case undefined:
                    return null
                default:
                    for(let key in electionData) {
                        if(key !== "시도명" && key !== "선거인수" && key !== "투표수" && key !=="계" && key !== "개표율") {
                            arr.push({name: key, vote: electionData[key], get voteNum():any {return this.vote}})
                        }
                    }

                    for(let i = 0; i < arr.length-1; i++) {
                        let j = i
                        while(j>=0 && arr[j].voteNum[districtMapData(year)[`${district}`]] < arr[j+1].voteNum[districtMapData(year)[`${district}`]]) {
                            [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
                            j=j-1
                        }
                    }
                    
                    const obj = candidates.filter((elm)=>{
                        return elm.number === year
                    })
                    const candObj: any = obj[0].candidates
                    var [first, second] = ["", ""]
                    for(let candidate in candObj) {
                        if(candidate === arr[0].name.split("_")[1]) {
                            first = candObj[candidate].image;
                        } else if(candidate === arr[1].name.split("_")[1]){
                            second = candObj[candidate].image;
                        }
                    }
                    return (
                        <>
                            {isDeviceDesktop === true ?
                            <>
                            <div className={styles.candidate} id={district === "전국" && arr[0].voteNum[districtMapData(year)[`${district}`]] !== arr[1].voteNum[districtMapData(year)[`${district}`]] ? styles.elected : styles.first}>
                                <VoteRate voteNum={electionData.계[districtMapData(year)[`${district}`]] === 0 ? 0 : Math.floor(((arr[0].voteNum[districtMapData(year)[`${district}`]]/electionData.계[districtMapData(year)[`${district}`]])*10000))/100} rank={1} img={first} info={arr[0].name.split("_")} district={district} year={year} isDeviceDesktop={isDeviceDesktop}/>
                            </div>
                            <div className = {styles.candidate} id = {styles.second}>
                                <VoteRate voteNum = {electionData.계[districtMapData(year)[`${district}`]] === 0 ? 0 : Math.floor(((arr[1].voteNum[districtMapData(year)[`${district}`]]/electionData.계[districtMapData(year)[`${district}`]])*10000))/100} rank={
                                    arr[0].voteNum[districtMapData(year)[`${district}`]] === arr[1].voteNum[districtMapData(year)[`${district}`]] ? 1:2} img={second} info={arr[1].name.split("_")} district={district} year={year} isDeviceDesktop={isDeviceDesktop}/>
                            </div> 
                            </>
                            :
                            <>
                            <div className={styles.mobile_candidate} id={district === "전국" && arr[0].voteNum[districtMapData(year)[`${district}`]] !== arr[1].voteNum[districtMapData(year)[`${district}`]] ? styles.mobile_elected : styles.mobile_first}>
                                <VoteRate voteNum={electionData.계[districtMapData(year)[`${district}`]] === 0 ? 0 : Math.floor(((arr[0].voteNum[districtMapData(year)[`${district}`]]/electionData.계[districtMapData(year)[`${district}`]])*10000))/100} rank={1} img={first} info={arr[0].name.split("_")} district={district} year={year} isDeviceDesktop={isDeviceDesktop}/>
                            </div>
                            <div className = {styles.mobile_candidate} id = {styles.mobile_second}>
                                <VoteRate voteNum = {electionData.계[districtMapData(year)[`${district}`]] === 0 ? 0 : Math.floor(((arr[1].voteNum[districtMapData(year)[`${district}`]]/electionData.계[districtMapData(year)[`${district}`]])*10000))/100} rank={
                                    arr[0].voteNum[districtMapData(year)[`${district}`]] === arr[1].voteNum[districtMapData(year)[`${district}`]] ? 1:2} img={second} info={arr[1].name.split("_")} district={district} year={year} isDeviceDesktop={isDeviceDesktop}/>
                            </div> 
                            </>
                            }   
                            
                        </>)
            }
        })()}
        </>
    )
}

export default ElectionResult;