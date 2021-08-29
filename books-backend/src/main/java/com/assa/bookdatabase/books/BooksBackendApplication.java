package com.assa.bookdatabase.books;

import com.assa.bookdatabase.books.domain.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.util.Arrays;

@SpringBootApplication
@RequiredArgsConstructor
public class BooksBackendApplication {

    private final BookRepository mBookRepository;
    private final AuthorRepository mAuthorRepository;
    private final AppUserRepository mUserRepository;

    public static void main(String[] args) {
        SpringApplication.run(BooksBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner runner() {
        return args -> {

            // Insert few users
            mUserRepository.saveAll(Arrays.asList(
               new AppUser("aiwa", "$2a$10$8PxjZR8ktST9LHobYsMwHe64.zytWUWX1nhmS8FauOMkUC/YkpFli", UserRole.USER),
               new AppUser("leonek", "$2a$10$SCkLFp3B4QXjqRBjk5jVbeZo6Vrn2Ht7.xu3bXeppYPMJsYps55dy", UserRole.ADMIN)
            ));

            // Create few authors
            Author leo = new Author("leonel ka", "Azani", 29);
            Author shaori = new Author("Shaori", "SHomari", 23);
            mAuthorRepository.saveAll(Arrays.asList(leo, shaori));

            // And few books
            mBookRepository.save(new Book(
                    "Hands full stack development",
                    "Packt",
                    "Programming",
                    "ISBN 01",
                    2019,
                    BigDecimal.valueOf(150.2),
                    leo));

            mBookRepository.save(new Book(
                    "React & React Native",
                    "Haalin",
                    "Programming",
                    "ISBN 02",
                    2020,
                    BigDecimal.valueOf(9.99),
                    shaori));
        };
    }

}
