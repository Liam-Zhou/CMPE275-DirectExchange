package com.example.demo.serviceImpl;

import com.example.demo.entities.BankAccount;
import com.example.demo.entities.User;
import com.example.demo.enums.Currency;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.repositories.BankAcctRepository;
import com.example.demo.services.BankAcctService;
import com.example.demo.services.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Optional;

@Service
public class BankAcctServiceImpl {

    @Resource
    BankAcctRepository bankAcctRepository;

    @Resource
    UserServiceImpl userService;

//    @Override
    @Transactional
    public BankAccount saveBankAcct(Long userId,
                                    String bankName,
                                    String country,
                                    String acctNo,
                                    String ownerName,
                                    String ownerAddress,
                                    Currency currency,
                                    Boolean sending,
                                    Boolean receiving,
                                    User user) {
//        Optional<User> user = userService.getUserDetails(userId);
        BankAccount savedAcct = null;
//        if(user.isPresent()){
            BankAccount acct = new BankAccount();
            acct.setBankName(bankName);
            acct.setCountry(country);
            acct.setAccountNo(acctNo);
            acct.setCurrency(currency);
            acct.setOwnerName(ownerName);
            acct.setOwnerAddress(ownerAddress);
            acct.setReceiving(receiving);
            acct.setSending(sending);
            acct.setUserId(user);
            savedAcct = bankAcctRepository.saveAndFlush(acct);
            bankAcctRepository.addUserForeignKey(userId,savedAcct.getId());
//        }
//        else{
//            throw new NotFoundException("Invalid User Id "+userId);
//        }
        return  savedAcct;
    }

}
