package com.assa.bookdatabase.books.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTopic(final String topic);

    Optional<Book> findByIsbn(final String isbn);

    List<Book> findByPrice(final BigDecimal price);

    List<Book> findByAuthor(final Author author);

}
