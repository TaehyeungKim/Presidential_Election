import LJM_20 from '../images/candidates/20/20LJM_t.webp'
import YSY_20 from '../images/candidates/20/20YSY_t.webp'
// import SSJ_20 from '../images/candidates/20/20SSJ_t.webp'
// import OJH_20 from '../images/candidates/20/20OJH_t.webp'
// import HGY_20 from '../images/candidates/20/20HGY_t.webp'
// import LBY_20 from '../images/candidates/20/20LBY_t.webp'
// import OEH_20 from '../images/candidates/20/20OEH_t.webp'
// import CWJ_20 from '../images/candidates/20/20CWJ_t.webp'
// import KJY_20 from '../images/candidates/20/20KJY_t.webp'
// import KKJ_20 from '../images/candidates/20/20KKJ_t.webp'
// import KMC_20 from '../images/candidates/20/20KMC_t.webp'
// import LKH_20 from '../images/candidates/20/20LKH_t.webp'

import Moon_19 from '../images/candidates/19/19MoonJaeIn_t.webp' 
import Hong_19 from '../images/candidates/19/19HongJoonPyo_t.webp'
import Ahn_19 from '../images/candidates/19/19Ahn_t.webp'
import Yoo_19 from '../images/candidates/19/19Yoo_t.webp'
import Sim_19 from '../images/candidates/19/19Sim_t.webp'

import Park_18 from '../images/candidates/18/18Park_t.webp'
import Moon_18 from '../images/candidates/18/18Moon_t.webp'

import Jung_17 from '../images/candidates/17/17Jung_t.webp';
import Lee_17 from '../images/candidates/17/17Lee_t.webp';
import LHC_17 from '../images/candidates/17/17LHC_t.webp'

import Lee_16 from '../images/candidates/16/16Lee_t.webp';
import Roh_16 from '../images/candidates/16/16Roh_t.webp';

import Kim_15 from '../images/candidates/15/15Kim_t.webp';
import Lee_15 from '../images/candidates/15/15Lee_t.webp';
import LIJ_15 from '../images/candidates/15/15LIJ_t.webp'

import DJ_14 from '../images/candidates/14/14DJ_t.webp';
import YS_14 from '../images/candidates/14/14YS_t.webp';
import JY_14 from '../images/candidates/14/14JY_t.webp';

import TW_13 from '../images/candidates/13/13TW_t.webp';
import YS_13 from '../images/candidates/13/13YS_t.webp';
import DJ_13 from '../images/candidates/13/13DJ_t.webp'
import JP_13 from '../images/candidates/13/13JP_t.webp'


const candidates = [
    {number: 20, candidates: {
        "이재명": {image: LJM_20, colorId: "LeeTwenty"},
        "윤석열": {image: YSY_20, colorId: "YoonTwenty"},
        "심상정": {colorId: "SimTwenty"},
        // "오준호": {colorId: ""},
        // "허경영": {image: HGY_20, colorId: ""},
        // "조원진": {image: CWJ_20, colorId: ""},
        // "김재연": {image: KJY_20, colorId: ""},
        // "김민찬": {image: KMC_20, colorId: ""},
        // "이백윤": {image: LBY_20, colorId: ""},
        // "이경희": {image: LKH_20, colorId: ""},
        // "옥은호": {image: OEH_20, colorId: ""},
        // "김경재": {image: KKJ_20, colorId: ""}
    }},
    {number: 19, candidates: {
        "문재인": {image: Moon_19, colorId: "MoonNine"},
        "홍준표": {image: Hong_19, colorId: "HongNine"},
        "안철수": {image: Ahn_19, colorId: "AhnNine"},
        "유승민": {image: Yoo_19, colorId: "YooNine"},
        "심상정": {image: Sim_19, colorId: "SimNine"}
    }},
    {number: 18, candidates: {
        "박근혜": {image: Park_18, colorId:"ParkEight"},
        "문재인": {image: Moon_18, colorId:"MoonEight"}
    }},
    {number: 17, candidates: {
        "정동영": {image: Jung_17, colorId:"DYSeven"},
        "이명박": {image: Lee_17, colorId:"MBSeven"},
        "이회창": {image: LHC_17, colorId:"HCSeven"}
    }},
    {number: 16, candidates: {
        "이회창": {image: Lee_16, colorId:"HCSix"},
        "노무현": {image: Roh_16, colorId:"MHSix"}
    }},
    {number: 15, candidates: {
        "김대중": {image: Kim_15, colorId:"DJFive"},
        "이회창": {image: Lee_15, colorId:"HCFive"},
        "이인제": {image: LIJ_15, colorId:"IJFive"}
    }},
    {number: 14, candidates: {
        "김대중": {image: DJ_14, colorId:"DJFour"},
        "김영삼": {image: YS_14, colorId:"YSFour"},
        "정주영": {image: JY_14, colorId:"JYFour"}
    }},
    {number: 13, candidates: {
        "노태우":{image: TW_13, colorId:"TWThree"},
        "김영삼":{image: YS_13, colorId:"YSThree"},
        "김대중":{image: DJ_13, colorId:"DJThree"},
        "김종필":{image: JP_13, colorId:"JPThree"}
    }}
]

export default candidates;