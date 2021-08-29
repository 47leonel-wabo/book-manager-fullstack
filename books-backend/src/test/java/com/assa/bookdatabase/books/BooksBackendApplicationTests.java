package com.assa.bookdatabase.books;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
class BooksBackendApplicationTests {

    @Test
    void contextLoads() {
        System.out.println(new BCryptPasswordEncoder().encode("password"));
        System.out.println(new BCryptPasswordEncoder().encode("aiwa"));
    }

}
