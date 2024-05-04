package lk.ijse.spring.shoeShop.service;

import lk.ijse.spring.shoeShop.dto.EmployeeDTO;
import lk.ijse.spring.shoeShop.entity.Employee;

import java.util.List;

public interface EmployeeService {
    void saveEmployee(EmployeeDTO employee);
    void updateEmployee(EmployeeDTO employee);
    void deleteEmployee(String id);
    EmployeeDTO getEmployee(String id);
    List<EmployeeDTO> getAllEmployees();
    String lastId();
}
