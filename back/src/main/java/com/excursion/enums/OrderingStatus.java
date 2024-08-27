package com.excursion.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum OrderingStatus {
    WAITING("Ожидание"),
    DONE("Выполнено"),
    REJECT("Отказано"),
    ;

    private final String name;

}

