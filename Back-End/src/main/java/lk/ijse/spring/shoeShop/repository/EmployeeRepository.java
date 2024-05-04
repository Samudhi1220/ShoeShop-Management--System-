package lk.ijse.spring.shoeShop.repository;

import lk.ijse.spring.shoeShop.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
}
