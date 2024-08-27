package com.excursion.excursion;

import com.excursion.appUser.UserService;
import com.excursion.category.CategoryService;
import com.excursion.system.exception.BadRequestException;
import com.excursion.system.exception.ObjectNotFoundException;
import com.excursion.util.Global;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExcursionService {

    private final ExcursionRepository repository;
    private final CategoryService categoryService;
    private final UserService userService;

    public List<Excursion> findAll() {
        return repository.findAll();
    }

    public Excursion findById(String excursionId) {
        try {
            Long longId = Long.parseLong(excursionId);
            return repository.findById(longId).orElseThrow();
        } catch (Exception e) {
            throw new ObjectNotFoundException("Не найден продукт с ИД: " + excursionId);
        }
    }

    public Excursion save(Excursion excursion, String categoryId) {
        excursion.setCategory(categoryService.findById(categoryId));
        excursion.setManager(userService.getCurrentUser());
        return repository.save(excursion);
    }

    public Excursion update(Excursion excursion, String categoryId, String excursionId) {
        Excursion old = findById(excursionId);

        if (!userService.getCurrentUser().getId().equals(old.getManager().getId())) {
            throw new BadRequestException("У вас нету прав");
        }

        old.set(excursion);
        old.setCategory(categoryService.findById(categoryId));
        return repository.save(old);
    }

    public Excursion updateImg(String excursionId, MultipartFile file) {
        Excursion old = findById(excursionId);
        try {
            old.setImg(Global.saveFile(file, "excursion"));
        } catch (IOException e) {
            throw new BadRequestException("Некорректное изображение");
        }
        return repository.save(old);
    }

    public void deleteById(String excursionId) {
        Excursion excursion = findById(excursionId);
        repository.deleteById(excursion.getId());
    }
}
