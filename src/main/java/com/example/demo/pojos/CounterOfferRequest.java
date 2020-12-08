package com.example.demo.pojos;

import com.example.demo.entities.OfferDetails;
import com.example.demo.entities.User;
import com.example.demo.enums.CounterOfferStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;

@Data
public class CounterOfferRequest {

    private Long userId;
    private double newAmount;
    private CounterOfferStatus status;
    private Long offerId;

}
