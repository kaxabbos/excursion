package com.excursion.excursion.converter;

import com.excursion.excursion.Excursion;
import com.excursion.excursion.ExcursionDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ExcursionToExcursionDtoConverter implements Converter<Excursion, ExcursionDto> {
    @Override
    public ExcursionDto convert(Excursion source) {
        return new ExcursionDto(
                source.getId(),
                source.getName(),
                source.getDescription(),
                source.getPrice(),
                source.getImg(),
                source.getManager().getId(),
                source.getManager().getUsername(),
                source.getCategory().getId(),
                source.getCategory().getName()
        );
    }
}
