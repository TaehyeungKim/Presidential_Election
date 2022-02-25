import React, {useState, useEffect} from 'react';
import dataProcess from '../../functions/dataProcess'
import styles from './DetailResult.module.scss'
import DetailRegionSelector from '../DetailRegionSelector/DetailRegionSelector'

interface DetailResultProps {
    year: number,
    region: string,
    detailVisible: boolean,
    setDetailVisible:(bool: boolean)=>void;
}

function DetailResult({year, region, detailVisible, setDetailVisible}:DetailResultProps) {
    const [detailResutData, setDetailResultData] = useState<any>();
    const [detailRegion, setDetailRegion] = useState<string>("");
    const [regionArr, setRegionArr] = useState<Array<string>>([]);
    const parseData = async(year: number, region: string) => {
        const data = new FormData();
        data.append('year', year.toString());
        data.append('region', region)
        const res = await fetch('/detail', {
            method: "POST",
            body: data
        })
        const json = await res.json()
        .then(value=>{
            dataProcess(value);
            setDetailResultData(value);
            console.log(value);
        })
    } 
    const searchThroughArr = (arr: Array<string>, region: string) => {
        var code = 0;
        for(let i = 0; i<arr.length; i++) {
            if(arr[i]===region) {
                code = i
                break;
            }
        }
        return code;
    }
    
    

    useEffect(()=>{
        parseData(year, region)
        return()=>{setDetailResultData(undefined); setDetailRegion("");}},[region])
    useEffect(()=>{
        var regionArr:Array<string>  = [];
        if(detailResutData !== undefined) {
            for(let key in detailResutData) {
                if(key === "구시군명") {
                    for(let reg in detailResutData[key]) {
                        if(detailResutData[key][reg].split("시").length == 2) {
                            detailResutData[key][reg] = detailResutData[key][reg].split("시")[0] + "시 " + detailResutData[key][reg].split("시")[1]
                        }
                        regionArr.push(detailResutData[key][reg])
                    }
                }
            }
        }
        setRegionArr(regionArr);
        setDetailRegion(regionArr[1])
     },[detailResutData])
    return(
        <>
        {(()=>{
            var arr = []
            switch(detailResutData) {
                case undefined:
                    return null
                default:
                    for(let key in detailResutData) {
                        if(key !== "구시군명" && key !== "선거인수" && key !== "투표수" && key !=="계" && key !== "무효투표수" && key !=="기권수") {
                            arr.push({name: key, vote: detailResutData[key], get voteNum() {return this.vote}})
                        }
                    }

                    for(let i = 0; i < arr.length-1; i++) {
                        let j = i
                        while(j>=0 && arr[j].voteNum[searchThroughArr(regionArr,detailRegion)] < arr[j+1].voteNum[searchThroughArr(regionArr,detailRegion)]) {
                            [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
                            j=j-1
                        }
                    }
        }
        return (<div className = {styles.detail} id = {detailVisible === true ? styles.moveUpward : undefined}>
                    <div className = {styles.buttonWrapper}>
                        <button onClick = {()=>setDetailVisible(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path  d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                        </svg>
                        </button>
                    </div>
                    <div className = {styles.detailHeader}>
                        <h1>{detailRegion}</h1>
                        <h3>투표율: {Math.floor(detailResutData.투표수[searchThroughArr(regionArr, detailRegion)]/detailResutData.선거인수[searchThroughArr(regionArr, detailRegion)] * 10000)/100}%</h3>
                    </div>
                    <DetailRegionSelector regionArr={regionArr} detailRegion={detailRegion} setDetailRegion={setDetailRegion}/>
                    <div className = {styles.detailContent}>    
                        <div className = {styles.statContainer}>
                            <ul>
                            {arr.map((vote, idx)=>{
                                let stat = Math.floor(vote.vote[searchThroughArr(regionArr,detailRegion)]/detailResutData.계[searchThroughArr(regionArr,detailRegion)] * 10000) / 100;
                                return (   
                                        <li>
                                        <React.Fragment key={idx}>
                                            <div className = {styles.cand}>
                                                <div className = {styles.candStatBarArea}>
                                                    <div>{stat}%</div>
                                                    <div className = {styles.statBar} style = {detailVisible === true ? {height: `${(stat/100) * 600}px`} : {height: "0px"}}/>
                                                </div>
                                                <div className = {styles.candName}>{vote.name.split("_")[0]}<br/>{vote.name.split("_")[1]}</div>
                                            </div>
                                        </React.Fragment>
                                        </li>
                                    
                            )})}
                            </ul>
                        </div>
                    </div>
                </div>)})()}
        
        </>
    )
}

export default DetailResult;