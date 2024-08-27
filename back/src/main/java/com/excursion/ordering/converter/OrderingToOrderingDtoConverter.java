package com.excursion.ordering.converter;

import com.excursion.ordering.Ordering;
import com.excursion.ordering.OrderingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderingToOrderingDtoConverter implements Converter<Ordering, OrderingDto> {


    @Override
    public OrderingDto convert(Ordering source) {
        return new OrderingDto(
                source.getId(),
                source.getDate(),
                source.getPrice(),
                source.getStatus().name(),
                source.getStatus().getName(),
                source.getOwner().getUsername(),
                source.getExcursion().getName(),
                source.getExcursion().getId()
        );
    }
}
