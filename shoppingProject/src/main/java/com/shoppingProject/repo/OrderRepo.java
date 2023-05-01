package com.shoppingProject.repo;

import org.hibernate.mapping.Collection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.shoppingProject.model.MyOrder;

@Repository
public interface OrderRepo extends CrudRepository<MyOrder, Integer> {

	@Query("SELECT u FROM MyOrder u WHERE u.status='paid' and u.user = :user")
	List<MyOrder> findAllOrderByUser(@Param("user") String user);
	
	@Query("SELECT u FROM MyOrder u WHERE u.status='paid'")
	List<MyOrder> findAllOrder();
}
