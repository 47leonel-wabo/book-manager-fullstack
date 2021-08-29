package com.assa.bookdatabase.books.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTopic(final @Param("topic") String topic);

    Optional<Book> findByIsbn(final @Param("isbn") String isbn);

    List<Book> findByPrice(final @Param("price") BigDecimal price);

    List<Book> findByAuthor(final @Param("author") Author author);

}
