var time=-1;
var myChart=-1;
layui.config({
	base : '../js/',
	version : new Date().getTime()
}).use(['paging','laydate','form'], function() {
	var $ = layui.jquery,
		layer = layui.layer, //获取当前窗口的layer对象
		laydate = layui.laydate;
	
		//日期范围
		laydate.render({
		  elem: '#time'
		  ,range: true
		});
	time = $("#time").val();
	// 基于准备好的dom，初始化echarts实例
	myChart = echarts.init(document.getElementById('main'));
	echartsInit($);
	//搜索
	$('#search').on('click', function(){
		time = $("#time").val();
		echartsInit($);
	});
	
	
	
});

/**
 * 图表展示
 * @param $
 */
function echartsInit($){
	$.get('../statement/findData.do?pid='+pid+"&time="+time).done(function(data) {
		var code = data.code;
		if(code!=1000){
			layer.msg(data.msg);
			return;
		}else{
		  	var option = {
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:[
			        
			        ]
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line', 'bar']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    xAxis : {
			        
			            type : 'category',
			            data : []
			        
			    },
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			              
			    ],
			    dataZoom: [
			               {
			                   show: true,
			                   start: 0,
			                   end: 100
			               },
			               {
			                   type: 'inside',
			                   start: 0,
			                   end: 100
			               },
			               {
			                   show: true,
			                   yAxisIndex: 0,
			                   filterMode: 'empty',
			                   width: 30,
			                   height: '80%',
			                   showDataShadow: false,
			                   left: '93%'
			               }
			           ]
			};
		  	var list = data.data.questionList;
		  	var structureList = data.data.structureList;
		  	for(var i=0;i<list.length;i++){
		  		var questioin = list[i];
		  		option.xAxis.data.push(questioin.questionNm);
		  	};
		  	for (var i = 0; i < structureList.length; i++) {
				var structure = structureList[i];
				var questionList = structure.questionList;
				var count=[];
				for (var j = 0; j < questionList.length; j++) {
					var question = questionList[j];
					count.push(question.count)
				}
				option.legend.data.push(structure.name);
				var ser={
			            name:structure.name,
			            type:'bar',
			            data:count,
			            itemStyle : { normal: {label : {show: true, position: 'top'}}},
			            markLine : {
			                data : [
			                    {type : 'average', name: '平均值'}
			                ]
			            }
			        };
				option.series.push(ser);
			}
			myChart.setOption(option);
		}
	});
}