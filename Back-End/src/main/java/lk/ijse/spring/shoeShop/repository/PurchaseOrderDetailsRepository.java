package lk.ijse.spring.shoeShop.repository;

import lk.ijse.spring.shoeShop.entity.SaleDetails;
import lk.ijse.spring.shoeShop.entity.Sales;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseOrderDetailsRepository extends JpaRepository<SaleDetails,String> {

    List<SaleDetails> findByOrderNo(Sales sales);
}
