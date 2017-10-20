package com.lzy.parttime.service;

import java.util.List;

import com.lzy.parttime.entity.Company;

/**
 * 
 * @author 李兆阳
 * @description : [公司业务层接口]
 *
 * @时间: 2017年10月19日 上午11:05:13
 */
public interface CompanyService {

	/**
	 * 
	 * @TODO: [公司集合]
	 * @return: List<Company>
	 * @createTime:2017年10月19日上午11:24:58
	 */
	List<Company> getCompanyList();

}
