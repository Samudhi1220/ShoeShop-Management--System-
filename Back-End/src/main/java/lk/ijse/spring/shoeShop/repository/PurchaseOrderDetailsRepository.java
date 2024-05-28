package lk.ijse.spring.shoeShop.repository;

import lk.ijse.spring.shoeShop.entity.Inventory;
import lk.ijse.spring.shoeShop.entity.SaleDetails;
import lk.ijse.spring.shoeShop.entity.Sales;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseOrderDetailsRepository extends JpaRepository<SaleDetails,String> {

    List<SaleDetails> findAllByOrderNo(Sales sales);

    boolean existsByInventoryAndOrderNo(Inventory inventory ,Sales sales);

    SaleDetails findByOrderNoAndInventory(Sales sales,Inventory inventory);
}
