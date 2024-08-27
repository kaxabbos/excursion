package com.excursion.appUser.converter;

import com.excursion.appUser.AppUser;
import com.excursion.appUser.UserDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class UserDtoToUserConverter implements Converter<UserDto, AppUser> {

    @Override
    public AppUser convert(UserDto source) {
        return new AppUser(
                source.username()
        );
    }
}
