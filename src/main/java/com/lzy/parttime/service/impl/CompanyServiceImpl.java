package com.lzy.parttime.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lzy.parttime.dao.CompanyDao;
import com.lzy.parttime.entity.Company;
import com.lzy.parttime.service.CompanyService;

/**
 * 
 * @author 李兆阳
 * @description : [公司业务实现类]
 *
 * @时间: 2017年10月19日 上午11:04:48
 */
@Service("companyService")  
public class CompanyServiceImpl implements CompanyService {

	@Resource
	private CompanyDao companyDao;

	/*
	 * @TODO: [公司集合]
	 * @上午11:25:35
	 * @see com.lzy.parttime.service.CompanyService#getCompanyList()
	 */
	@Override
	public List<Company> getCompanyList() {
		
		try {
			List<Company> list = companyDao.getCompanyList();
			return list;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
}
