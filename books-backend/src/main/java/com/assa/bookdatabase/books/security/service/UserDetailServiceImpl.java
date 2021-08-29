package com.assa.bookdatabase.books.security.service;

import com.assa.bookdatabase.books.domain.AppUser;
import com.assa.bookdatabase.books.domain.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private final AppUserRepository mUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AppUser> optionalAppUser = mUserRepository.findByUsername(username);
        if (optionalAppUser.isEmpty()) {
            throw new UsernameNotFoundException(String.format("User %s not found", username));
        }
        return new User(
                username,
                optionalAppUser.get().getPassword(),
                true,
                true,
                true,
                true,
                AuthorityUtils.createAuthorityList(optionalAppUser.get().getRole().toString())
        );
    }
}
