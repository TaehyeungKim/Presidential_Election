import Moon_19 from '../images/candidates/19/19MoonJaeIn.jpg' 
import Hong_19 from '../images/candidates/19/19HongJoonPyo.jpg'
import Ahn_19 from '../images/candidates/19/19Ahn.jpg'
import Yoo_19 from '../images/candidates/19/19Yoo.jpg'
import Sim_19 from '../images/candidates/19/19Sim.jpg'

import Park_18 from '../images/candidates/18/18Park.jpg'
import Moon_18 from '../images/candidates/18/18Moon.jpg'

import Jung_17 from '../images/candidates/17/17Jung.jpg';
import Lee_17 from '../images/candidates/17/17Lee.jpg';
import LHC_17 from '../images/candidates/17/17LHC.jpg'

import Lee_16 from '../images/candidates/16/16Lee.jpg';
import Roh_16 from '../images/candidates/16/16Roh.jpg';

import Kim_15 from '../images/candidates/15/15Kim.jpg';
import Lee_15 from '../images/candidates/15/15Lee.jpg';
import LIJ_15 from '../images/candidates/15/15LIJ.jpg'

import DJ_14 from '../images/candidates/14/14DJ.jpg';
import YS_14 from '../images/candidates/14/14YS.jpg';
import JY_14 from '../images/candidates/14/14JY.jpg';

import TW_13 from '../images/candidates/13/13TW.jpg';
import YS_13 from '../images/candidates/13/13YS.jpg';
import DJ_13 from '../images/candidates/13/13DJ.jpg'
import JP_13 from '../images/candidates/13/13JP.jpg'


const candidates = [
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