package com.shoppingProject.controller;
import org.springframework.mail.*;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.shoppingProject.model.ContactUs;
import com.shoppingProject.model.Item;
import com.shoppingProject.repo.ContactUsRepo;

import jakarta.validation.Valid;

@RestController
public class ContactUsController {
	
	@Autowired
	private ContactUsRepo contactUsRepo;
	@Autowired
	 JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
	

	
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/getContactUs")
	public List<ContactUs> getItem(){
		List<ContactUs> list=new ArrayList<ContactUs>();
		contactUsRepo.findAll().forEach(x->list.add(x));
		return list;
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/saveContactUs")
	public ResponseEntity<String> addItem(@RequestBody ContactUs contact) {		
		contact.setName(contact.getName().trim());
		contact.setEmail(contact.getEmail().trim());
		contact.setMessage(contact.getMessage().trim());
		this.contactUsRepo.save(contact);
		return ResponseEntity.ok("Ok");
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping("/getReply")
	public ResponseEntity<String> getReply(@Valid @RequestBody ContactUs reply) {
		this.contactUsRepo.save(reply);
		 SimpleMailMessage message = new SimpleMailMessage(); 
	        message.setFrom("nehamondal131624@gmail.com");
	        message.setTo(reply.getEmail()); 
	        message.setSubject(reply.getMessage()); 
	        message.setText(reply.getReply());
	        mailSender.send(message);
	        System.out.println("mail send:"+message);
		return ResponseEntity.ok("Ok");
	}

}
