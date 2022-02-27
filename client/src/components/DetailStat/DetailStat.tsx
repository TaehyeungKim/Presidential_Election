import React, {useState, useRef, useEffect} from 'react'

import styles from './DetailStat.module.scss'
import './BarColor.scss'

import candidates from '../../utils/candiates'

interface DetailCandidateProps {
    idx: number,
    stat: number,
    detailVisible: boolean,
    vote: any,
    year: number
}

function DetailCandidate({idx, stat, detailVisible, vote, year}:DetailCandidateProps) {
    const [rate, setRate] = useState<number>(0);
    const [color, setColor] = useState<string>("");
    const updated = useRef<number>(0);
    const numberAnimation = () => {
        if(updated.current < 50) {
            const num = Math.floor(Math.random() * 10000)/100
            setRate(num)
            setTimeout(numberAnimation, 5)
        } else if(updated.current === 50) {
            setRate(stat)
        }
        updated.current = updated.current + 1
    }
    const party = vote.name.split("_")[0];
    const name = vote.name.split("_")[1];

    const obj = candidates.filter((elm)=>{
        return elm.number === year
    })
    const candObj: any = obj[0].candidates;

    useEffect(()=>{
        for(let candidate in candObj) {
            if(candidate === name) {
                setColor(candObj[candidate].colorId)
            }
        }
    },[stat])

    
    useEffect(()=>{
        numberAnimation()
        return()=>{setRate(0);updated.current = 0;clearTimeout()}},[stat, detailVisible])
    return(
        <li key={idx}> 
            <div className = {styles.cand}>
                <div className = {styles.candStatBarArea}>
                    <div>{rate}%</div>
                    <div className = {styles.statBar} id = {`${color}`} style = {detailVisible === true ? {height: `${(stat/100) * 600}px`} : {height: "0px"}}/>
                </div>
                <div className = {styles.candName}><span>{name}</span><br/>{party}</div>
            </div>
        </li>
    )
}

interface DetailStatProps {
    arr: Array<any>,
    regionArr: Array<string>,
    detailRegion: string,
    searchThroughArr: (regionArr: Array<string>, detailRegion: string) => number;    
    detailResutData: any,
    detailVisible: boolean,
    year: number
}

function DetailStat({arr, regionArr, detailRegion, searchThroughArr, detailResutData, detailVisible, year}:DetailStatProps) {
    const statContainer = useRef<HTMLDivElement>(null);
    
    return(
        <div className = {styles.wrapper}>
            <button id = {styles.left} onClick = {()=>{statContainer.current?.scrollBy(-100,0);}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
                </svg>
            </button>
            <button id = {styles.right}  onClick = {()=>{statContainer.current?.scrollBy(100,0);}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
                </svg>
            </button>
            <div className = {styles.statContainer} ref = {statContainer}>
                <ul>
                {arr.map((vote, idx)=>{
                    let stat = Math.floor(vote.vote[searchThroughArr(regionArr,detailRegion)]/detailResutData.계[searchThroughArr(regionArr,detailRegion)] * 10000) / 100;
                    return (   
                            <DetailCandidate idx={idx} stat={stat} detailVisible={detailVisible} vote={vote} year={year}/>
                            )})}
                </ul>
            </div>
        </div>
    )
}

export default DetailStat;