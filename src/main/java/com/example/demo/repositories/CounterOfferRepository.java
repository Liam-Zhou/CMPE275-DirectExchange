package com.example.demo.repositories;

import com.example.demo.entities.BankAccount;
import com.example.demo.entities.CounterOfferDetails;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.JpaRepository;

@EntityScan(basePackages = {"com.example.demo.entity"})
public interface CounterOfferRepository extends JpaRepository<CounterOfferDetails, Long> {

}
