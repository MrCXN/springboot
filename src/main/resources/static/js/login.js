var form;
layui.config({
	base : 'js',
	version : new Date().getTime()
}).use(['layer','form'], function() {
	var layer = layui.layer, 
	$ = layui.jquery, 
	form = layui.form();

	var loginFlag=true;
	var rememberFlag=1;
	local($,layui);// 读取本地信息
	//登录
	form.on('submit(login)', function(data) {
		 if(loginFlag){
			 $.post("../login/doLogin.do",{
				 userAccount:userName,
				 pwd:pwd
			 },function(data){
				 var code =  data.code;
				 if(code!=1000){
					 layer.msg(data.msg);
				 }else{
					 location.href = "../login/index.do";
				 }
			 },"json");
		 }
		return false;
	});
	
	//记住帐号
	form.on('switch(switcher)', function(data) {
		 flag=-flag;
		 if(flag==1){
			 rememberMe=true;
			 saveLocal($);
		 }else{
			 rememberMe=false;
			 $("#userName").val("");
			 localStorage.setItem("userAccount","");
		 }
		return false;
	});
	
});

/**
 * 读取本地信息
 */
function local($,layui) {
	var userAccount = localStorage.getItem("userAccount");
	if (userAccount != null && userAccount != '') {
		 flag=-flag;
		$("#rememberMe").attr("checked", "checked");
		layui.form().render('checkbox');
		$("#userName").val(userAccount);
	} else {
		$("#rememberMe").attr("checked", false);
		$("#userName").val("");
	}
}


/**
 * 保存账户名
 * @param $ : jquery
 */
function saveLocal($) {
	var userAccount = $("#userName").val();
	localStorage.setItem("userAccount", userAccount);
	if (rememberMe){
		localStorage.setItem("pwd", pwd);
	}// 如果勾选了保存密码
	else{
		localStorage.setItem("pwd", "");
	}
}