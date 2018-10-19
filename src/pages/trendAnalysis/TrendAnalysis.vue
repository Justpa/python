<template>
  <div class="h-per-100 flex-column no-overflow trendAnalysis-class">
    <div class="flex-shrink">
      <x-header style="background-color: #013695">
        <a slot="overwrite-left" class="font-size-16 flex-row m-l-negative-16" @click="goback">
          <div class="h-40">
            <img src="../../assets/img/back.png" class="header-left-btn"/>
          </div>
          <div class="m-l-negative-5">{{$t("message.back")}}</div>
        </a>
        {{$t('message.trendAnalysis')}}
      </x-header>
    </div>
    <div class="flex-grow flex-column p-a-10 bg-gray-light overflow-y-scroll">
      <div>
        <div :id='chartId1' class="h-250"></div>
        <div class="legend-chart1-bg-class flex-row">
          <div class="flex-row justify-content-center align-items-center flex-1 ">
            <div class="chart1-legend1-before"></div>
            <div class="color-white font-size-12 m-l-5">{{$t('message.grossIncome')}}</div>
          </div>
          <div class="flex-row align-items-center justify-content-center flex-1">
            <div class="chart1-legend2-before"></div>
            <div class="color-white font-size-12 m-l-5">{{$t('message.totalDeduction')}}</div>
          </div>
          <div class="flex-row align-items-center justify-content-center flex-1">
            <div class="chart1-legend3-before"></div>
            <div class="color-white font-size-12 m-l-5">{{$t('message.withHoldingTax')}}</div>
          </div>
        </div>
      </div>

      <div class="m-t-20">
        <div class="flex-row justify-content-space-between p-a-5">
          <div class="color-kpmgBlue font-size-16 font-weight">{{$t('message.grossIncomeU')}}</div>
          <div class="flex-row">
            <div class="flex-row align-items-center">
              <div class="legend-before-class bg-chart2-first"></div>
              <div class="legend-class m-l-5">{{$t('message.thisYear')}}</div>
            </div>
            <div class="flex-row align-items-center m-l-10">
              <div class="legend-before-class bg-chart2-last"></div>
              <div class="legend-class m-l-5">{{$t('message.lastYear')}}</div>
            </div>
          </div>
        </div>
        <div :id='chartId2' class="h-200"></div>
      </div>
      <div class="m-t-20">
        <div class="flex-row justify-content-space-between p-a-5">
          <div class="color-kpmgBlue font-size-16 font-weight">{{$t('message.totalDeductionU')}}</div>
          <div class="flex-row">
            <div class="flex-row align-items-center">
              <div class="legend-before-class bg-chart3-first"></div>
              <div class="legend-class m-l-5">{{$t('message.thisYear')}}</div>
            </div>
            <div class="flex-row align-items-center m-l-10">
              <div class="legend-before-class bg-chart3-last"></div>
              <div class="legend-class m-l-5">{{$t('message.lastYear')}}</div>
            </div>
          </div>
        </div>
        <div :id='chartId3' class="h-200"></div>
      </div>
      <div class="m-t-20">
        <div class="flex-row justify-content-space-between p-a-5">
          <div class="color-kpmgBlue font-size-16 font-weight">{{$t('message.withHoldingTaxU')}}</div>
          <div class="flex-row">
            <div class="flex-row align-items-center">
              <div class="legend-before-class bg-chart4-first"></div>
              <div class="legend-class m-l-5">{{$t('message.thisYear')}}</div>
            </div>
            <div class="flex-row align-items-center m-l-10">
              <div class="legend-before-class bg-chart4-last"></div>
              <div class="legend-class m-l-5">{{$t('message.lastYear')}}</div>
            </div>
          </div>
        </div>
        <div :id='chartId4' class="h-200"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import {queryAnnualOverallAnalysis, queryAnnualDetailTrends} from './trendAnalysisApi'

