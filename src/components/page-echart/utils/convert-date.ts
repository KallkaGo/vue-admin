
import {coordinateData} from './coordinateData'
import type { addressDataType } from "../types";

export const convertData = function(data:addressDataType[]){
    var res = []
    for(const item of data){
        var geoCoord = coordinateData[item.address]
        if(geoCoord){
            res.push({
                name:item.address,
                value:geoCoord.concat(item.count)
            })
        }
    }
    return res
}

