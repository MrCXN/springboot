	layui.config({
	base : '../js/',
	version : new Date().getTime()
}).use(['paging','laydate','form'], function() {
	var $ = layui.jquery,
		paging = layui.paging(),
		layer = layui.layer, //获取当前窗口的layer对象
		laydate = layui.laydate,
		form = layui.form();

	laydate.render({
	    elem: '#addTime' //指定元素
	});

	//页面分页列表
	var name =$("#name").val();
	var addTime =$("#addTime").val();
	pagingInit();

	//搜索
	$('#search').on('click', function() {
		name =$("#name").val();
		addTime =$("#addTime").val();
		pagingInit();
	});

	var addBoxIndex = -1;
	$('#add').on('click', function() {
		name =$("#name").val();
		addTime =$("#addTime").val();
	if(addBoxIndex !== -1)
		return;
	//本表单通过ajax加载 --以模板的形式，当然你也可以直接写在页面上读取
	$.get('../temp/addStructure.html', null, function(form) {
		addBoxIndex = layer.open({
			type: 1,
			title: '添加架构',
			content: form,
			btn: ['保存', '取消'],
			shade: false,
			offset: ['105px', '30%'],
			area: ['600px', '220px'],
			zIndex: 19950924,
			maxmin: false,
			yes: function(index) {
				//触发表单的提交事件
				$('form.layui-form').find('button[lay-filter=add]').click();
			},
			full: function(elem) {
				var win = window.top === window.self ? window : parent.window;
				$(win).on('resize', function() {
					var $this = $(this);
					elem.width($this.width()).height($this.height()).css({
						top: 0,
						left: 0
					});
					elem.children('div.layui-layer-content').height($this.height() - 95);
				});
			},
			success: function(layero, index) {
				//弹出窗口成功后渲染表单
				var form = layui.form();
				form.render();
				form.on('submit(add)', function(data) {
					console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
					console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
					console.log(data.field.name) //当前容器的全部表单字段，名值对形式：{name: value}
					//调用父窗口的layer对象
					//这里可以写post方法提交表单
					$.post("../structure/saveStructure.do",{
						name:data.field.name,
						remark:data.field.remark,
						level:2,
						pid:jgoneId
					},function(data){
						var code=data.code;
						if(code==1000){
							layer.msg(data.msg);
							pagingInit();
							layer.close(addBoxIndex);//关闭对话框
						}else{
							layer.msg(data.msg);
						}
					},"json");
					return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。									
					});
				},
				end: function() {
					addBoxIndex = -1;
				}
			});
		});
	});
	
	/**
	 * 页面数据初始化加载
	 */
	function pagingInit(){
		paging.init({
			url: '../structure/findSecStructureListByPid.do', //地址
			elem: '#content', //内容容器
			params: { //发送到服务端的参数
				name:name,
				addTime:addTime,
				pid:jgoneId
			},
			openWait: true, //加载数据时是否显示等待框 
			type: 'post',
			tempElem: '#tpl', //模块容器
			pageConfig: { //分页参数配置
				elem: '#paged', //分页容器
				pageSize:8 //分页大小
			},
			success: function() { //渲染成功的回调
				bind();
			},
			fail: function(msg) { //获取数据失败的回调
				alert('获取数据失败')
			},
			complate: function() { //完成的回调
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
			$('#content').children('tr').each(function() {
				var $that = $(this);
				//全选或反选
				$that.children('td').eq(0).children('input[type=checkbox]')[0].checked = elem.checked;
				form.render('checkbox');
			});
		});
	
		var editBoxIndex=-1;
		//绑定所有删除事件
		$('.edit').on('click', function(){
			var id = $(this).attr("data-id");
			if(editBoxIndex !== -1)
				return;
			//本表单通过ajax加载 --以模板的形式，当然你也可以直接写在页面上读取
			$.post('../structure/findStructureById.do',{
				id:id
				}, function(data) {
					addBoxIndex = layer.open({
					type: 1,
					title: '编辑架构',
					content: '\<\div style="padding:20px;">'+
								'<div style="margin: 15px;">'+
									'<form class="layui-form">'+
										'<div class="layui-form-item">'+
											'<label class="layui-form-label">架构名称</label>'+
											'<div class="layui-input-block">'+
												'<input type="text" name="name" id="name" value="'+data.name+'" autocomplete="off" class="layui-input">'+
											'</div>'+
										'</div>'+
										'<div class="layui-form-item">'+
											'<label class="layui-form-label">备注详情</label>'+
											'<div class="layui-input-block">'+
												'<input type="text" name="remark" id="remark" value="'+data.remark+'" autocomplete="off" class="layui-input">'+
											'</div>'+
										'</div>'+
										'<button lay-filter="edit" lay-submit style="display: none;"></button>'+
									'</form>'+
								'</div>'+
							'<\/div>',
					btn: ['保存', '取消'],
					shade: false,
					offset: ['100px', '30%'],
					area: ['600px', '230px'],
					zIndex: 19950924,
					maxmin: true,
					yes: function(index) {
						//触发表单的提交事件
						$('form.layui-form').find('button[lay-filter=edit]').click();
					},
					success: function(layero, index) {
						//弹出窗口成功后渲染表单
						var form = layui.form();
						form.render();
						form.on('submit(edit)', function(data) {
							$.post("../structure/editStructureById.do",{
								name:data.field.name,
								remark:data.field.remark,
								id:id
							},function(data){
								var code=data.code;
								if(code==1000){
									layer.msg(data.msg);
									pagingInit();
									layer.close(addBoxIndex);//关闭对话框
								}else{
									layer.msg(data.msg);
								}
							},"json");
							return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。									
						});
					},
					end: function() {
						addBoxIndex = -1;
					}
				});
			});
		});
			
		//绑定所有删除事件
		$('.del').on('click', function(){
			var structureId = $(this).attr("structureId");
			layer.confirm('真的删除行么', function(index){
				//向服务端发送删除指令
				$.post("../structure/delStructureById.do",{
					structureId:structureId
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
		
		//绑定查看事件
		$('.select').on('click',function(){
			 name = $(this).attr("data-name");
			 id = $(this).attr("data-id");
			var data ={
						"title": name+"架构查看",
						"icon": "&#xe615",
						"href": "../center/centerIndex.do?pid="+id+"&jgoneId="+jgoneId,
						"spread": true
					};
			window.parent.tab.tabAdd(data);
		});
	}
});