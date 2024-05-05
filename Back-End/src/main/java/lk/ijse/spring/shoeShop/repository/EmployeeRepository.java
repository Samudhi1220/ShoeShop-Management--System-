package lk.ijse.spring.shoeShop.repository;

import lk.ijse.spring.shoeShop.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
    @Query(value = "SELECT employee_id FROM Employee ORDER BY LENGTH(employee_id) DESC, employee_id DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
    boolean existsByContactNo(String contactNo);
    boolean existsByEmail(String email);
    boolean existsByEmergencyContact(String emergencyContact);

    List<Employee> findByEmployeeIdStartingWithOrEmployeeNameStartingWith(String employeeIdStart, String employeeNameStart);
}
