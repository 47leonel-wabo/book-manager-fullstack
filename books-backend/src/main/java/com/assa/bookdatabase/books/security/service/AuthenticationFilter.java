package com.assa.bookdatabase.books.security.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class AuthenticationFilter extends GenericFilterBean {
    /*
     * This class will handle authentication on all endpoints except /login
     * as it already has its own filter
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        Authentication authentication = AuthenticationService.getAuthentication((HttpServletRequest) request);
        // Add authenticated user to the security context
        SecurityContextHolder
                .getContext()
                .setAuthentication(authentication);
        chain.doFilter(request, response);
    }
}
