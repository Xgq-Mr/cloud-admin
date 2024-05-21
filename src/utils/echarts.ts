

import * as echarts from 'echarts';
// 获取分类销售统计折线图
export const categoryDataApi = (ref: any, data: any) => {
    var myChart = echarts.init(ref);
    var option;
    option = {
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    option.series[0].data = data
    option && myChart.setOption(option);
}


// 30天销售趋势
export const SaleDataApi = (ref: any, data: any) => {
    var myChart = echarts.init(ref);
    var option;
    option = {

        legend: {
            data: ['订单数', '销售额', '退款额', '充值额', 'Search Engine']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },


        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },

        series: [
            {
                name: '订单数',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '销售额',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '退款额',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '充值额',
                type: 'line',
                stack: 'Total',
                data: [320, 332, 301, 334, 390, 330, 320]
            },

        ]
    };
    option.xAxis.data = data.last30Days
    option.series[0].data = data.orderNumList
    option.series[1].data = data.saleMoneyList
    option.series[2].data = data.returnMoneyList
    option.series[3].data = data.rechargeMoneyList
    option && myChart.setOption(option);

}


// 会员消费TOP10
export const MemberDataApi = (ref: any, data: any) => {
    var myChart = echarts.init(ref);
    var option;

    option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }
        ]
    };
    option.xAxis.data = data.map((item: any) => item.name)
    option.series[0].data = data.map((item: any) => item.consumeMoney)

    option && myChart.setOption(option);
}


// 气温仪表盘
export const InstrumentApi = (ref: any) => {
    var myChart = echarts.init(ref);
    var option;

    option = {
        series: [
            {
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: 60,
                splitNumber: 12,
                itemStyle: {
                    color: '#FFAB91'
                },
                progress: {
                    show: true,
                    width: 30
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        width: 30
                    }
                },
                axisTick: {
                    distance: -45,
                    splitNumber: 5,
                    lineStyle: {
                        width: 2,
                        color: '#999'
                    }
                },
                splitLine: {
                    distance: -52,
                    length: 14,
                    lineStyle: {
                        width: 3,
                        color: '#999'
                    }
                },
                axisLabel: {
                    distance: -20,
                    color: '#999',
                    fontSize: 20
                },
                anchor: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    width: '60%',
                    lineHeight: 40,
                    borderRadius: 8,
                    offsetCenter: [0, '-15%'],
                    fontSize: 30,
                    fontWeight: 'bolder',
                    formatter: '{value} °C',
                    color: 'inherit'
                },
                data: [
                    {
                        value: 20
                    }
                ]
            },
            {
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: 60,
                itemStyle: {
                    color: '#FD7347'
                },
                progress: {
                    show: true,
                    width: 8
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                detail: {
                    show: false
                },
                data: [
                    {
                        value: 20
                    }
                ]
            }
        ]
    };
    setInterval(function () {
        const random = +(Math.random() * 60).toFixed(2);
        myChart.setOption({
            series: [
                {
                    data: [
                        {
                            value: random
                        }
                    ]
                },
                {
                    data: [
                        {
                            value: random
                        }
                    ]
                }
            ]
        });
    }, 2000);

    option && myChart.setOption(option);

}