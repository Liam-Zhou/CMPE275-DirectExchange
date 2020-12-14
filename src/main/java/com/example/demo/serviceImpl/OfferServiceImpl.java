package com.example.demo.serviceImpl;

import com.example.demo.entities.AcceptedOffer;
import com.example.demo.entities.BankAccount;
import com.example.demo.entities.OfferDetails;
import com.example.demo.entities.User;
import com.example.demo.enums.AcceptedOfferStatus;
import com.example.demo.enums.Currency;
import com.example.demo.enums.OfferStatus;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.pojos.AcceptOfferRequest;
import com.example.demo.pojos.MatchingOffers;
import com.example.demo.pojos.SingleMatchOffer;
import com.example.demo.pojos.SplitMatchOffer;
import com.example.demo.repositories.AcceptedOfferRepository;
import com.example.demo.repositories.OfferDetailsRepository;
import com.example.demo.utils.SingleOfferComparator;
import com.example.demo.utils.SplitOffersComparator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.sql.ResultSet;
import java.util.*;

@Service
public class OfferServiceImpl {

    @Resource
    OfferDetailsRepository offerDetailsRepository;

    @Resource
    AcceptedOfferRepository acceptedOfferRepository;

    @Resource
    UserServiceImpl userService;

    @Resource
    BankAcctServiceImpl bankAcctService;

    @Transactional
    public Optional<OfferDetails> getOfferDetailsById(Long offerId) {
        return offerDetailsRepository.findById(offerId);
    }

    @Transactional
    public MatchingOffers getMatchingOffers(OfferDetails offerDetails) {
        MatchingOffers matchingOffers = new MatchingOffers();
        matchingOffers.setOfferDetails(offerDetails);
        List<Object[]> splitOffers = offerDetailsRepository.getApproxSplitMatches(offerDetails.getAmount(),
                offerDetails.getExchangeRate(), offerDetails.getSourceCountry(),
                offerDetails.getDestinationCountry(), offerDetails.getSourceCurrency().name(),
                offerDetails.getDestinationCurrency().name(), 0.1,offerDetails.getId(),
                offerDetails.getUserId().getId());
        for (Object[] obj : splitOffers) {
            SplitMatchOffer splitMatchOffer = new SplitMatchOffer();
            Optional<OfferDetails> offer1 = offerDetailsRepository.findById(Long.parseLong(obj[0].toString()));
            Optional<OfferDetails> offer2 = offerDetailsRepository.findById(Long.parseLong(obj[1].toString()));
            if (offer1.isPresent() && offer2.isPresent()) {
                splitMatchOffer.setOffer1(offer1.get());
                splitMatchOffer.setOffer2(offer2.get());
                splitMatchOffer.setAmountDifferencePercentage(
                        calculateAmountDifferenceSplitOffer(offerDetails.getAmount(), offer1.get().getAmount(),
                                offer2.get().getAmount(), offerDetails.getSourceCurrency(),
                                offerDetails.getExchangeRate(), offer1.get().getSourceCurrency(),
                                offer2.get().getSourceCurrency()));
                matchingOffers.addSplitMatch(splitMatchOffer);
            }
        }
        Collections.sort(matchingOffers.getSplitMatches(), new SplitOffersComparator());
        List<Object[]> singleMatches = offerDetailsRepository.getApproxSingleMatches(offerDetails.getAmount(),
                offerDetails.getExchangeRate(), offerDetails.getSourceCountry(),
                offerDetails.getDestinationCountry(), offerDetails.getSourceCurrency().name(),
                offerDetails.getDestinationCurrency().name(),
                offerDetails.getApproxRange(0.1), offerDetails.getApproxRange(0.1),
                offerDetails.getId(),offerDetails.getUserId().getId());
        for (Object[] obj : singleMatches) {
            Optional<OfferDetails> offer1 = offerDetailsRepository.findById(Long.parseLong(obj[0].toString()));
            if (offer1.isPresent()) {
                SingleMatchOffer singleMatchOffer = new SingleMatchOffer();
                singleMatchOffer.setOffer(offer1.get());
                singleMatchOffer.setAmountDifferencePercentage(calculateAmountDifferenceSingleOffer(offerDetails.getAmount(), offer1.get().getAmount(),
                        offerDetails.getExchangeRate()));
                matchingOffers.addSingleMatch(singleMatchOffer);
            }
        }
        Collections.sort(matchingOffers.getSingleMatches(), new SingleOfferComparator());
        return matchingOffers;
    }

