package com.excursion.excursion.converter;

import com.excursion.excursion.Excursion;
import com.excursion.excursion.ExcursionDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class ExcursionDtoToExcursionConverter implements Converter<ExcursionDto, Excursion> {
    @Override
    public Excursion convert(ExcursionDto source) {
        return new Excursion(
                source.name(),
                source.description(),
                source.price()
        );
    }
}
