package com.hansol.rnr.mapper;

import com.hansol.rnr.entity.Company;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CompanyMapper {
    int insertCompanies(List<Company> companyList);
}
