package com.lzy.parttime.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lzy.parttime.entity.Company;
import com.lzy.parttime.service.CompanyService;

/**
 * 
 * @author 李兆阳
 * @description : [公司controller层]
 *
 * @时间: 2017年10月19日 上午11:02:30
 */
@Controller
@RequestMapping("company")
public class CompanyController {

	@Resource
	private CompanyService companyService;
	
	@RequestMapping("/getCompanyList.do")
	public String getCompanyList(Model model,Map<String, Object> map){
		List<Company> companyList = companyService.getCompanyList();
		model.addAttribute("name","xiaoh");
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("tell", "123123");
		 map.put("hello", "this is a thymeleaf test");
		 map.put("companyList", companyList);
		return "b";
	}
}
