package com.excursion.excursion;

import com.excursion.excursion.converter.ExcursionDtoToExcursionConverter;
import com.excursion.excursion.converter.ExcursionToExcursionDtoConverter;
import com.excursion.system.Result;
import com.excursion.system.StatusCode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.stream.Collectors;

import static com.excursion.util.Global.*;

@RestController
@RequestMapping("/excursions")
@RequiredArgsConstructor
public class ExcursionController {

    private final ExcursionService service;
    private final ExcursionToExcursionDtoConverter toDtoConverter;
    private final ExcursionDtoToExcursionConverter toExcursionConverter;

    @GetMapping
    public Result findAll() {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Find All",
                service.findAll().stream().map(toDtoConverter::convert).collect(Collectors.toList())
        );
    }

    @GetMapping("/{excursionId}")
    @Secured({ADMIN, MANAGER, USER})
    public Result find(@PathVariable String excursionId) {
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Find",
                toDtoConverter.convert(service.findById(excursionId))
        );
    }

    @PostMapping
    @Secured({MANAGER})
    public Result save(@Valid @RequestBody ExcursionDto excursionDto, @RequestParam String categoryId) {
        Excursion newExcursion = toExcursionConverter.convert(excursionDto);
        Excursion saved = service.save(newExcursion, categoryId);
        ExcursionDto savedDto = toDtoConverter.convert(saved);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Save",
                savedDto
        );
    }

    @PutMapping("/{excursionId}")
    @Secured({MANAGER})
    public Result update(@RequestBody ExcursionDto excursionDto, @RequestParam String categoryId, @PathVariable String excursionId) {
        Excursion update = toExcursionConverter.convert(excursionDto);
        Excursion updated = service.update(update, categoryId, excursionId);
        ExcursionDto updatedDto = toDtoConverter.convert(updated);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Update",
                updatedDto
        );
    }

    @PatchMapping("/{excursionId}/img")
    @Secured({MANAGER})
    public Result updateImg(@PathVariable String excursionId, @RequestParam MultipartFile file) {
        Excursion updated = service.updateImg(excursionId, file);
        ExcursionDto updatedDto = toDtoConverter.convert(updated);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Update Img",
                updatedDto
        );
    }

    @DeleteMapping("/{excursionId}")
    @Secured({MANAGER})
    public Result delete(@PathVariable String excursionId) {
        service.deleteById(excursionId);
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Success Delete"
        );
    }

}