    @Transactional
    public Boolean acceptOffer(AcceptOfferRequest acceptOfferRequest) throws NotFoundException {
        Optional<OfferDetails> offer2 = null;
        Optional<OfferDetails> offer3 = null;
//        Optional<User> userDetails = userService.getUserDetails(acceptOfferRequest.getUserId());
//        if(userDetails.isPresent() && !bankAcctService.bankAccountVerification(userDetails.get())){
//            throw new NotFoundException("Please add at least two bank accts to post or accept an offer");
//        }
        Optional<OfferDetails> offer1 = offerDetailsRepository.findById(acceptOfferRequest.getOfferId1());
        if (offer1.isPresent() && acceptOfferRequest.getOfferId2() != null
                && acceptOfferRequest.getOfferId3() != null) {
            offer2 = offerDetailsRepository.findById(acceptOfferRequest.getOfferId2());
            offer3 = offerDetailsRepository.findById(acceptOfferRequest.getOfferId3());
            if (offer2.isPresent() && offer3.isPresent()) {
                offer1.get().setOfferStatus(OfferStatus.InTransaction);
                offer2.get().setOfferStatus(OfferStatus.InTransaction);
                offer3.get().setOfferStatus(OfferStatus.InTransaction);
                AcceptedOffer acceptedOffer = new AcceptedOffer();
                acceptedOffer.setOfferId1(offer1.get().getId());
                acceptedOffer.setOfferId2(offer2.get().getId());
                acceptedOffer.setOfferId3(offer3.get().getId());
                acceptedOffer.setOfferStatus(AcceptedOfferStatus.InTransaction);
                acceptedOffer.setTimeStamp(new Date(acceptOfferRequest.getTimeStamp()));
                try {
                    acceptedOfferRepository.saveAndFlush(acceptedOffer);
                    return true;
                } catch (Exception ex) {
                    throw ex;
                }
//                acceptedOfferRepository.addUserForeignKey(savedAcceptedOffer.getId(),offer1.get().getId(),
//                        offer2.get().getId(),offer3.get().getId());
            } else {
                throw new NotFoundException("One or more offer ids " + offer2.get().getId() +
                        ", " + ", " + offer2.get().getId() + " are invalid");
            }
        } else if (offer1.isPresent() && acceptOfferRequest.getOfferId2() != null) {
            offer2 = offerDetailsRepository.findById(acceptOfferRequest.getOfferId2());
            if (offer2.isPresent()) {
                offer1.get().setOfferStatus(OfferStatus.InTransaction);
                offer2.get().setOfferStatus(OfferStatus.InTransaction);
                AcceptedOffer acceptedOffer = new AcceptedOffer();
                acceptedOffer.setOfferId1(offer1.get().getId());
                acceptedOffer.setOfferId2(offer2.get().getId());
                acceptedOffer.setOfferStatus(AcceptedOfferStatus.InTransaction);
                acceptedOffer.setTimeStamp(new Date(acceptOfferRequest.getTimeStamp()));
                try {
                    acceptedOfferRepository.saveAndFlush(acceptedOffer);
                    return true;
                } catch (Exception ex) {
                    throw ex;
                }
            } else {
                throw new NotFoundException("Offer id " + offer2.get().getId() +
                        " is invalid");
            }
        } else if(offer1.isPresent() && acceptOfferRequest.getOfferId2() != null){
            throw new NotFoundException("Minimum two offer ids expected to match offer" );
        }
        else{
            throw new NotFoundException("Offer id " + offer1.get().getId() +
                    " is invalid");
        }
    }

    public OfferDetails CareteOffer(OfferDetails offer, long user_id) {
        OfferDetails o = offerDetailsRepository.saveAndFlush(offer);
        offerDetailsRepository.addUserForeignKey(user_id, o.getId());
        return o;
    }


    public Double calculateAmountDifferenceSplitOffer(Double curentAmount,
                                                      Double offer1Amount, Double offer2Amount,
                                                      Currency currentSourceCurrency, Double exchangeRate,
                                                      Currency offer1SourceCurrency, Currency offer2SourceCurrency) {
        Double requiredAmount = 0.0;
        if (currentSourceCurrency == offer1SourceCurrency) {
            requiredAmount = offer2Amount - (offer1Amount * exchangeRate);
        } else if (currentSourceCurrency == offer2SourceCurrency) {
            requiredAmount = offer1Amount - (offer2Amount * exchangeRate);
        } else {
            requiredAmount = offer1Amount + offer2Amount;
        }
        Double difference = (curentAmount * exchangeRate) - requiredAmount;
        return Math.round((difference / (curentAmount * exchangeRate)) * 100.0 * 100) / 100.0;
    }

    public Double calculateAmountDifferenceSingleOffer(Double curentAmount,
                                                       Double offer1Amount,
                                                       Double exchangeRate) {
        Double difference = (curentAmount * exchangeRate) - offer1Amount;
        return Math.round((difference / (curentAmount * exchangeRate)) * 100.0 * 100) / 100.0;
    }
 
    public List<OfferDetails> getOfferList(int pageNum,String Scurrency,int Samount,String Dcurrency,Long user_id){
        List<OfferDetails> offerList = offerDetailsRepository.getOfferList( pageNum, Scurrency, Samount, Dcurrency,user_id);
        return offerList;
    }

    public List<OfferDetails> getOfferByUser(long user_id) {
        List<OfferDetails> offerList = offerDetailsRepository.getOfferByUser(user_id);
        return offerList;
    }
    public List<OfferDetails> getTotalOffers(String Scurrency,int Samount,String Dcurrency,long user_id){
        List<OfferDetails> offerList = offerDetailsRepository.getTotalOffers(Scurrency, Samount, Dcurrency,user_id,"Open");
        return offerList;
    }

    @Transactional
    public OfferDetails updateOfferAmt(Long offerId, Double amount) {
        Optional<OfferDetails> offerDetails = offerDetailsRepository.findById(offerId);
        if (offerDetails.isPresent()) {
            offerDetails.get().setAmount(amount);
            return offerDetails.get();
        } else {
            throw new NotFoundException("Offer id " + offerId +
                    " is invalid");
        }
    }


}
