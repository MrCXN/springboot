package com.lzy.parttime.entity;

/**
 * 
 * @author 李兆阳
 * @description : [公司实体类]
 *
 * @时间: 2017年10月19日 上午10:55:54
 */
public class Company {

	private int id;
	private String name;
	private String addTime;  //添加时间
	private String introduce; //公司介绍
	private int delFlag; //删除标志位 0未删除,1已删除
	
	
	//=========G/S=============
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddTime() {
		return addTime;
	}
	public void setAddTime(String addTime) {
		this.addTime = addTime;
	}
	public String getIntroduce() {
		return introduce;
	}
	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}
	public int getDelFlag() {
		return delFlag;
	}
	public void setDelFlag(int delFlag) {
		this.delFlag = delFlag;
	}
}
