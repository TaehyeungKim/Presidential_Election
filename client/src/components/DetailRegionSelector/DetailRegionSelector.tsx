import React, {useState,useEffect, useRef} from 'react'
import styles from './DetailRegionSelector.module.scss'

interface DetailRegionSelectorProps {
    regionArr: Array<string>,
    detailRegion: string,
    setDetailRegion: (region: string) => void,
    isDeviceDesktop: boolean
}
function DetailRegionSelector({regionArr, detailRegion, setDetailRegion, isDeviceDesktop}:DetailRegionSelectorProps) {
    
    const container = useRef<HTMLDivElement>(null);
    
    return(
        <>
            <div className = {isDeviceDesktop ? styles.selector : styles.mobile_selector}>
                <div className = {isDeviceDesktop ? styles.selectorHeader : styles.mobile_selectorHeader}>
                    <h3>세부 지역 선택</h3>
                </div>
                <div className = {isDeviceDesktop ? styles.regionContainer : styles.mobile_regionContainer} ref = {container}>
                    <div className = {isDeviceDesktop ? styles.wrapper : styles.mobile_wrapper}>
                    {regionArr.map((region, idx)=>(
                        <React.Fragment key={idx}>
                            <div className = {isDeviceDesktop ? styles.region : 
                                region.length >= 8 ? styles.mobile_region_small : styles.mobile_region} id={region === detailRegion ? styles.selected : undefined} onClick = {()=>setDetailRegion(region)}>
                                {region}
                            </div>
                        </React.Fragment>
                    ))}
                    </div>
                </div>
                <div className = {isDeviceDesktop ? styles.selectorFooter : styles.mobile_selectorFooter}>
                    {isDeviceDesktop ? 
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
                    </div> : null}
                </div>
            </div>
        </>
    )
}

export default DetailRegionSelector;