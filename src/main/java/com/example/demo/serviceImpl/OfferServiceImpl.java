package com.example.demo.serviceImpl;

import com.example.demo.entities.OfferDetails;
import com.example.demo.enums.Currency;
import com.example.demo.pojos.MatchingOffers;
import com.example.demo.pojos.SingleMatchOffer;
import com.example.demo.pojos.SplitMatchOffer;
import com.example.demo.repositories.OfferDetailsRepository;
import com.example.demo.utils.SingleOfferComparator;
import com.example.demo.utils.SplitOffersComparator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.sql.ResultSet;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class OfferServiceImpl {

    @Resource
    OfferDetailsRepository offerDetailsRepository;

    @Transactional
    public Optional<OfferDetails> getOfferDetailsById(Long offerId){
        return offerDetailsRepository.findById(offerId);
    }

    @Transactional
    public MatchingOffers getMatchingOffers(OfferDetails offerDetails){
        MatchingOffers matchingOffers = new MatchingOffers();
        matchingOffers.setOfferDetails(offerDetails);
        List<Object []> splitOffers = offerDetailsRepository.getApproxSplitMatches(offerDetails.getAmount(),
                offerDetails.getExchangeRate(),offerDetails.getSourceCountry(),
                offerDetails.getDestinationCountry(),offerDetails.getSourceCurrency().name(),
                offerDetails.getDestinationCurrency().name(), 0.1);
        for(Object[] obj : splitOffers){
            SplitMatchOffer splitMatchOffer = new SplitMatchOffer();
            Optional<OfferDetails> offer1 = offerDetailsRepository.findById(Long.parseLong(obj[0].toString()));
            Optional<OfferDetails> offer2 = offerDetailsRepository.findById(Long.parseLong(obj[1].toString()));
            if(offer1.isPresent() && offer2.isPresent()) {
                splitMatchOffer.setOffer1(offer1.get());
                splitMatchOffer.setOffer2(offer2.get());
                splitMatchOffer.setAmountDifferencePercentage(
                        calculateAmountDifferenceSplitOffer(offerDetails.getAmount(), offer1.get().getAmount(),
                                offer2.get().getAmount(),offerDetails.getSourceCurrency(),
                                offerDetails.getExchangeRate(),offer1.get().getSourceCurrency(),
                                offer2.get().getSourceCurrency()));
                matchingOffers.addSplitMatch(splitMatchOffer);
            }
        }
        Collections.sort(matchingOffers.getSplitMatches(),new SplitOffersComparator());


//        List<Object []> singleOffers = offerDetailsRepository.getSingleOffers(offerDetails.getAmount(),
//                offerDetails.getExchangeRate(),offerDetails.getSourceCountry(),
//                offerDetails.getDestinationCountry(),offerDetails.getSourceCurrency().name(),
//                offerDetails.getDestinationCurrency().name());
//        for(Object[] obj : singleOffers){
//            Optional<OfferDetails> offer1 = offerDetailsRepository.findById(Long.parseLong(obj[0].toString()));
//            if(offer1.isPresent()) {
//                SingleMatchOffer singleMatchOffer = new SingleMatchOffer();
//                singleMatchOffer.setOffer(offer1.get());
////                singleMatchOffer.setAmountDifferencePercentage(calculateAmountDifferenceSingleOffer(offerDetails.getAmount(),offer1.get().getAmount(),
////                        offerDetails.getExchangeRate()));
//                singleMatchOffer.setAmountDifferencePercentage(0.0);
//                matchingOffers.addSingleMatch(singleMatchOffer);
//            }
//        }
        List<Object []> singleMatches = offerDetailsRepository.getApproxSingleMatches(offerDetails.getAmount(),
                offerDetails.getExchangeRate(),offerDetails.getSourceCountry(),
                offerDetails.getDestinationCountry(),offerDetails.getSourceCurrency().name(),
                offerDetails.getDestinationCurrency().name(),
                offerDetails.getApproxRange(0.1), offerDetails.getApproxRange(0.1));
        for(Object[] obj : singleMatches){
            Optional<OfferDetails> offer1 = offerDetailsRepository.findById(Long.parseLong(obj[0].toString()));
            if(offer1.isPresent()) {
                SingleMatchOffer singleMatchOffer = new SingleMatchOffer();
                singleMatchOffer.setOffer(offer1.get());
                singleMatchOffer.setAmountDifferencePercentage(calculateAmountDifferenceSingleOffer(offerDetails.getAmount(),offer1.get().getAmount(),
                        offerDetails.getExchangeRate()));
                matchingOffers.addSingleMatch(singleMatchOffer);
            }
        }
        Collections.sort(matchingOffers.getSingleMatches(),new SingleOfferComparator());
//        List<Object []> approxSplitMatches = offerDetailsRepository.getApproxSplitMatches(offerDetails.getAmount(),
//                offerDetails.getExchangeRate(),offerDetails.getSourceCountry(),
//                offerDetails.getDestinationCountry(),offerDetails.getSourceCurrency().name(),
//                offerDetails.getDestinationCurrency().name(),0.1
////                offerDetails.getApproxRange(0.1), offerDetails.getApproxRange(0.1)
//                );
//        for(Object[] obj : approxSplitMatches){
//            SplitMatchOffer splitMatchOffer = new SplitMatchOffer();
//            Optional<OfferDetails> offer1 = offerDetailsRepository.findById(Long.parseLong(obj[0].toString()));
//            Optional<OfferDetails> offer2 = offerDetailsRepository.findById(Long.parseLong(obj[1].toString()));
//            if(offer1.isPresent() && offer2.isPresent()) {
//                splitMatchOffer.setOffer1(offer1.get());
//                splitMatchOffer.setOffer2(offer2.get());
//                splitMatchOffer.setAmountDifferencePercentage(
//                        calculateAmountDifferenceSplitOffer(offerDetails.getAmount(), offer1.get().getAmount(),
//                                offer2.get().getAmount(),offerDetails.getSourceCurrency(),
//                                offerDetails.getExchangeRate(),offer1.get().getSourceCurrency(),
//                                offer2.get().getSourceCurrency()));
//                matchingOffers.addApproxSplitMatch(splitMatchOffer);
//            }
//        }
//        Collections.sort(matchingOffers.getApproxSplitMatches(),new SplitOffersComparator());
        return matchingOffers;
    }

    public OfferDetails CareteOffer(OfferDetails offer,long user_id){
        OfferDetails o =  offerDetailsRepository.saveAndFlush(offer);
        offerDetailsRepository.addUserForeignKey(user_id,o.getId());
        return o;
    }

    public Double calculateAmountDifferenceSplitOffer(Double curentAmount,
                                            Double offer1Amount, Double offer2Amount,
                                            Currency currentSourceCurrency, Double exchangeRate,
                                            Currency offer1SourceCurrency, Currency offer2SourceCurrency){
        Double requiredAmount = 0.0;
        if( currentSourceCurrency == offer1SourceCurrency){
            requiredAmount = offer2Amount - ( offer1Amount * exchangeRate);
        }
        else if( currentSourceCurrency == offer2SourceCurrency){
            requiredAmount = offer1Amount - ( offer2Amount * exchangeRate);
        }
        else {
            requiredAmount = offer1Amount + offer2Amount;
        }
        Double difference = (curentAmount*exchangeRate) - requiredAmount;
        return  Math.round((difference/(curentAmount*exchangeRate))*100.0*100)/100.0;
    }

    public Double calculateAmountDifferenceSingleOffer(Double curentAmount,
                                                      Double offer1Amount,
                                                      Double exchangeRate){
        Double difference = (curentAmount*exchangeRate) - offer1Amount;
        return Math.round((difference/(curentAmount*exchangeRate))*100.0*100)/100.0;
    }

}
