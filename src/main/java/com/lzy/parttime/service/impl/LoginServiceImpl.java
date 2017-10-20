package com.lzy.parttime.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lzy.parttime.dao.LoginDao;
import com.lzy.parttime.entity.User;
import com.lzy.parttime.service.LoginService;
import com.lzy.parttime.utils.Result;

/**
 * 
 * @author 李兆阳
 * @description : [登录业务实现类]
 *
 * @时间: 2017年10月19日 上午11:04:48
 */
@Service("loginService")  
public class LoginServiceImpl implements LoginService {

	@Resource
	private LoginDao loginDao;

	/*
	 * @TODO: [登录验证]
	 * @下午5:16:55
	 * @see com.lzy.parttime.service.LoginService#doLogin(com.lzy.parttime.entity.User)
	 */
	@Override
	public Result doLogin(User user) {
		
		return null;
	}

	
}
