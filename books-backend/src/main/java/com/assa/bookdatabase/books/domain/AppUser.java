package com.assa.bookdatabase.books.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
public class AppUser {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    public AppUser(String username, String password, UserRole role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
