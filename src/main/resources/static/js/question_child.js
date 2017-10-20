layui.config({
	base : '../js/',
	version : new Date().getTime()
}).use(['paging','laydate','form'], function() {
	var $ = layui.jquery,
		paging = layui.paging(),
		layerTips = parent.layer === undefined ? layui.layer : parent.layer, //获取父窗口的layer对象
		layer = layui.layer, //获取当前窗口的layer对象
		laydate = layui.laydate,
		form = layui.form();
	
	form.render("select");
	laydate.render({
	    elem: '#addTime' //指定元素
	});

	//页面分页列表
	var questionNm =$("#questionNm").val();
	var addTime =$("#addTime").val();
	var sequence =$("#sequence").val()||-1;
	pagingInit();//页面初始化数据

	//搜索
	$('#search').on('click', function() {
		questionNm =$("#questionNm").val();
		addTime =$("#addTime").val();
		sequence =$("#sequence").val()||-1;
		pagingInit();
	});
	var addBoxIndex = -1;
	//添加问题项
	$('#add').on('click', function() {
		questionNm =$("#questionNm").val();
		addTime =$("#addTime").val();
		sequence =$("#sequence").val()||-1;
		if(addBoxIndex !== -1){
			return;
		}
		addBoxIndex = layer.open({
			type: 2,
			title: '添加问题项',
			shade: false,
			offset: ['105px', '25%'],
			area: ['750px', '500px'],
			zIndex: 19950924,
			maxmin: true,
			content:'../question/addQuestionIndex.do?pid='+pid,
			end: function() {
				pagingInit();
				addBoxIndex = -1;
			}
		});
	});
	
	/**
	 * 页面数据初始化加载
	 */
	function pagingInit(){
		paging.init({
			url: '../question/findQuestionListByPid.do?', //地址
			elem: '#question', //内容容器
			params: { //发送到服务端的参数
				questionNm:questionNm,
				sequence:sequence,
				pid:pid,
				addTime:addTime
			},
			openWait: true, //加载数据时是否显示等待框 
			type: 'post',
			tempElem: '#questionTpl', //模块容器
			pageConfig: { //分页参数配置
				elem: '#paged', //分页容器
				pageSize:8 //分页大小
			},
			success: function() { //渲染成功的回调
			
			},
			fail: function(msg) { //获取数据失败的回调
				layer,msg('获取数据失败')
			},
			complate: function() { //完成的回调
				bind();
			},
		});
	}
	
	
	/**
	 * 绑定页面事件
	 */
	function bind(){
		//重新渲染复选框
		form.render('checkbox');
		form.on('checkbox(allselector)', function(data) {
			var elem = data.elem;
			$('#question').children('tr').each(function() {
				var $that = $(this);
				//全选或反选
				$that.children('td').eq(0).children('input[type=checkbox]')[0].checked = elem.checked;
				form.render('checkbox');
			});
		});
	
		//绑定所有编辑按钮事件						
		$('#content').children('tr').each(function() {
			var $that = $(this);
			$that.children('td:last-child').children('a[data-name=edit]').on('click', function() {
				layer.msg($(this).data('name'));
			});
		});
			
		//绑定所有删除事件
		$('.del').on('click', function(){
			var questionId = $(this).attr("data-id");
			layer.confirm('确定删除该问题项?', function(index){
				//向服务端发送删除指令
				$.post("../question/delQuestionById.do",{
					id:questionId
				},function(data){
					layer.close(index);
					var code =  data.code;
					if(data.code==1000){
						pagingInit();
					}
					layer.msg(data.msg);
				},"json"); 
			});
		})
		
		var editBoxIndex=-1;
		//绑定所有编辑事件
		$('.edit').on('click', function(){
			var id = $(this).attr("data-id");
			if(addBoxIndex !== -1){
				return;
			}
			addBoxIndex = layer.open({
				type: 2,
				title: '编辑问题项',
				shade: false,
				offset: ['105px', '25%'],
				area: ['750px', '500px'],
				zIndex: 19950924,
				maxmin: true,
				content:'../question/editQuestionIndex.do?id='+id+"&pid="+pid,
				end: function() {
					pagingInit();
					addBoxIndex = -1;
				}
			});
		})
	}
});