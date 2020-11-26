package com.example.demo.pojos;

import com.example.demo.entities.OfferDetails;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class MatchingOffers {

    private OfferDetails offerDetails;
    private List<OfferDetails> singleMatches = new ArrayList<>();
    private List<SplitMatchOffer> splitMatches = new ArrayList<>();

    public void addSplitMatch(SplitMatchOffer splitMatchOffer){
        this.splitMatches.add(splitMatchOffer);
    }

    public void addSingleMatch(OfferDetails offerDetails){
        this.singleMatches.add(offerDetails);
    }
}
