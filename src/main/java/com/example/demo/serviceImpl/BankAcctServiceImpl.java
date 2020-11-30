package com.example.demo.serviceImpl;

import com.example.demo.entities.BankAccount;
import com.example.demo.entities.User;
import com.example.demo.enums.Currency;
import com.example.demo.exceptions.InternalServerException;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.pojos.BankSetupRequest;
import com.example.demo.repositories.BankAcctRepository;
import com.example.demo.services.BankAcctService;
import com.example.demo.services.UserService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.sql.SQLException;
import java.util.Optional;

@Service
public class BankAcctServiceImpl {

    @Resource
    BankAcctRepository bankAcctRepository;

    @Resource
    UserServiceImpl userService;

//    @Override
    @Transactional
    public BankAccount saveBankAcct(BankSetupRequest bankDetails,
                                    User user) throws DataIntegrityViolationException {
//        Optional<User> user = userService.getUserDetails(userId);
        BankAccount savedAcct = null;
//        if(user.isPresent()){
            BankAccount acct = new BankAccount();
            acct.setBankName(bankDetails.getBankName());
            acct.setCountry(bankDetails.getCountry());
            acct.setAccountNo(bankDetails.getAcctNo());
            acct.setCurrency(Currency.valueOf(bankDetails.getCurrency()));
            acct.setOwnerName(bankDetails.getOwnerName());
            acct.setOwnerAddress(bankDetails.getOwnerAddress());
            acct.setReceiving(bankDetails.getReceiving());
            acct.setSending(bankDetails.getSending());
            acct.setUserId(user);
            try {
                savedAcct = bankAcctRepository.saveAndFlush(acct);
                bankAcctRepository.addUserForeignKey(user.getId(), savedAcct.getId());
            }
            catch (DataIntegrityViolationException e) {
                throw  e;
            }
        return  savedAcct;
    }

}
