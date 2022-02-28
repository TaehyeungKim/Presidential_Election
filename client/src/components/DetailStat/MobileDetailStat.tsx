import {useState, useRef, useEffect} from 'react'
import candidates from '../../utils/candiates'
import styles from './MobileDetailStat.module.scss'
import {debounce} from 'lodash'


interface MobileStatBarProps {
    rate: number,
    color: string,
    detailVisible: boolean,
    name: string,
    party: string,
    stat: number
}

function MobileStatBar({rate, color, detailVisible, name, party, stat}:MobileStatBarProps) {
    const statBarContainer = useRef<HTMLDivElement>(null);
    const [windowSize, setWindowSize] = useState<any>({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const re_render = debounce(()=>{
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }, 500)

    useEffect(()=>{
        window.addEventListener('resize', re_render)
        return ()=>window.removeEventListener('resize', re_render)
    },[])
    return(
        <div className = {styles.cand}>
            <div className = {styles.candName}><span>{name}</span><br/>{party}</div>
            <div className = {styles.candStatBarArea} ref = {statBarContainer}>
                <div className = {styles.statBar} id = {`${color}`} style = {detailVisible === true ? {width: `${((stat/100) * (statBarContainer.current?.offsetWidth as number)) * 0.8}px`} : {width: "0px"}}/>
                <div className = {styles.rate}>{rate}%</div>
            </div>
        </div>
    )
}

interface MobileDetailCandidateProps {
    idx: number,
    stat: number,
    detailVisible: boolean,
    vote: any,
    year: number,
}

function MobileDetailCandidate({idx, stat, detailVisible, vote, year}:MobileDetailCandidateProps) {
    const [rate, setRate] = useState<number>(0);
    const [color, setColor] = useState<string>("");
    const barArea = useRef<HTMLDivElement>(null);

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
            <MobileStatBar rate = {rate} color = {color} detailVisible = {detailVisible} name = {name} party = {party} stat = {stat}/> 
        </li>
    )
}

interface MobileDetailStatProps {
    arr: Array<any>,
    regionArr: Array<string>,
    detailRegion: string,
    searchThroughArr: (regionArr: Array<string>, detailRegion: string) => number;    
    detailResutData: any,
    detailVisible: boolean,
    year: number
}

function MobileDetailStat({arr, regionArr, detailRegion, searchThroughArr, detailResutData, detailVisible, year}:MobileDetailStatProps) {
    const statContainer = useRef<HTMLDivElement>(null);
    
    return(
        <div className = {styles.wrapper}>
            <div className = {styles.statContainer} ref = {statContainer}>
                <ul>
                {arr.map((vote, idx)=>{
                    let stat = Math.floor(vote.vote[searchThroughArr(regionArr,detailRegion)]/detailResutData.계[searchThroughArr(regionArr,detailRegion)] * 10000) / 100;
                    return (   
                            <MobileDetailCandidate idx={idx} stat={stat} detailVisible={detailVisible} vote={vote} year={year}/>
                            )})}
                </ul>
            </div>
        </div>
    )
}

export default MobileDetailStat;