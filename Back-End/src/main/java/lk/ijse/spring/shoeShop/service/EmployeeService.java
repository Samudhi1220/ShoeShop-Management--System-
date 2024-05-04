package lk.ijse.spring.shoeShop.service;

import lk.ijse.spring.shoeShop.entity.Employee;

import java.util.List;

public interface EmployeeService {
    void saveEmployee(Employee employee);
    void updateEmployee(Employee employee);
    void deleteEmployee(String id);
    Employee getEmployee(String id);
    List<Employee> getAllEmployees();
}
