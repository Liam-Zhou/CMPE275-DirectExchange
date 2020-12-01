package com.example.demo.serviceImpl;

import com.example.demo.entities.OfferDetails;
import com.example.demo.pojos.MatchingOffers;
import com.example.demo.pojos.SplitMatchOffer;
import com.example.demo.repositories.OfferDetailsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.sql.ResultSet;
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
        List<Object []> splitOffers = offerDetailsRepository.getSplitOffers(offerDetails.getAmount(),
                offerDetails.getExchangeRate(),offerDetails.getSourceCountry(),
                offerDetails.getDestinationCountry(),offerDetails.getSourceCurrency().name(),
                offerDetails.getDestinationCurrency().name());
        for(Object[] obj : splitOffers){
            SplitMatchOffer splitMatchOffer = new SplitMatchOffer();
            Optional<OfferDetails> offer1 = offerDetailsRepository.findById(Long.parseLong(obj[0].toString()));
            if(offer1.isPresent())
                splitMatchOffer.setOffer1(offer1.get());
            Optional<OfferDetails> offer2 = offerDetailsRepository.findById(Long.parseLong(obj[1].toString()));
            if(offer2.isPresent())
                splitMatchOffer.setOffer2(offer2.get());
            matchingOffers.addSplitMatch(splitMatchOffer);
        }
        List<Object []> singleOffers = offerDetailsRepository.getSingleOffers(offerDetails.getAmount(),
                offerDetails.getExchangeRate(),offerDetails.getSourceCountry(),
                offerDetails.getDestinationCountry(),offerDetails.getSourceCurrency().name(),
                offerDetails.getDestinationCurrency().name());
        for(Object[] obj : singleOffers){
            Optional<OfferDetails> offer1 = offerDetailsRepository.findById(Long.parseLong(obj[0].toString()));
            if(offer1.isPresent())
                matchingOffers.addSingleMatch(offer1.get());
        }
        List<Object []> approxSingleMatches = offerDetailsRepository.getApproxSingleMatches(offerDetails.getAmount(),
                offerDetails.getExchangeRate(),offerDetails.getSourceCountry(),
                offerDetails.getDestinationCountry(),offerDetails.getSourceCurrency().name(),
                offerDetails.getDestinationCurrency().name(),
                offerDetails.getApproxRange(0.1), offerDetails.getApproxRange(0.1));
        for(Object[] obj : approxSingleMatches){
            Optional<OfferDetails> offer1 = offerDetailsRepository.findById(Long.parseLong(obj[0].toString()));
            if(offer1.isPresent())
                matchingOffers.addApproxSingleMatch(offer1.get());
        }
        List<Object []> approxSplitMatches = offerDetailsRepository.getApproxSplitMatches(offerDetails.getAmount(),
                offerDetails.getExchangeRate(),offerDetails.getSourceCountry(),
                offerDetails.getDestinationCountry(),offerDetails.getSourceCurrency().name(),
                offerDetails.getDestinationCurrency().name(),
                offerDetails.getApproxRange(0.1), offerDetails.getApproxRange(0.1));
        for(Object[] obj : approxSplitMatches){
            SplitMatchOffer splitMatchOffer = new SplitMatchOffer();
            Optional<OfferDetails> offer1 = offerDetailsRepository.findById(Long.parseLong(obj[0].toString()));
            if(offer1.isPresent())
                splitMatchOffer.setOffer1(offer1.get());
            Optional<OfferDetails> offer2 = offerDetailsRepository.findById(Long.parseLong(obj[1].toString()));
            if(offer2.isPresent())
                splitMatchOffer.setOffer2(offer2.get());
            matchingOffers.addApproxSplitMatch(splitMatchOffer);
        }
        return matchingOffers;
    }

    public OfferDetails CareteOffer(OfferDetails offer,long user_id){
        OfferDetails o =  offerDetailsRepository.saveAndFlush(offer);
        offerDetailsRepository.addUserForeignKey(user_id,o.getId());
        return o;
    }

    public List<OfferDetails> getOfferList(int pageNum,String Scurrency,int Samount,String Dcurrency){
        List<OfferDetails> offerList = offerDetailsRepository.getOfferList( pageNum, Scurrency, Samount, Dcurrency);
        return offerList;
    }
    public List<OfferDetails> getOfferByUser(long user_id){
        List<OfferDetails> offerList = offerDetailsRepository.getOfferByUser(user_id);
        return offerList;
    }
    public List<OfferDetails> getTotalOffers(String Scurrency,int Samount,String Dcurrency){
        List<OfferDetails> offerList = offerDetailsRepository.getTotalOffers(Scurrency, Samount, Dcurrency);
        return offerList;
    }

}
