package com.example.demo.utils;

import com.example.demo.entities.CounterOfferDetails;
import com.example.demo.entities.OfferDetails;
import com.example.demo.entities.User;
import com.example.demo.pojos.MatchingOffers;
import com.example.demo.pojos.SingleMatchOffer;
import com.example.demo.pojos.SplitMatchOffer;
import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ResponsePayloadUtils {

    public JSONObject offerDetailsJson(OfferDetails offerDetails){
        JSONObject json = new JSONObject();
        if(offerDetails!=null){
            json.put("id",offerDetails.getId());
            json.put("amount",offerDetails.getAmount());
            json.put("sourceCountry",offerDetails.getSourceCountry());
            json.put("destinationCountry",offerDetails.getDestinationCountry());
            json.put("sourceCurrency",offerDetails.getSourceCurrency());
            json.put("destinationCurrency",offerDetails.getDestinationCurrency());
            json.put("exchangeRate",offerDetails.getExchangeRate());
            json.put("offerStatus",offerDetails.getOfferStatus());
            json.put("counterOffers",offerDetails.getAllowCounterOffers());
            json.put("splitOffers",offerDetails.getAllowSplitExchange());
            json.put("userNickname",offerDetails.getUserId().getNickname());
        }
        return json;
    }

    public JSONObject splitMatchJson(SplitMatchOffer splitMatchOffer){
        JSONObject json = new JSONObject();
        if(splitMatchOffer!=null){
            json.put("offer1",offerDetailsJson(splitMatchOffer.getOffer1()));
            json.put("offer2",offerDetailsJson(splitMatchOffer.getOffer2()));
            json.put("amountDifferencePercentage",splitMatchOffer.getAmountDifferencePercentage());
        }
        return json;
    }

    public JSONObject counterOfferJson(CounterOfferDetails counterOfferDetails) {
        JSONObject json = new JSONObject();
        if(counterOfferDetails!=null) {
            json.put("id",counterOfferDetails.getId());
            json.put("userId",userShallowJson(counterOfferDetails.getUserId()));
            json.put("newAmount",counterOfferDetails.getNewAmount());
            json.put("status",counterOfferDetails.getStatus().name());
        }
        return json;
    }

    public JSONObject userShallowJson(User user){
        JSONObject json = new JSONObject();
        if(user!=null){
            json.put("id",user.getId());
            json.put("nickname",user.getNickname());
            json.put("rating",user.getRating());
        }
        return json;
    }

    public JSONObject singleMatchJson(SingleMatchOffer singleMatchOffer){
        JSONObject json = new JSONObject();
        if(singleMatchOffer!=null){
            json.put("offer",offerDetailsJson(singleMatchOffer.getOffer()));
            json.put("amountDifferencePercentage",singleMatchOffer.getAmountDifferencePercentage());
        }
        return json;
    }

    public JSONObject matchingOffersJson(MatchingOffers matchingOffers){
        JSONObject json = new JSONObject();
        if(matchingOffers!=null){
            json.put("offerDetails",offerDetailsJson(matchingOffers.getOfferDetails()));
            List<JSONObject> singles = new ArrayList<>();
            for(SingleMatchOffer offer : matchingOffers.getSingleMatches()){
                singles.add(singleMatchJson(offer));
            }
            List<JSONObject> split = new ArrayList<>();
            for(SplitMatchOffer offer : matchingOffers.getSplitMatches()){
                split.add(splitMatchJson(offer));
            }
            json.put("singles",singles);
            json.put("split",split);
//            List<JSONObject> approxSingles = new ArrayList<>();
//            for(SingleMatchOffer offer : matchingOffers.getApproxSingleMatches()){
//                approxSingles.add(singleMatchJson(offer));
//            }
//            List<JSONObject> approxSplit = new ArrayList<>();
//            for(SplitMatchOffer offer : matchingOffers.getApproxSplitMatches()){
//                approxSplit.add(splitMatchJson(offer));
//            }
//            json.put("approxSingles",approxSingles);
//            json.put("approxSplit",approxSplit);
        }
        return  json;
    }
}
