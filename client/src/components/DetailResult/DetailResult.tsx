import React, {useState, useEffect} from 'react';
import dataProcess from '../../functions/dataProcess'
import styles from './DetailResult.module.scss'

interface DetailResultProps {
    year: number,
    region: string,
    detailVisible: boolean,
    setDetailVisible:(bool: boolean)=>void
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
                    <h1>{detailRegion}</h1>
                    {arr.map((vote, idx)=>(
                        <React.Fragment key={idx}>
                            <div>{vote.name},{vote.vote[searchThroughArr(regionArr,detailRegion)]}</div>
                        </React.Fragment>
                    ))}
                </div>)})()}
        
        </>
    )
}

export default DetailResult;