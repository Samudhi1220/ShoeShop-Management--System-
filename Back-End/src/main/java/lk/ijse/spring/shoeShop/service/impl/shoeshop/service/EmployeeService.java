package lk.ijse.spring.shoeShop.service.impl.shoeshop.service;

import lk.ijse.spring.shoeshop.dto.EmployeeDTO;

import java.util.List;

public interface EmployeeService {
    void saveEmployee(EmployeeDTO employee);
    void updateEmployee(EmployeeDTO employee);
    void deleteEmployee(String id);
    EmployeeDTO getEmployee(String id);
    List<EmployeeDTO> getAllEmployees();
    String lastId();
    List<EmployeeDTO> searchEmployeesById(String idOrName, boolean activeStatus);

    List<EmployeeDTO> findAllByActiveStatus(boolean activeStatus);

}
