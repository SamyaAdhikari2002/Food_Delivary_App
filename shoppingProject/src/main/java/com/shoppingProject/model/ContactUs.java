package com.shoppingProject.model;
import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Component
@Table(name="ContactUs")
public class ContactUs {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	@Column(name="name")
	@NotBlank(message = "Name is mandatory")
	private String name;
	@Column(name="email")
	@NotBlank(message = "email is mandatory")
	@Email(message = "Email is not well formatted.")
	private String email;
	@Column(name="message")
	@NotBlank(message = "message is mandatory")
	private String message;
	
	@Column(name="reply")
	private String reply;
	
	@Column(name="replyed")
	private boolean replyed;
	
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getReply() {
		return reply;
	}
	public void setReply(String reply) {
		this.reply = reply;
	}
	public boolean isReplyed() {
		return replyed;
	}
	public void setReplyed(boolean replyed) {
		this.replyed = replyed;
	}
	
	
	
	
	
	

}
