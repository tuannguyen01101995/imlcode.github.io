Highcharts.chart('myChart', {

    title: {
      text: 'Thống kê quản lý trung tâm IMLCODE, 2010-2016'
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
  
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
  
    series: [{
      name: 'Tỷ lệ Người Dùng Đăng ký',
      data: [100,220,300,100,1254,2000,2410,2863]
    }, {
      name: 'Lưu lượng Người Dùng Online',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
      name: 'Lợi nhuận hằng năm',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
      name: 'Doanh thu hằng năm',
      data: [8000, 8512, 7988, 12169, 15112, 22452, 34400, 34227]
    }],
  
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  
  });