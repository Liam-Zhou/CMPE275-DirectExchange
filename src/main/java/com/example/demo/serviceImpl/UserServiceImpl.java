package com.example.demo.serviceImpl;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Optional;

@Service
public class UserServiceImpl  {

    @Resource
    UserRepository userRepository;

//    @Override
    @Transactional
    public Optional<User> getUserDetails(Long userId) {
        return userRepository.findById(userId);
    }
}
