package com.example.demo.serviceImpl;

import com.example.demo.entities.CounterOfferDetails;
import com.example.demo.entities.OfferDetails;
import com.example.demo.entities.User;
import com.example.demo.enums.CounterOfferStatus;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.pojos.CounterOfferRequest;
import com.example.demo.repositories.CounterOfferRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Optional;

@Service
public class CounterOfferServiceImpl {

    @Resource
    CounterOfferRepository counterOfferRepository;

    @Resource
    OfferServiceImpl offerService;

    @Resource
    UserServiceImpl userService;

    public CounterOfferDetails createCounterOffer(CounterOfferRequest counterOfferRequest) {
        CounterOfferDetails saved = null;
        Optional<OfferDetails> offer = offerService.getOfferDetailsById(counterOfferRequest.getOfferId());
        Optional<User> userDetails = userService.getUserDetails(counterOfferRequest.getUserId());
        CounterOfferDetails counterOfferDetails = new CounterOfferDetails();
        counterOfferDetails.setNewAmount(counterOfferRequest.getNewAmount());
        counterOfferDetails.setOffer(offer.get());
        counterOfferDetails.setUserId(userDetails.get());
        counterOfferDetails.setStatus(CounterOfferStatus.New);
        try {
            saved = counterOfferRepository.saveAndFlush(counterOfferDetails);
        } catch (Exception ex) {
            throw new NotFoundException(ex.getMessage());
        }
        return saved;
    }
}
