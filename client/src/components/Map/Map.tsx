import React from 'react'

import styles from './Map.module.scss'
import { districts } from '../../utils/districts';

interface MapProps {
  selectDistrict:(district: string) => void,
  district: string;
}

function Map({selectDistrict, district}:MapProps) {

    return(
    <div className = {styles.container}>
      <div>
      {/* <button className = {styles.whole} onClick = {()=>selectDistrict("전국")}>전국</button> */}
      </div>
      <svg
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