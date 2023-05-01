package com.shoppingProject.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shoppingProject.model.Item;



@Repository
public interface ItemRepo extends CrudRepository<Item, Integer>{

	
}
