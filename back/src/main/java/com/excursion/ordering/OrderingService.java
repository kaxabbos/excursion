package com.excursion.ordering;

import com.excursion.appUser.AppUser;
import com.excursion.appUser.UserService;
import com.excursion.enums.OrderingStatus;
import com.excursion.enums.Role;
import com.excursion.excursion.Excursion;
import com.excursion.excursion.ExcursionService;
import com.excursion.system.exception.ObjectNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderingService {

    private final OrderingRepository repository;
    private final UserService userService;
    private final ExcursionService excursionService;

    public List<Ordering> findAll() {
        AppUser user = userService.getCurrentUser();
        if (user.getRole() == Role.USER) {
            return repository.findAllByOwner_Id(user.getId());
        }
        if (user.getRole() == Role.MANAGER) {
            return repository.findAllByExcursion_Manager_Id(user.getId());
        }
        return new ArrayList<>();
    }

    public Ordering findById(String orderingId) {
        try {
            Long id = Long.parseLong(orderingId);
            return repository.findById(id).orElseThrow();
        } catch (Exception e) {
            throw new ObjectNotFoundException("Не найдена запись по ИД " + orderingId);
        }
    }

    public Ordering save(String date, String excursionId) {
        Excursion excursion = excursionService.findById(excursionId);
        return repository.save(new Ordering(date, excursion, userService.getCurrentUser()));
    }

    public Ordering done(String orderingId) {
        Ordering ordering = findById(orderingId);
        ordering.setStatus(OrderingStatus.DONE);
        return repository.save(ordering);
    }

    public Ordering reject(String orderingId) {
        Ordering ordering = findById(orderingId);
        ordering.setStatus(OrderingStatus.REJECT);
        return repository.save(ordering);
    }
}
