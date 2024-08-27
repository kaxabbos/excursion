package com.excursion.stats;

import com.excursion.category.Category;
import com.excursion.category.CategoryService;
import com.excursion.system.Result;
import com.excursion.system.StatusCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.excursion.util.Global.ADMIN;

@RestController
@RequestMapping("/stats")
@RequiredArgsConstructor
@Secured({ADMIN})
public class StatsController {

    private final CategoryService categoryService;

    @GetMapping("/categories")
    public Result getStatsCategories() {
        Map<String, List<?>> res = new HashMap<>();

        List<Category> categories = categoryService.findAll();
        List<String> names = new ArrayList<>();
        List<Float> values = new ArrayList<>();

        for (Category category : categories) {
            names.add(category.getName());
            values.add(1f);
        }

        res.put("names", names);
        res.put("values", values);

        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Stats",
                res
        );
    }

}
