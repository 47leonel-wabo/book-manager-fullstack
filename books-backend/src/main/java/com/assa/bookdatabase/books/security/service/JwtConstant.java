package com.assa.bookdatabase.books.security.service;

public class JwtConstant {
    public static final Long EXPIRATION_TIME = 86_400_000L; // 1 day in millis
    public static final String SIGNING_KEY = "secret-key";
    public static final String PREFIX = "Bearer ";
}
