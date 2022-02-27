import React from 'react'

import styles from './Map.module.scss'
import { districts } from '../../utils/districts';

interface MapProps {
  selectDistrict:(district: string) => void,
  district: string,
  year: number,
  electionData: any,
  districtMapData: (year: number) => any,
  isDeviceDesktop: boolean
}

function Map({selectDistrict, district, year, electionData, districtMapData, isDeviceDesktop}:MapProps) {

    return(
    <div className = {styles.container}>
      <div className = {styles.district}>
        <div className = {isDeviceDesktop ? styles.regVoteContainer : styles.mobile_regVoteContainer}>
          <h3>{district}</h3>                            
          <p style={(district === "세종" && year <= 17) || (district === "울산" && year <= 14) || (district === "대전" && year ==13) ? 
          {opacity: 0} : {opacity: 1}}>투표율: {Math.floor(electionData.투표수[districtMapData(year)[`${district}`]] / electionData.선거인수[districtMapData(year)[`${district}`]]*10000)/100}%</p>
        </div>
      </div>
      <svg className = {isDeviceDesktop ? styles.map : styles.mobile_map}
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        viewBox="0 0 800 1200"
        enableBackground="new 0 0 800 1200"
      > 
        {districts(selectDistrict, district).map((district, idx) => (
          <React.Fragment key = {idx}>
            {district.svgPath}
          </React.Fragment>
        ))}
        
      </svg>
  </div>
    )
}

export default Map;