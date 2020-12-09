package com.example.demo.serviceImpl;

import com.example.demo.entities.CounterOfferDetails;
import com.example.demo.entities.OfferDetails;
import com.example.demo.entities.User;
import com.example.demo.enums.CounterOfferStatus;
import com.example.demo.enums.OfferStatus;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.pojos.CounterOfferRequest;
import com.example.demo.repositories.CounterOfferRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Service
public class CounterOfferServiceImpl {

    @Resource
    CounterOfferRepository counterOfferRepository;

    @Resource
    OfferServiceImpl offerService;

    @Resource
    UserServiceImpl userService;

    @Transactional
    public CounterOfferDetails createCounterOffer(CounterOfferRequest counterOfferRequest) throws  NotFoundException{
        CounterOfferDetails saved = null;
        Optional<OfferDetails> toOffer = offerService.getOfferDetailsById(counterOfferRequest.getToOffer());
        Optional<OfferDetails> fromOffer = offerService.getOfferDetailsById(counterOfferRequest.getFromOffer());
        Optional<User> userDetails = userService.getUserDetails(counterOfferRequest.getFromUserId());
        if(!toOffer.isPresent() || !userDetails.isPresent() || !fromOffer.isPresent()){
            throw new NotFoundException("Invalid to offer id or from offer id or user id");
        }
        CounterOfferDetails counterOfferDetails = new CounterOfferDetails();
        counterOfferDetails.setNewAmount(counterOfferRequest.getNewAmount());
        counterOfferDetails.setStatus(CounterOfferStatus.New);
        counterOfferDetails.setFromOfferId(counterOfferRequest.getFromOffer());
        fromOffer.get().setOfferStatus(OfferStatus.CounterMade);
        try {
            saved = counterOfferRepository.saveAndFlush(counterOfferDetails);
            toOffer.get().addCounterOffer(saved);
            counterOfferRepository.addForeignKeyFromUser(counterOfferRequest.getFromUserId(),saved.getId());
            counterOfferRepository.addForeignKeyOriginalOffer(toOffer.get().getId(),saved.getId());
            saved.setOriginalOffer(toOffer.get());
            saved.setUserId(userDetails.get());
        } catch (Exception ex) {
            throw new NotFoundException(ex.getMessage());
        }
        return saved;
    }

    @Transactional
    public CounterOfferDetails acceptCounterOffer(Long counterOfferId) throws  NotFoundException{
        Optional<CounterOfferDetails> counterOfferDetails = counterOfferRepository.findById(counterOfferId);
        if(!counterOfferDetails.isPresent()){
            throw new NotFoundException("Invalid counter_offer id");
        }
        Optional<OfferDetails> offer = offerService.getOfferDetailsById(counterOfferDetails.get().getOriginalOffer().getId());
        if(!offer.isPresent()){
            throw new NotFoundException("Invalid original offer id");
        }
        offer.get().setOfferStatus(OfferStatus.InTransaction);
        offer.get().setAmount(counterOfferDetails.get().getNewAmount());
        Optional<OfferDetails> fromOffer = offerService.getOfferDetailsById(counterOfferDetails.get().getFromOfferId());
        if(!fromOffer.isPresent()){
            throw new NotFoundException("Invalid from offer id");
        }
        fromOffer.get().setOfferStatus(OfferStatus.InTransaction);
        counterOfferDetails.get().setStatus(CounterOfferStatus.Accept);
        return counterOfferDetails.get();
    }

    @Transactional
    public CounterOfferDetails rejectCounterOffer(Long counterOfferId) throws  NotFoundException{
        Optional<CounterOfferDetails> counterOfferDetails = counterOfferRepository.findById(counterOfferId);
        if(!counterOfferDetails.isPresent()){
            throw new NotFoundException("Invalid counter_offer id");
        }
        Optional<OfferDetails> fromOffer = offerService.getOfferDetailsById(counterOfferDetails.get().getFromOfferId());
        if(!fromOffer.isPresent()){
            throw new NotFoundException("Invalid from offer id");
        }
        fromOffer.get().setOfferStatus(OfferStatus.Open);
        counterOfferDetails.get().setStatus(CounterOfferStatus.Reject);
        return counterOfferDetails.get();
    }

    public List<CounterOfferDetails> getCounterOffersMade(Long userId){
        return counterOfferRepository.getCountersMade(userId);
    }
}
