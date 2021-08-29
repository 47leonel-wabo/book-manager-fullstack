package com.assa.bookdatabase.books.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Author {

    @Id
    @GeneratedValue
    private UUID authorId;

    @Column(nullable = false)
    private String firstName, lastName;

    private Integer age;

    public Author(String firstName, String lastName, Integer age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}
