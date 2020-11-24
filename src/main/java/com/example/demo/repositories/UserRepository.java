package com.example.demo.repositories;

import com.example.demo.entities.User;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@EntityScan(basePackages = {"com.example.demo.entity"})
public interface UserRepository extends JpaRepository<User,Long> {

    @Override
    Optional<User> findById(Long userId);
}
