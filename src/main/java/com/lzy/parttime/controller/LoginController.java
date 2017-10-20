package com.lzy.parttime.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.lzy.parttime.entity.User;
import com.lzy.parttime.service.LoginService;
import com.lzy.parttime.utils.CheckUtil;
import com.lzy.parttime.utils.Result;

/**
 * 
 * @author 李兆阳
 * @description : [登录入口]
 *
 * @时间: 2017年10月20日 上午9:43:13
 */
@Controller
public class LoginController {

	@Resource
	private LoginService loginService;
	
	@RequestMapping("/")
	public String index() {
		return "login";
	}

	/**
	 * @TODO: [登录验证]
	 * @createTime:2017年10月20日下午4:59:36
	 */
	@RequestMapping(value = "/doLogin", method = RequestMethod.POST)
	public ModelAndView loginIndex(User user) {
		ModelAndView mv = new ModelAndView();
		Result result =  loginService.doLogin(user);
		return CheckUtil.returnResult(mv,result.getCode(), result.getMsg(), "");
	}

	@RequestMapping(value = "/ids" )
	public String get(){
		return "form";
	}
}
