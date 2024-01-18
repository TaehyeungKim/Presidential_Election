import {useState, useEffect, useContext} from 'react';
import dataProcess from '../../functions/dataProcess'
import styles from './DetailResult.module.scss'
import DetailRegionSelector from '../DetailRegionSelector/DetailRegionSelector'
import DetailStat from '../DetailStat/DetailStat'
import MobileDetailStat from '../DetailStat/MobileDetailStat'
import MovePageButton from '../MovePageButton/MovePageButton'
import { DeviceModeContext } from '../../App';


interface DetailResultProps {
    year: number,
    region: string,
    detailVisible: boolean,
    setDetailVisible:(bool: boolean)=>void,

}

function DetailResult({year, region, detailVisible, setDetailVisible}:DetailResultProps) {
    const [detailResutData, setDetailResultData] = useState<any>();
    const [detailRegion, setDetailRegion] = useState<string>("");
    const [regionArr, setRegionArr] = useState<Array<string>>([]);

    const isDeviceDesktop = useContext(DeviceModeContext)

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
                        if(key !== "구시군명" && key !== "선거인수" && key !== "투표수" && key !=="계" && key !== "무효투표수" && key !=="기권수" && key !=="개표율") {
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
                        {year === 20 && detailResutData.개표율 !== undefined ? 
                        <h3>개표율: {detailResutData.개표율[searchThroughArr(regionArr, detailRegion)]}%</h3>
                        :
                        <h3>투표율: {Math.floor(detailResutData.투표수[searchThroughArr(regionArr, detailRegion)]/detailResutData.선거인수[searchThroughArr(regionArr, detailRegion)] * 10000)/100}%</h3>}
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