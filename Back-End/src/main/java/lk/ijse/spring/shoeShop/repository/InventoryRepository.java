package lk.ijse.spring.shoeShop.repository;

import lk.ijse.spring.shoeShop.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface InventoryRepository extends JpaRepository<Inventory, String> {
    Inventory findByItemCode(String itemCode);
    @Query("SELECT i.status FROM Inventory i WHERE i.itemCode = :id")
    String findStatusById(String id);

    @Query("SELECT i.qty FROM Inventory i WHERE i.itemCode = :id")
    String findQtyById(String id);

    @Query("SELECT i.itemPicture FROM Inventory i WHERE i.itemCode = :id")
    String findPictureById(String id);
}
