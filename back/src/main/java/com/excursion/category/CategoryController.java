package com.excursion.category;

import com.excursion.category.converter.CategoryDtoToCategoryConverter;
import com.excursion.category.converter.CategoryToCategoryDtoConverter;
import com.excursion.system.Result;
import com.excursion.system.StatusCode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

import static com.excursion.util.Global.ADMIN;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;
    private final CategoryToCategoryDtoConverter toDtoConverter;
    private final CategoryDtoToCategoryConverter toCategoryConverter;

    @GetMapping
    public Result findAll() {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Find All Categories",
                service.findAll().stream().map(toDtoConverter::convert).collect(Collectors.toList())
        );
    }

    @Secured({ADMIN})
    @GetMapping("/{categoryId}")
    public Result findById(@PathVariable String categoryId) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Find Category",
                toDtoConverter.convert(service.findById(categoryId))
        );
    }

    @Secured({ADMIN})
    @PostMapping
    public Result add(@Valid @RequestBody CategoryDto categoryDto) {
        Category newCategory = toCategoryConverter.convert(categoryDto);
        Category savedCategory = service.add(newCategory);
        CategoryDto savedCategoryDto = toDtoConverter.convert(savedCategory);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Add Category",
                savedCategoryDto
        );
    }

    @Secured({ADMIN})
    @PutMapping("/{categoryId}")
    public Result update(@RequestBody CategoryDto categoryDto, @PathVariable String categoryId) {
        Category old = toCategoryConverter.convert(categoryDto);
        Category updated = service.update(old, categoryId);
        CategoryDto updatedDto = toDtoConverter.convert(updated);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Update Category",
                updatedDto
        );
    }

    @Secured({ADMIN})
    @DeleteMapping("/{categoryId}")
    public Result delete(@PathVariable String categoryId) {
        service.deleteById(categoryId);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Delete Category"
        );
    }
}