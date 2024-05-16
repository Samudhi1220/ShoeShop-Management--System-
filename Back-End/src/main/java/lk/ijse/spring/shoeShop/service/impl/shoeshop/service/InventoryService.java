package lk.ijse.spring.shoeShop.service.impl.shoeshop.service;

import lk.ijse.spring.shoeshop.dto.InventoryDTO;

import java.util.List;


public interface InventoryService {

    void saveInventory(InventoryDTO inventoryDTO);
    InventoryDTO checkStatus(InventoryDTO inventoryDTO);
    String checkSupplier(InventoryDTO inventoryDTO);

    void updateInventory(InventoryDTO inventoryDTO);

    void deleteInventory(String id);

    List<InventoryDTO> getAllInventory();

    InventoryDTO getInventory(String id);

}
