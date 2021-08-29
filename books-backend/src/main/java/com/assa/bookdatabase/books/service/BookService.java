package com.assa.bookdatabase.books.service;

import com.assa.bookdatabase.books.domain.Book;
import com.assa.bookdatabase.books.domain.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {

    @Autowired
    private final BookRepository mBookRepository;

    public Iterable<Book> fetchBooks(){
        return mBookRepository.findAll();
    }
}
