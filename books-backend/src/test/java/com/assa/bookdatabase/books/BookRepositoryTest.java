package com.assa.bookdatabase.books;

import com.assa.bookdatabase.books.domain.Book;
import com.assa.bookdatabase.books.domain.BookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class BookRepositoryTest {

    @Autowired
    private BookRepository mBookRepository;

    @Autowired
    private TestEntityManager mTestEntityManager;

    @Test
    void saveBook() {
        Book book = new Book("Kotlin", "Pearson", "Tech", "isbn 03", 2121, BigDecimal.valueOf(57.18), null);
        Book savedBoob = mTestEntityManager.persistAndFlush(book);
        assertThat(savedBoob.getId()).isNotNull();
    }

    @Test
    void deleteBooks() {
        // given
        mTestEntityManager.persistAndFlush(
                new Book("Kotlin", "Pearson", "Tech", "isbn 03", 2121, BigDecimal.valueOf(57.18), null)
        );
        mTestEntityManager.persistAndFlush(
                new Book("Health care solutions", "Sputnik", "Bio & tech", "isbn 04", 2020, BigDecimal.valueOf(7.1), null)
        );
        // when
        mBookRepository.deleteAll();
        // then
        assertThat(mBookRepository.findAll()).isEmpty();
    }
}
