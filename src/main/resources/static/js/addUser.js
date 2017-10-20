var form;
layui.config({
	base : '../js/',
	version : new Date().getTime()
}).use(['paging','form','laytpl'], function() {
	var $ = layui.jquery,
		layer = layui.layer, //获取当前窗口的layer对象
		paging = layui.paging(),
		laytpl = layui.laytpl,
		form = layui.form();
		
		findRoleList($,layer,layui); // 获取角色列表
		findStructureList(1,$,layui,layer); // 获取生列表
		
		form.on('select(role)', function(data){
			var roleId = data.value;
			if(roleId==2){//管理员
				$("#jgOneId").attr('lay-verify',null); 
				$("#jgTwoId").attr('lay-verify',null); 
				$("#centerId").attr('lay-verify',null);
				$("#title").css('display','none'); 
				$("#jgOne").css('display','none'); 
				$("#jgTwo").css('display','none');
				$("#center").css('display','none');
			}
			if(roleId==3){//用户
				$("#jgOneId").attr('lay-verify',null); 
				$("#jgTwoId").attr('lay-verify',null); 
				$("#centerId").attr('lay-verify',null);
				$("#title").css('display','block'); 
				$("#jgOne").css('display','block'); 
				$("#jgTwo").css('display','block');
				$("#center").css('display','none');
			}
			if(roleId==4){//质检员
				$("#jgOneId").attr('lay-verify','required'); 
				$("#jgTwoId").attr('lay-verify','required'); 
				$("#centerId").attr('lay-verify','required'); 
				$("#title").css('display','block');
				$("#jgOne").css('display','block');
				$("#jgTwo").css('display','block');
				$("#center").css('display','block');
				
				form.on('select(jgOne)', function(data){
					var jgOneId = data.value;
					findSecStructureList(jgOneId,$,layui);
				});
				form.on('select(jgTwo)', function(data){
					var jgTwoId = data.value;
					findCenterList(jgTwoId,$,layui);
				});
			}
			$("#jgOneId").val("");
			layui.form().render('select');
			
		});
		
		//提交
		form.on('submit(submit)', function(data){
			var userNm = $("#userNm").val();
			var jgOneId = $("#jgOneId").val()||0;
			var jgTwoId = $("#jgTwoId").val()||0;
			var centerId = $("#centerId").val()||0;
			var roleId = $("#roleId").val();
			var userAccount = $("#userAccount").val();
			var sex = $("#sexId").val();
			var pwd = $("#pwd").val();
			var phone = $("#phone").val();
			$.post('../user/saveUser.do',{
				userNm:userNm,
				pwd:pwd,
				phone:phone,
				sex:sex,
				userAccount:userAccount,
				jgOneId:jgOneId,
				jgTwoId:jgTwoId,
				centerId:centerId,
				roleId:roleId
			},function(data){
				var code = data.code;
				if(code==1000){
					var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
					parent.layer.close(index); //再执行关闭  
				}
				layer.msg(data.msg);
			},'json');
		});
});

/*
 *获取角色列表
 */
function findRoleList($,layer,layui){
	$.post('../user/findRoleList.do',{},function(data){
		var code = data.code;
		if(code==1000){
			var optionstring = "";
			$.each(data.data, function(i,role){
				optionstring += "<option value=\"" + role.id + "\" >" + role.name + "</option>";
			});
			$("#roleId").html('<option value="">请选择角色</option>' + optionstring);
			layui.form().render('select');
		}else{
			layer.msg(data.msg);
		}
	},"json")
}

/*
 * 架构列表
 */
function findStructureList(pid,$,layui,layer){
	$.post('../user/findStructureList.do',{
		pid:pid
	},function(data){
		var code = data.code;
		if(code==1000){
			var optionstring = "";
			$.each(data.data, function(i,structure){
				optionstring += "<option value=\"" + structure.id + "\" >" + structure.name + "</option>";
			});
			$("#jgOneId").html('<option value="">请选择大区</option><option value="">全集团</option>' + optionstring);
			layui.form().render('select');
		}else{
			layer.msg(data.msg);
		}
	},'json');
};

/*
 *  二级架构列表
 */
function findSecStructureList(jgOneId,$,layui){
	$.post('../user/findStructureList.do',{
		pid:jgOneId
	},function(data){
		var code = data.code;
		if(code==1000){
		var optionstring = "";
        $.each(data.data, function(i,secStructure){
            optionstring += "<option value=\"" + secStructure.id + "\" >" + secStructure.name + "</option>";
        });
        $("#jgTwoId").html('<option value="">请选择二级大区</option>' + optionstring);
        layui.form().render('select');
		}else{
			layui.msg(data.msg);
		}
	},'json');
};

/*
 * 餐饮中心列表
 */
function findCenterList(jgTwoId,$,layui){
	$.post('../user/findCenterList.do',{
		pid:jgTwoId
	},function(data){
		var code = data.code;
		if(code==1000){
		var optionstring = "";
		$.each(data.data, function(i,center){
			optionstring += "<option value=\"" + center.id + "\" >" + center.name + "</option>";
		});
		$("#centerId").html('<option value="">请选择餐饮中心</option>' + optionstring);
		layui.form().render('select');
		}else{
			layui.msg(data.msg);
		}
	},'json');
};