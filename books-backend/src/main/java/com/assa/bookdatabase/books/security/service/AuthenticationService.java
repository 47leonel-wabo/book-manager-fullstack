package com.assa.bookdatabase.books.security.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Date;

@Service
public class AuthenticationService {

    private final static String AUTHORIZATION = "Authorization";
    private final static String ACEH = "Access-Control-Expose-Headers";

    // Add token to authorization header
    public static void addToken(final HttpServletResponse response, final String username) {
        // Token generation
        String jwtToken = Jwts
                .builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + JwtConstant.EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, JwtConstant.SIGNING_KEY)
                .compact();

        // Add token to the authentication header
        response.addHeader(AUTHORIZATION, JwtConstant.PREFIX.concat(jwtToken));
        response.addHeader(ACEH, AUTHORIZATION);
    }

    // Get token from authorization header
    public static Authentication getAuthentication(final HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION);
        if (token != null) {
            String user = Jwts
                    .parser()
                    .setSigningKey(JwtConstant.SIGNING_KEY)
                    .parseClaimsJws(token.replace(JwtConstant.PREFIX, ""))
                    .getBody()
                    .getSubject();
            if (user != null) {
                return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
            }
        }
        return null;
    }
}
