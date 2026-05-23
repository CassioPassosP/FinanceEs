package com.finance.api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        System.out.println("\n========== JWT FILTER ==========");

        String header = request.getHeader("Authorization");

        System.out.println("HEADER AUTHORIZATION: " + header);

        // ignora requests OPTIONS (CORS)
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        try {

            String token = extrairToken(request);

            System.out.println("TOKEN EXTRAIDO: " + token);

            if (token != null) {

                boolean tokenValido = jwtService.validarToken(token);

                System.out.println("TOKEN VALIDO? " + tokenValido);

                if (tokenValido) {

                    String email = jwtService.extrairEmail(token);

                    System.out.println("EMAIL EXTRAIDO: " + email);

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    email,
                                    null,
                                    List.of(new SimpleGrantedAuthority("ROLE_USER"))
                            );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authentication);

                    System.out.println("USUARIO AUTENTICADO COM SUCESSO");
                }

            } else {

                System.out.println("TOKEN NAO ENCONTRADO");
            }

        } catch (Exception e) {

            System.out.println("ERRO AO PROCESSAR JWT:");
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }

    private String extrairToken(HttpServletRequest request) {

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }

        return null;
    }
}