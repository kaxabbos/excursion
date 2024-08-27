package com.excursion.ordering;

import com.excursion.ordering.converter.OrderingToOrderingDtoConverter;
import com.excursion.system.Result;
import com.excursion.system.StatusCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

import static com.excursion.util.Global.MANAGER;
import static com.excursion.util.Global.USER;

@RestController
@RequestMapping("/orderings")
@RequiredArgsConstructor
public class OrderingController {

    private final OrderingService service;
    private final OrderingToOrderingDtoConverter toDtoConverter;

    @GetMapping
    @Secured({USER, MANAGER})
    public Result getOrderings() {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success",
                service.findAll().stream().map(toDtoConverter::convert).collect(Collectors.toList())
        );
    }

    @PostMapping
    @Secured({USER})
    public Result save(@RequestParam String date, @RequestParam String excursionId) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success",
                toDtoConverter.convert(service.save(date, excursionId))
        );
    }

    @GetMapping("/{orderingId}/done")
    @Secured({MANAGER})
    public Result done(@PathVariable String orderingId) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Done",
                toDtoConverter.convert(service.done(orderingId))
        );
    }

    @GetMapping("/{orderingId}/reject")
    @Secured({MANAGER})
    public Result reject(@PathVariable String orderingId) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Delivery",
                toDtoConverter.convert(service.reject(orderingId))
        );
    }

}