export default {
  name: 'TrendAnalysis',
  data () {
    return {
      chartId1: 'chart1',
      chartValue1: null,
      chartId2: 'chartId2',
      chartValue2: null,
      chartId3: 'chartId3',
      chartValue3: null,
      chartId4: 'chartId4',
      chartValue4: null,
      currentYear: '',
      lastYear: '',
      allMonths: {},
      chart1Months: [],
      chart1TotalAmount: [],
      chart1TotalDeductionAmount: [],
      chart1WithholdingAmount: [],
      chart2LastYearData: [],
      chart2CurrentYearData: [],
      chart2Months: [],
      chart3LastYearData: [],
      chart3CurrentYearData: [],
      chart3Months: [],
      chart4LastYearData: [],
      chart4CurrentYearData: [],
      chart4Months: [],
      plotLinesList: []
    }
  },
  mounted () {
    this.currentYear = (new Date()).getFullYear()
    this.lastYear = this.currentYear - 1
    this.allMonth = {
      '01': this.$t('message.shortJanuaryU'),
      '02': this.$t('message.shortFebruaryU'),
      '03': this.$t('message.shortMarchU'),
      '04': this.$t('message.shortAprilU'),
      '05': this.$t('message.shortMayU'),
      '06': this.$t('message.shortJuneU'),
      '07': this.$t('message.shortJulyU'),
      '08': this.$t('message.shortAugustU'),
      '09': this.$t('message.shortSeptemberU'),
      '10': this.$t('message.shortOctoberU'),
      '11': this.$t('message.shortNOVU'),
      '12': this.$t('message.shortDecemberU')
    }
    this.initData()
  },
  methods: {
    goback () {
      history.back()
    },
    initData () {
      queryAnnualOverallAnalysis({employeeId: JSON.parse(window.localStorage.getItem('userInfo'))['employeeId'], year: this.currentYear}).then(res => {
        if (res['success']) {
          res['data'].forEach(item => {
            this.chart1Months.push(this.allMonth[item['month']])
            this.chart1TotalAmount.push(item['totalAmount'])
            this.chart1TotalDeductionAmount.push(item['totalDeductionAmount'])
            this.chart1WithholdingAmount.push(item['withholdingAmount'])
          })
          this.initChart1()
          queryAnnualDetailTrends({employeeId: JSON.parse(window.localStorage.getItem('userInfo'))['employeeId'], year: this.currentYear}).then(result => {
            if (result['success']) {
              result['data'].forEach((item, idx) => {
                if (item['year'] === this.lastYear.toString()) {
                  this.chart2LastYearData.push(item['totalAmount'])
                  this.chart3LastYearData.push(item['totalDeductionAmount'])
                  this.chart4LastYearData.push(item['withholdingAmount'])
                  this.chart2Months.push(this.allMonth[item['month']])
                  this.chart3Months.push(this.allMonth[item['month']])
                  this.chart4Months.push(this.allMonth[item['month']])
                  this.plotLinesList.push({
                    color: '#8794a7',
                    width: 0.3,
                    value: idx
                  })
                } else {
                  this.chart2CurrentYearData.push(item['totalAmount'])
                  this.chart3CurrentYearData.push(item['totalDeductionAmount'])
                  this.chart4CurrentYearData.push(item['withholdingAmount'])
                }
              })
              this.initChart2()
              this.initChart3()
              this.initChart4()
            }
          })
        }
      })
    },
    initChart1 () {
      this.chartValue1 = new Highcharts.Chart(this.chartId1, {
        chart: {
          type: 'column',
          backgroundColor: '#50166F',
          borderRadius: '5px'
        },
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: this.chart1Months,
          crosshair: true,
          tickWidth: 0,
          lineWidth: 0,
          labels: {
            style: {
              color: '#FFFFFF'
            }
          },
          lineColor: '#999'
        },
        yAxis: {
          tickWidth: 0,
          gridLineWidth: 0,
          labels: {
            enabled: false
          },
          title: {
            text: ''
          }
        },
        tooltip: {
          // head + 每个 point + footer 拼接成完整的 table
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:black;padding:0;text-align: left">{series.name}: </td>' +
          // pointFormat: '<tr><td style="color:{series.color};padding:0;text-align: left">{series.name}: </td>' +
          '<td style="padding:0;text-align: right"><b>{point.y}</b></td></tr>',
          // '<td style="padding:0;text-align: right"><b>{point.y:.1f}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true,
          borderColor: 'white',
          backgroundColor: 'white',
          borderRadius: 5
        },
        plotOptions: {
          column: {
            borderWidth: 0
          }
        },
        series: [ {
          name: this.$t('message.grossIncome'),
          data: this.chart1TotalAmount,
          color: '#F68D2E'
        }, {
          name: this.$t('message.totalDeduction'),
          data: this.chart1TotalDeductionAmount,
          color: '#F7F7F8'
        }, {
          name: this.$t('message.withHoldingTax'),
          data: this.chart1WithholdingAmount,
          color: '#71438A'
        }],
        legend: {
          backgroundColor: '#50166F',
          borderRadius: '5px',
          itemStyle: {
            color: '#FFFFFF'
          },
          symbolRadius: 0,
          itemDistance: 0,
          enabled: false
        },
        credits: {
          enabled: false
        }
      })
    },
    initChart2 () {
      this.chartValue2 = new Highcharts.Chart(this.chartId2, {
        chart: {
          type: 'line',
          borderRadius: '5px'
        },
        title: {
          text: '',
          floating: 'left',
          align: 'left',
          style: {
            color: '#013695',
            fontSize: '16'
          },
          y: 15
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: this.chart2Months,
          tickWidth: 0,
          lineWidth: 0,
          enabled: true,
          gridLineWidth: 0,
          color: '#8794a7',
          plotLines: this.plotLinesList
        },
        yAxis: {
          tickWidth: 0,
          gridLineWidth: 0,
          labels: {
            enabled: false
          },
          title: {
            text: ''
          },
          enabled: false,
          color: '#8794a7'
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        plotOptions: {
          line: {
            dataLabels: {
              color: '#8794a7',
              // 开启数据标签
              enabled: true
            },
            marker: {
              radius: 2,
              lineColor: '#666666',
              lineWidth: 0
            }
          }
        },
        series: [{
          name: this.$t('message.thisYear'),
          marker: {
            symbol: 'circle',
            radius: 3
          },
          data: this.chart2CurrentYearData,
          color: '#0091DA',
          lineWidth: 2
        }, {
          name: this.$t('message.lastYear'),
          marker: {
            symbol: 'square',
            radius: 3
          },
          data: this.chart2LastYearData,
          color: '#61C152',
          lineWidth: 2
        }],
        legend: {
          verticalAlign: 'top',
          align: 'right',
          y: -20,
          enabled: false,
          itemStyle: {
            color: '#8794a7',
            fontWeight: '200'
          },
          itemDistance: 10
        },
        credits: {
          enabled: false
        }
      })
    },
    initChart3 () {
      this.chartValue3 = new Highcharts.Chart(this.chartId3, {
        chart: {
          type: 'line',
          borderRadius: '5px'
        },
        title: {
          text: '',
          floating: 'left',
          align: 'left',
          style: {
            color: '#013695',
            fontSize: '16'
          },
          y: 15
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: this.chart3Months,
          tickWidth: 0,
          lineWidth: 0,
          enabled: true,
          gridLineWidth: 0,
          color: '#8794a7',
          plotLines: this.plotLinesList
        },
        yAxis: {
          tickWidth: 0,
          gridLineWidth: 0,
          labels: {
            enabled: false
          },
          title: {
            text: ''
          },
          enabled: false,
          color: '#8794a7'
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        plotOptions: {
          line: {
            dataLabels: {
              color: '#8794a7',
              // 开启数据标签
              enabled: true
            },
            marker: {
              radius: 2,
              lineColor: '#666666',
              lineWidth: 0
            }
          }
        },
        series: [{
          name: this.$t('message.thisYear'),
          marker: {
            symbol: 'circle',
            radius: 3
          },
          data: this.chart3CurrentYearData,
          color: '#F8A860',
          lineWidth: 2
        }, {
          name: this.$t('message.lastYear'),
          marker: {
            symbol: 'square',
            radius: 3
          },
          data: this.chart3LastYearData,
          color: '#D88AE1',
          lineWidth: 2
        }],
        legend: {
          verticalAlign: 'top',
          align: 'right',
          y: -20,
          enabled: false,
          itemStyle: {
            color: '#8794a7',
            fontWeight: '200'
          },
          itemDistance: 10
        },
        credits: {
          enabled: false
        }
      })
    },
    initChart4 () {
      this.chartValue2 = new Highcharts.Chart(this.chartId4, {
        chart: {
          type: 'line',
          borderRadius: '5px'
        },
        title: {
          text: '',
          // text: this.$t('message.withHoldingTaxU'),
          floating: 'left',
          align: 'left',
          style: {
            color: '#013695',
            fontSize: '0.32rem'
          },
          y: 15
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: this.chart4Months,
          tickWidth: 0,
          lineWidth: 0,
          enabled: true,
          gridLineWidth: 0,
          color: '#8794a7',
          plotLines: this.plotLinesList
        },
        yAxis: {
          tickWidth: 0,
          gridLineWidth: 0,
          labels: {
            enabled: false
          },
          title: {
            text: ''
          },
          enabled: false,
          color: '#8794a7'
        },
        tooltip: {
          crosshairs: true,
          shared: true
        },
        plotOptions: {
          line: {
            dataLabels: {
              color: '#8794a7',
              // 开启数据标签
              enabled: true
            },
            marker: {
              radius: 2,
              lineColor: '#666666',
              lineWidth: 0
            }
          }
        },
        series: [{
          name: this.$t('message.thisYear'),
          marker: {
            symbol: 'circle',
            radius: 3
          },
          data: this.chart4CurrentYearData,
          color: '#483698',
          lineWidth: 2
        }, {
          name: this.$t('message.lastYear'),
          marker: {
            symbol: 'square',
            radius: 3
          },
          data: this.chart4LastYearData,
          color: '#00A3A1',
          lineWidth: 2
        }],
        legend: {
          verticalAlign: 'top',
          align: 'right',
          y: -20,
          enabled: false,
          itemStyle: {
            color: '#8794a7',
            fontWeight: '200',
            itemWidth: 30
          },
          itemDistance: 10
        },
        credits: {
          enabled: false
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
  @import '../../assets/style/variables/color';
  .h-250{
    height: 4rem;
  }
  .h-200{
    height: 4rem;
  }
  .font-weight{
    font-weight: bold;
  }
  .legend-before-class{
    width: 0.4rem;
    height: 0.1rem;
    background-color: #0bb20c;
  }
  .legend-class{
    font-size: 0.24rem;
    color: #8794a7;
  }
  .chart1-legend1-before{
    width: 0.24rem;
    height: 0.24rem;
    background-color: $orange1;
  }
  .chart1-legend2-before{
    width: 0.24rem;
    height: 0.24rem;
    background-color: #fff;
  }
  .chart1-legend3-before{
    width: 0.24rem;
    height: 0.24rem;
    background-color: $trendPurpleLighter;
  }
  .legend-chart1-bg-class{
    background-color: $chartPurple;
    width: 100%;
    height: 1rem;
    border-radius: 5px;
    margin-top: -1px;
    border-top: 1px dashed #fff;
  }
  .bg-chart2-first{
    background-color: $trendBlue;
  }
  .bg-chart2-last{
    background-color: $trendGreen;
  }
  .bg-chart3-first{
    background-color: $trendOrange;
  }
  .bg-chart3-last{
    background-color: $trendPink;
  }
  .bg-chart4-first{
    background-color: $perDtlsBannerBg;
  }
  .bg-chart4-last{
    background-color: $greenLitter;
  }
</style>
