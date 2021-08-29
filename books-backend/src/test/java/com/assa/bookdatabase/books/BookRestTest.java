package com.assa.bookdatabase.books;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class BookRestTest {

    @Autowired
    private MockMvc mMockMvc;

    @Test
    void authenticationTest() throws Exception {
        // user with correct credentials
        mMockMvc.perform(post("/login").content("{\"username\":\"aiwa\", \"password\":\"aiwa\"}"))
                .andDo(print())
                .andExpect(status().isOk());

        // user with incorrect credentials
        mMockMvc.perform(post("/login").content("{\"username\":\"aiwa\", \"password\":\"wrong_password\"}"))
                .andDo(print())
                .andExpect(status().is4xxClientError());
    }
}
