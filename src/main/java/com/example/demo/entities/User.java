package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Immutable;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique = true)
    private long id;

    @Column(name="uname", unique = true, updatable = false)
//    @Immutable
    private String username;

    @Column(name="nickname", unique = true)
    private String nickname;

    @Column(name="password")
    @JsonIgnore
    private String password;

    @Column(name="email_verified", nullable = false)
    private Boolean emailVerified = false;

//    @NotNull
//    @Enumerated(EnumType.STRING)
//    private AuthProvider provider;

//    @Column(nullable = false)
//    private String providerId;

    @OneToMany(mappedBy="userId")
    @JsonBackReference
    private Set<BankAccount> accounts;

    @OneToMany(mappedBy="userId")
    @JsonBackReference
    private Set<OfferDetails> offers;

    @Column(name="rating", nullable = false)
    private double rating;


}
