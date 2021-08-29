package com.assa.bookdatabase.books.security;

import com.assa.bookdatabase.books.security.service.UserDetailServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private final UserDetailServiceImpl mUserDetailService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(mUserDetailService)
                .passwordEncoder(new BCryptPasswordEncoder());
    }
}
