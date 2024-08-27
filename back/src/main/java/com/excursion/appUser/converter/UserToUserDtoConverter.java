package com.excursion.appUser.converter;

import com.excursion.appUser.AppUser;
import com.excursion.appUser.UserDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class UserToUserDtoConverter implements Converter<AppUser, UserDto> {

    @Override
    public UserDto convert(AppUser source) {
        return new UserDto(
                source.getId(),
                source.getUsername(),
                source.getRole().name()
        );
    }
}
