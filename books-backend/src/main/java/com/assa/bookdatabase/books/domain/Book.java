package com.assa.bookdatabase.books.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.math.BigDecimal;

import static javax.persistence.GenerationType.AUTO;

@Entity
@Data
@NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;

    @Column(nullable = false)
    private String title, publisher, topic;

    @Column(nullable = false, unique = true)
    private String isbn;

    private Integer publicationDate;

    @Column(nullable = false)
    private BigDecimal price;

    public Book(String title,
                String publisher,
                String topic,
                String isbn,
                Integer publicationDate,
                BigDecimal price) {
        this.title = title;
        this.publisher = publisher;
        this.topic = topic;
        this.isbn = isbn;
        this.publicationDate = publicationDate;
        this.price = price;
    }
}
