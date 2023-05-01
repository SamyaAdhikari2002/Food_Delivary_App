package com.shoppingProject.controller;
import java.util.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.shoppingProject.model.Item;

import com.shoppingProject.repo.ItemRepo;

@RestController
public class ShoppingController {
	
	@Autowired
	private ItemRepo itemRepo;

	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/getItem")
	public List<Item> getItem(){
		List<Item> list=new ArrayList<Item>();
		itemRepo.findAll().forEach(x->list.add(x));
		return list;
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/addItem")
	public void addItem(@RequestBody Item item) {
		System.out.print(item.getImageURL());
		this.itemRepo.save(item);
		
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping("/updateItem")
	public void updateItem(@RequestBody Item item) {
		this.itemRepo.save(item);
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/deleteMapping/{id}")
	public void deleteItem(@PathVariable(value="id") int id) {
		//Optional<Item> item=this.itemRepo.findById(id);
		System.out.println(id);
		//int i=Integer.parseUnsignedInt(id);
		this.itemRepo.deleteById(id);
		
	}
	

}
