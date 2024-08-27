package com.excursion.ordering;

public record OrderingDto(
        Long id,
        String date,
        float price,
        String status,
        String statusName,
        String ownerName,
        String excursionName,
        Long excursionId
) {
}
