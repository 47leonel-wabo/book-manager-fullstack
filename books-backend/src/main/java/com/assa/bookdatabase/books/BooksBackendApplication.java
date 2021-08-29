package com.assa.bookdatabase.books;

import com.assa.bookdatabase.books.domain.Book;
import com.assa.bookdatabase.books.domain.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;

@SpringBootApplication
@RequiredArgsConstructor
public class BooksBackendApplication {

    private final BookRepository mBookRepository;

    public static void main(String[] args) {
        SpringApplication.run(BooksBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner runner() {
        return args -> {
            mBookRepository.save(new Book(
                    "Hands full stack development",
                    "Packt",
                    "Programming",
                    "ISBN 01",
                    2019,
                    BigDecimal.valueOf(150.2)));

            mBookRepository.save(new Book(
                    "React & React Native",
                    "Haalin",
                    "Programming",
                    "ISBN 02",
                    2020,
                    BigDecimal.valueOf(9.99)));
        };
    }

}
