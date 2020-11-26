package com.example.demo.entities;

import com.example.demo.enums.TransactionType;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="transactions_details")
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne
    @JoinColumn(name = "offer_id")
    private OfferDetails offer;

    @Column(name = "amount",nullable = false)
    private double amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "type",nullable = false)
    private TransactionType type;

    @Column(name="created_at")
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }



}
