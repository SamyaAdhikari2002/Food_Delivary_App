package com.shoppingProject.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.razorpay.*;
import com.shoppingProject.model.ContactUs;
import com.shoppingProject.model.Item;
import com.shoppingProject.model.MyOrder;
import com.shoppingProject.repo.OrderRepo;
@RestController
public class OrderController {
	
	@Autowired
	private OrderRepo orderRepo;
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/create_order")
	@ResponseBody
	public String createBody(@RequestBody Map<String,Object> data) throws RazorpayException {
		//System.out.println(data.get("amount"));
		//double amount=Double.parseDouble((String) data.get("amount"));
		System.out.println(data.get("amount").getClass());
		System.out.println(data.get("amount"));
		int amount=Integer.parseInt(data.get("amount").toString());
		
		var client=new RazorpayClient("rzp_test_k4rrUScAmRbFkY", "IjtQdOiPxMtRuBpRbxEGSCnc");
		 JSONObject orderRequest = new JSONObject();
		  orderRequest.put("amount", amount*100); // amount in the smallest currency unit
		  orderRequest.put("currency", "INR");
		  orderRequest.put("receipt", "order_rcptid_11");

		  Order order = client.orders.create(orderRequest);
		 
		return order.toString();
	}
	
	
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/orderSave")
	public ResponseEntity saveOrder(@RequestBody MyOrder data) {
		
		this.orderRepo.save(data);
		System.out.println(data);
		return ResponseEntity.ok("Ok");
	}
	
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping("/updateOrderItem")
	public ResponseEntity updateOrder(@RequestBody MyOrder data) {
		
		this.orderRepo.save(data);
		System.out.println(data);
		return ResponseEntity.ok("Ok");
	}
	

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/getAllOrders/{user}")
	public List<MyOrder> getOrderItem(@PathVariable("user") String user){
		List<MyOrder> list=new ArrayList<MyOrder>();
		//orderRepo.findAll().forEach(x->list.add(x));
		orderRepo.findAllOrderByUser(user).forEach(x->list.add(x));
		System.out.println(user);
		System.out.println("orders"+list.get(0));
		return list;
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/getOrders")
	public List<MyOrder> getOrders(){
		List<MyOrder> list=new ArrayList<MyOrder>();
		orderRepo.findAllOrder().forEach(x->list.add(x));
		return list;
	}
}
