import React, {useState,useEffect, useRef} from 'react'
import styles from './DetailRegionSelector.module.scss'

interface DetailRegionSelectorProps {
    regionArr: Array<string>,
    detailRegion: string,
    setDetailRegion: (region: string) => void;
}
function DetailRegionSelector({regionArr, detailRegion, setDetailRegion}:DetailRegionSelectorProps) {
    
    const container = useRef<HTMLDivElement>(null);
    
    return(
        <>
            <div className = {styles.selector}>
                <div className = {styles.selectorHeader}>
                    <h3>세부 지역 선택</h3>
                </div>
                <div className = {styles.regionContainer} ref = {container}>
                    <div className = {styles.wrapper}>
                    {regionArr.map((region, idx)=>(
                        <React.Fragment key={idx}>
                            <div className = {styles.region} id={region === detailRegion ? styles.selected : undefined} onClick = {()=>setDetailRegion(region)}>
                                {region}
                            </div>
                        </React.Fragment>
                    ))}
                    </div>
                </div>
                <div className = {styles.selectorFooter}>
                    <div>
                        <button onClick = {()=>container.current?.scrollBy(0,-100)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                            </svg>
                        </button>
                        <button onClick = {()=>container.current?.scrollBy(0,100)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailRegionSelector;