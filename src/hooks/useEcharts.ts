import * as echarts from "echarts";
import chinaJson from '@/common-ui/echart/data/china.json'

echarts.registerMap('china',chinaJson)
export default function (el: HTMLElement) {
    const Instance = echarts.init(el)
    const setOptions = (options: echarts.EChartsOption) => {
        Instance.setOption(options)
    }

    const UodateResize = () => {
        Instance.resize()
    }


    window.addEventListener('resize', () => {
        Instance.resize()
    })

    return {
        Instance,
        setOptions,
        UodateResize
    }
}