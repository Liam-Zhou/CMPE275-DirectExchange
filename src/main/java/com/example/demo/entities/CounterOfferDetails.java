package com.example.demo.entities;

import com.example.demo.enums.CounterOfferStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="counter_offer_details")
@Data
public class CounterOfferDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique = true)
    private long id;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false, insertable = false,updatable = false)
    @JsonManagedReference
    @JsonIgnore
    private User userId;

    @ManyToOne
    @JoinColumn(name="offer_id", nullable=false,insertable = false,updatable = false)
    @JsonManagedReference
    @JsonIgnore
    private OfferDetails offer;

    @Column(name="new_amount")
    private double newAmount;

    @Column(name="status", nullable=false)
    private CounterOfferStatus status;

    @Column(name="created_at")
    private Date createdAt;

    @Column(name="updated_at")
    private Date updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }
}
