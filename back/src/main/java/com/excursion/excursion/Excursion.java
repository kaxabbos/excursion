package com.excursion.excursion;

import com.excursion.appUser.AppUser;
import com.excursion.category.Category;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Excursion {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "excursion_g")
    @SequenceGenerator(name = "excursion_g", sequenceName = "excursion_seq", allocationSize = 1)
    private Long id;

    private String name;
    private String img;
    private float price;
    @Column(length = 5000)
    private String description;

    @ManyToOne
    private Category category;
    @ManyToOne
    private AppUser manager;

    public Excursion(String name, String description, float price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public void set(Excursion excursion) {
        this.name = excursion.getName();
        this.price = excursion.getPrice();
        this.description = excursion.getDescription();
    }
}
