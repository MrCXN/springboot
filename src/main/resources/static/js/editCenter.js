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
	
		getProvinceList(0,$,layui);
		form.on('select(province)', function(data){
			var provinceId = data.value;
			findCityList(provinceId,$,layui);
		});
		form.on('select(city)', function(data){
			var cityId = data.value;
			findDistrictList(cityId,$,layui);
		});
		//提交
		form.on('submit(submit)', function(data){
			var name = $("#centerNm").val();
			var provinceId = $("#province").val();
			var cityId = $("#city").val();
			var districtId = $("#district").val();
			var principalId = $("#principal").val();
			$.post('../center/editCenterById.do',{
				id:id,
				name:name,
				provinceId:provinceId,
				cityId:cityId,
				districtId:districtId,
				principalId:principalId
			},function(data){
				var code = data.code;
				if(code==1000){
					var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
					parent.layer.close(index); //再执行关闭  
				}else{
					layer.msg(data.msg);
				}
			},'json');
		});
});


/*
 *获取用户列表
 */
function findUserList($,layui,center){
	$.post('../center/findUserListByRoleId.do',{
		roleId:4 //4质检员
	},function(data){
		var code = data.code;
		if(code==1000){
			var optionstring = "";
			$.each(data.data, function(i,user){
				optionstring += "<option value=\"" + user.id + "\" >" + user.userNm + "</option>";
			});
			$("#principal").html('<option value="">请选择负责人</option>' + optionstring);
			layui.form().render('select');
			$("#principal").val(center.principalId);
		}else{
			layui.msg(data.msg);
		}
	},"json")
}

/*
 * 通过id查询餐饮中心
 */
function findCenterById($,layui){
	$.post('../center/findCenterById.do',{
		id:id
	},function(data){
		var code = data.code;
		if(code==1000){
			var center = data.data;
			$("#centerNm").val(center.name);
			$("#province").val(center.provinceId);
			layui.form().render('select');
			setCity(center,$,layui);
			findUserList($,layui,center);
		}else{
			layui.msg(data.msg);
		}
	},'json');
}

/*
 * 省列表
 */
function getProvinceList(pid,$,layui){
	$.post('../area/findAreaListByPid.do',{
		pid:pid
	},function(data){
		var code = data.code;
		if(code==1000){
			var optionstring = "";
			$.each(data.data, function(i,province){
				optionstring += "<option value=\"" + province.id + "\" >" + province.name + "</option>";
			});
			$("#province").html('<option value="">请选择省</option>' + optionstring);
			layui.form().render('select');
			findCenterById($,layui);
		}else{
			layui.msg(data.msg);
		}
	},'json');
};

/*
 * 市列表
 */
function findCityList(provinceId,$,layui){
	$("#district").html('<option value="">请选择市</option>' + '<option value="">请选择市</option>');
	$.post('../area/findAreaListByPid.do',{
		pid:provinceId
	},function(data){
		var code = data.code;
		if(code==1000){
		var optionstring = "";
        $.each(data.data, function(i,city){
            optionstring += "<option value=\"" + city.id + "\" >" + city.name + "</option>";
        });
        $("#city").html('<option value="">请选择市</option>' + optionstring);
        layui.form().render('select');
		}else{
			layui.msg(data.msg);
		}
	},'json');
}
/*
 * 地区列表
 */
function findDistrictList(cityId,$,layui){
	$("#district").html('<option value="">请选择县/区</option>' + '<option value="">请选择县/区</option>');
	$.post('../area/findAreaListByPid.do',{
		pid:cityId
	},function(data){
		var code = data.code;
		if(code==1000){
		var optionstring = "";
		$.each(data.data, function(i,district){
			optionstring += "<option value=\"" + district.id + "\" >" + district.name + "</option>";
		});
		$("#district").html('<option value="">请选择县/区</option>' + optionstring);
		layui.form().render('select');
		}else{
			layui.msg(data.msg);
		}
	},'json');
}

/*
 * 设置市的值
 */
function setCity(center,$,layui){
	$.post('../area/findAreaListByPid.do',{
		pid:center.provinceId
	},function(data){
		var code = data.code;
		if(code==1000){
		var optionstring = "";
        $.each(data.data, function(i,city){
            optionstring += "<option value=\"" + city.id + "\" >" + city.name + "</option>";
        });
        $("#city").html('<option value="">请选择市</option>' + optionstring);
        $("#city").val(center.cityId);
        layui.form().render('select');
        setDistrict(center,$,layui);
		}else{
			layui.msg(data.msg);
		}
	},'json');
}

/*
 * 设置地区的值
 */
function setDistrict(center,$,layui){
	$.post('../area/findAreaListByPid.do',{
		pid:center.cityId
	},function(data){
		var code = data.code;
		if(code==1000){
		var optionstring = "";
		$.each(data.data, function(i,district){
			optionstring += "<option value=\"" + district.id + "\" >" + district.name + "</option>";
		});
		$("#district").html('<option value="">请选择县/区</option>' + optionstring);
		$("#district").val(center.districtId);
		layui.form().render('select');
		}else{
			layui.msg(data.msg);
		}
	},'json');
}