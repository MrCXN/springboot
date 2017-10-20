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

	laydate.render({
	    elem: '#addTime' //指定元素
	});

	//页面分页列表
	var userNm =$("#userNm").val();
	var addTime =$("#addTime").val();
	pagingInit();//页面初始化数据

	//搜索
	$('#search').on('click', function() {
		userNm =$("#userNm").val();
		addTime =$("#addTime").val();
		pagingInit();
	});
	var addBoxIndex = -1;
	//添加餐饮中心
	$('#add').on('click', function() {
		userNm =$("#userNm").val();
		addTime =$("#addTime").val();
		if(addBoxIndex !== -1){
			return;
		}
		addBoxIndex = layer.open({
			type: 2,
			title: '添加用户',
			shade: false,
			offset: ['105px', '25%'],
			area: ['750px', '500px'],
			zIndex: 19950924,
			maxmin: true,
			content:'../user/addUserIndex.do?',
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
			url: '../user/findUserList.do', //地址
			elem: '#user', //内容容器
			params: { //发送到服务端的参数
				userNm:userNm,
				addTime:addTime
			},
			openWait: true, //加载数据时是否显示等待框 
			type: 'post',
			tempElem: '#userTpl', //模块容器
			pageConfig: { //分页参数配置
				elem: '#paged', //分页容器
				pageSize:8 //分页大小
			},
			success: function() { //渲染成功的回调
			
			},
			fail: function(msg) { //获取数据失败的回调
				alert('获取数据失败')
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
			$('#user').children('tr').each(function() {
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
			var id = $(this).attr("data-id");
			layer.confirm('删除此行会影响对应的餐饮中心,确定删除?', function(index){
				//向服务端发送删除指令
				$.post("../user/delUserById.do",{
					id:id
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
				title: '编辑用户',
				shade: false,
				offset: ['105px', '25%'],
				area: ['750px', '500px'],
				zIndex: 19950924,
				maxmin: true,
				content:'../user/editUserIndex.do?id='+id,
				end: function() {
					pagingInit();
					addBoxIndex = -1;
				}
			});
		})
		
	/*	//绑定查看事件
		$('.select').on('click',function(){
			var name = $(this).attr("data-name");
			var id = $(this).attr("data-id");
			var data ={
						"title": name+"查看",
						"icon": "&#xe615",
						"href": "../structure/findSecStructureListIndex.do?pid="+id,
						"spread": true
					};
			window.parent.tab.tabAdd(data);
		});*/
	}
});