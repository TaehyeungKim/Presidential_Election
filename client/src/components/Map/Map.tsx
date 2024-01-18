import React, {useContext} from 'react'
import { DeviceModeContext } from '../../App';
import styles from './Map.module.scss'
import { districts } from '../../utils/districts';
import { District } from '../../pages/district';

interface MapProps {
  selectDistrict:(district: District) => void,
  district: District,
  year: number,
  electionData: any,
  districtMapData: (year: number) => any,
  
}

function Map({selectDistrict, district, year, electionData, districtMapData}:MapProps) {
    const isDeviceDesktop = useContext(DeviceModeContext)

    return(
    <div className = {styles.container}>
      <div className = {styles.district}>
        <div className = {isDeviceDesktop ? styles.regVoteContainer : styles.mobile_regVoteContainer}>
          <h3>{district}</h3>
          {year === 20 && electionData.개표율 !== undefined ? 
          <p>개표율: {electionData.개표율[districtMapData(year)[`${district}`]]}%</p>
          :                         
          <p style={(district === "세종" && year <= 17) || (district === "울산" && year <= 14) || (district === "대전" && year ==13) ? 
          {opacity: 0} : {opacity: 1}}>투표율: {Math.floor(electionData.투표수[districtMapData(year)[`${district}`]] / electionData.선거인수[districtMapData(year)[`${district}`]]*10000)/100}%</p>}
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