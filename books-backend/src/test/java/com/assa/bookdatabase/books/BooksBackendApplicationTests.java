package com.assa.bookdatabase.books;

import com.assa.bookdatabase.books.web.BookController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class BooksBackendApplicationTests {

    @Autowired
    private BookController mBookController;

    @Test
    void contextLoads() {
        assertThat(mBookController).isNotNull();
    }

}
