package lk.ijse.spring.shoeShop.repository;

import lk.ijse.spring.shoeShop.entity.SaleDetails;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseOrderDetailsRepository extends JpaRepository<SaleDetails,String> {

}
