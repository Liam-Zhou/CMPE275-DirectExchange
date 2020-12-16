package com.example.demo.serviceImpl;

import com.example.demo.entities.OfferDetails;
import com.example.demo.entities.Transaction;
import com.example.demo.repositories.OfferDetailsRepository;
import com.example.demo.repositories.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TransactionSeriveImpl {
    @Resource
    TransactionRepository transactionRepository;

    @Transactional
    public Transaction CareteTransaction(Transaction t, long user_id,long offer_id){
        Transaction transaction =  transactionRepository.saveAndFlush(t);
        long t_id = transaction.getId();
        System.out.println("zyl  t_idt_idt_idt_id "+t_id+" user_id "+user_id+" offer_id "+offer_id);
//        transactionRepository.addUserForeignKey(user_id,offer_id,t_id);
        transactionRepository.addUserForeignKey(user_id,t_id);
        transactionRepository.addOfferForeignKey(offer_id,t_id);
        return transaction;
    }

    @Transactional
    public void ConfirmTransfer(long userId,long offerId,String status){
        transactionRepository.confirmTransfer(userId,offerId,status);
    }

    @Transactional
    public List<Transaction> getByUserAndOffer(long userId, long offerId){
        return transactionRepository.getByUserAndOffer(userId,offerId);
    }
    @Transactional
    public List<Transaction> getByUser(long userId){
        return transactionRepository.getByUser(userId);
    }

    @Transactional
    public void setAbortedOrCompelted(long offerId,String status){
        transactionRepository.setAbortedOrCompelted(offerId,status);
    }

    @Transactional
    public List<Transaction> getByOffer(long offerId){
        return transactionRepository.getByOffer(offerId);
    }
    @Transactional
    public List<Transaction> getTxnHistoryWithUserName(long userID){
        return transactionRepository.getTxnHistoryWithUserName(userID);
    }
}
