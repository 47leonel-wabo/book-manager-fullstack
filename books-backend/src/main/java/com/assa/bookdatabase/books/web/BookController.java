package com.assa.bookdatabase.books.web;

import com.assa.bookdatabase.books.domain.Book;
import com.assa.bookdatabase.books.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = {"/api/books"})
@RequiredArgsConstructor
public class BookController {

    @Autowired
    private final BookService mBookService;

    @GetMapping
    public ResponseEntity<Iterable<Book>> getBooks() {
        return ResponseEntity.ok().body(mBookService.fetchBooks());
    }

}
