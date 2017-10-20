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
		
		if(pid!=0){
			$.post('../question/findQuestionById.do',{
				id:pid
			},function(data){
				var code = data.code;
				if(code==1000){
					var question = data.data;
					$("#questionType").val(question.questionType);
					$("#questionType").attr('disabled','disabled'); 
					layui.form().render('select');
				}else{
					layer.msg(data.msg);
				}
			},"json")
		}
	
		//提交
		form.on('submit(submit)', function(data){
			var questionNm = $("#questionNm").val();
			var zdjc = $('input:radio[name="zdjc"]:checked').val();
			var sequence = $("#sequence").val()||-1;
			var questionType = $("#questionType").val();
			var remark = $("#remark").val();
			var score = $("#score").val();
			$.post('../question/saveQuestion.do',{
				questionNm:questionNm,
				zdjc:zdjc,
				pid:pid,
				score:score,
				sequence:sequence,
				remark:remark,
				questionType:questionType
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
