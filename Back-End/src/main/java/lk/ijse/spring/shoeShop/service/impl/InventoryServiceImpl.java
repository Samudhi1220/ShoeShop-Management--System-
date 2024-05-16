package lk.ijse.spring.shoeShop.service.impl;

import jakarta.persistence.EntityExistsException;
import lk.ijse.spring.shoeShop.dto.InventoryDTO;
import lk.ijse.spring.shoeShop.entity.Inventory;
import lk.ijse.spring.shoeShop.entity.Size;
import lk.ijse.spring.shoeShop.repository.InventoryRepository;
import lk.ijse.spring.shoeShop.repository.SizeRepository;
import lk.ijse.spring.shoeShop.repository.SupplierRepository;
import lk.ijse.spring.shoeShop.service.InventoryService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class InventoryServiceImpl {
    SupplierRepository supplierRepository;
    InventoryRepository inventoryRepository;
    SizeRepository sizeRepository;
    ModelMapper modelMapper;


}
