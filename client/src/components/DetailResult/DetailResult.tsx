import React, {useState, useEffect} from 'react';
import dataProcess from '../../functions/dataProcess'
import styles from './DetailResult.module.scss'
import DetailRegionSelector from '../DetailRegionSelector/DetailRegionSelector'
import DetailStat from '../DetailStat/DetailStat'
import MobileDetailStat from '../DetailStat/MobileDetailStat'
import MovePageButton from '../MovePageButton/MovePageButton'


interface DetailResultProps {
    year: number,
    region: string,
    detailVisible: boolean,
    setDetailVisible:(bool: boolean)=>void,
    isDeviceDesktop: boolean;
}

function DetailResult({year, region, detailVisible, setDetailVisible, isDeviceDesktop}:DetailResultProps) {
    const [detailResutData, setDetailResultData] = useState<any>();
    const [detailRegion, setDetailRegion] = useState<string>("");
    const [regionArr, setRegionArr] = useState<Array<string>>([]);
    const parseData = async(year: number, region: string) => {
        const data = new FormData();
        data.append('year', year.toString());
        data.append('region', region)
        var url = ""
        switch(year) {
            default:
                url = '/detail'
                break;
            case 20:
                url = '/currentdetail'
                break;
        }
        const res = await fetch(url, {
            method: "POST",
            body: data
        })
        const json = await res.json()
        .then(value=>{
            dataProcess(value);
            setDetailResultData(value);
        })
    }

    const showMainPage = () => {
        setDetailVisible(false);
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
                if(key === "????????????") {
                    for(let reg in detailResutData[key]) {
                        if(detailResutData[key][reg].split("???").length == 2) {
                            detailResutData[key][reg] = detailResutData[key][reg].split("???")[0] + "??? " + detailResutData[key][reg].split("???")[1]
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
                        if(key !== "????????????" && key !== "????????????" && key !== "?????????" && key !=="???" && key !== "???????????????" && key !=="?????????" && key !=="?????????") {
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
        return (<div className = {styles.detail} id = {detailVisible === true ? styles.moveUpward : undefined} style = {isDeviceDesktop ? undefined : {justifyContent: "initial"}}>
                    <MovePageButton movePage={showMainPage} direction = {"up"}/> 
                    <div className = {styles.detailHeader}>
                        <h1>{region + " " + detailRegion}</h1>
                        {year === 20 && detailResutData.????????? !== undefined ? 
                        <h3>?????????: {detailResutData.?????????[searchThroughArr(regionArr, detailRegion)]}%</h3>
                        :
                        <h3>?????????: {Math.floor(detailResutData.?????????[searchThroughArr(regionArr, detailRegion)]/detailResutData.????????????[searchThroughArr(regionArr, detailRegion)] * 10000)/100}%</h3>}
                    </div>
                    <div className = {styles.flex_box}>
                        <DetailRegionSelector regionArr={regionArr} detailRegion={detailRegion} setDetailRegion={setDetailRegion} isDeviceDesktop={isDeviceDesktop}/>
                    {isDeviceDesktop ? 
                        <DetailStat arr={arr} regionArr={regionArr} detailRegion={detailRegion} searchThroughArr={searchThroughArr} detailResutData={detailResutData} detailVisible={detailVisible} year = {year}/>
                        :<MobileDetailStat arr={arr} regionArr={regionArr} detailRegion={detailRegion} searchThroughArr={searchThroughArr} detailResutData={detailResutData} detailVisible={detailVisible} year = {year}/> }       
                    </div>
                </div>)})()}
        
        </>
    )
}

export default DetailResult;