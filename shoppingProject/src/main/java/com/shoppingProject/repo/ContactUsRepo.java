package com.shoppingProject.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shoppingProject.model.ContactUs;

@Repository
public interface ContactUsRepo extends CrudRepository<ContactUs,Integer>{

}
