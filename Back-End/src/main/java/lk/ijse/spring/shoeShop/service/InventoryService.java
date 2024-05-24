package lk.ijse.spring.shoeShop.service;

import lk.ijse.spring.shoeShop.dto.InventoryDTO;
import lk.ijse.spring.shoeShop.entity.Inventory;

import java.util.List;


public interface InventoryService {

    void saveInventory(InventoryDTO inventoryDTO);
    InventoryDTO checkStatus(InventoryDTO inventoryDTO);
    String checkSupplier(InventoryDTO inventoryDTO);


    void updateInventory(InventoryDTO inventoryDTO);

    void deleteInventory(String id);

    List<InventoryDTO> getAllInventory();

    InventoryDTO getInventory(String id);

    Object getItemDetailsForOrder(InventoryDTO inventoryDTO);
}
