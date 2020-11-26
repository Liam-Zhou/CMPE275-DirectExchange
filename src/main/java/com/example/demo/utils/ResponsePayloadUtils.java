package com.example.demo.utils;

import com.example.demo.entities.OfferDetails;
import com.example.demo.pojos.MatchingOffers;
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
        }
        return json;
    }

    public JSONObject splitMatchJson(SplitMatchOffer splitMatchOffer){
        JSONObject json = new JSONObject();
        if(splitMatchOffer!=null){
            json.put("offer1",offerDetailsJson(splitMatchOffer.getOffer1()));
            json.put("offer2",offerDetailsJson(splitMatchOffer.getOffer2()));
        }
        return json;
    }

    public JSONObject matchingOffersJson(MatchingOffers matchingOffers){
        JSONObject json = new JSONObject();
        if(matchingOffers!=null){
            json.put("offerDetails",offerDetailsJson(matchingOffers.getOfferDetails()));
            List<JSONObject> singles = new ArrayList<>();
            for(OfferDetails offer : matchingOffers.getSingleMatches()){
                singles.add(offerDetailsJson(offer));
            }
            List<JSONObject> split = new ArrayList<>();
            for(SplitMatchOffer offer : matchingOffers.getSplitMatches()){
                split.add(splitMatchJson(offer));
            }
            json.put("singles",singles);
            json.put("split",split);
            List<JSONObject> approxSingles = new ArrayList<>();
            for(OfferDetails offer : matchingOffers.getApproxSingleMatches()){
                approxSingles.add(offerDetailsJson(offer));
            }
            List<JSONObject> approxSplit = new ArrayList<>();
            for(SplitMatchOffer offer : matchingOffers.getApproxSplitMatches()){
                approxSplit.add(splitMatchJson(offer));
            }
            json.put("approxSingles",approxSingles);
            json.put("approxSplit",approxSplit);
        }
        return  json;
    }
}
