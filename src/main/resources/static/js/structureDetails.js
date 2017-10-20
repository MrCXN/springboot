var time='-1';
var myChart=-1;
layui.config({
	base : '../js/',
	version : new Date().getTime()
}).use(['form','laytpl'], function() {
	var $ = layui.jquery,
		layer = layui.layer, //获取当前窗口的layer对象
		laytpl = layui.laytpl,
		form = layui.form();
	
	myChart = echarts.init(document.getElementById('main'));

	//echarts初始化
	echartsInit();
	//数据初始化
	
	//搜索
	$('#search').on('click', function() {
		time = $("#time").val();
		echartsInit();
	});
	
	/**
	 * 图表展示
	 */
	function echartsInit(){
		$.get('../diagram/findDetails.do?questionId='+questionId+"&pid="+pid+"&time="+time+"&type="+type).done(function(data) {
			var code = data.code;
			if(code!=1000){
				layer.msg(data.msg);
				return;
			}else{
				var list = data.data.structureList;
				var type = data.data.type;
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
			  	var count=[];
			  	for(var i=0;i<list.length;i++){
			  		var question = list[i];
			  		count.push(question.count)
			  		option.xAxis.data.push(question.name);
			  		
			  	};
			  	var ser={
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
			  	myChart.setOption(option);
			  	var getTpl = tpl.innerHTML
				,view = document.getElementById('content');
				laytpl(getTpl).render(data, function(html){
				  view.innerHTML = html;
				  $('.select').on('click', function() {
					  var pid = $(this).attr("data-id");
					  var name = $(this).attr("data-name");
					  var data ={
								"title": name+"问题查看",
								"icon": "&#xe615",
								"href": "../diagram/findSecStructureIndex.do?questionId="+questionId+"&type="+type+"&pid="+pid+"&time="+time,
								"spread": true
							};
					window.parent.tab.tabAdd(data);
				  });
				});
			}
		});
	}
});