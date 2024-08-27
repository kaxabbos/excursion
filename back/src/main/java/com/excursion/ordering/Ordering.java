package com.excursion.ordering;

import com.excursion.appUser.AppUser;
import com.excursion.enums.OrderingStatus;
import com.excursion.excursion.Excursion;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Ordering {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "ordering_g")
    @SequenceGenerator(name = "ordering_g", sequenceName = "ordering_seq", allocationSize = 1)
    private Long id;

    private String date;
    private float price;

    @Enumerated(EnumType.STRING)
    private OrderingStatus status = OrderingStatus.WAITING;

    @ManyToOne
    private Excursion excursion;
    @ManyToOne
    private AppUser owner;

    public Ordering(String date, Excursion excursion, AppUser owner) {
        this.date = date;
        this.excursion = excursion;
        this.owner = owner;
        this.price = excursion.getPrice();
    }
}
