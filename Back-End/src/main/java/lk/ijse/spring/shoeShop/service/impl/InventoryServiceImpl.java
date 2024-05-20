package lk.ijse.spring.shoeShop.service.impl;

import jakarta.persistence.EntityExistsException;
import lk.ijse.spring.shoeShop.dto.InventoryDTO;
import lk.ijse.spring.shoeShop.entity.Inventory;
import lk.ijse.spring.shoeShop.repository.InventoryRepository;

import lk.ijse.spring.shoeShop.repository.SupplierRepository;
import lk.ijse.spring.shoeShop.service.InventoryService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {
    SupplierRepository supplierRepository;
    InventoryRepository inventoryRepository;

    ModelMapper modelMapper;

    public InventoryServiceImpl(InventoryRepository inventoryRepository, ModelMapper modelMapper,   SupplierRepository supplierRepository
                        ) {
        this.inventoryRepository = inventoryRepository;
        this.modelMapper = modelMapper;
        this.supplierRepository = supplierRepository;


    }
    @Override
    public void saveInventory(InventoryDTO inventoryDTO) {


    }

    @Override
    public InventoryDTO checkStatus(InventoryDTO inventoryDTO) {
        try {
            if (inventoryDTO == null || inventoryDTO.getItemCode() == null) {
                throw new IllegalArgumentException("InventoryDTO or ItemCode cannot be null.");
            }

            if (inventoryRepository.existsById(inventoryDTO.getItemCode())) {
                Inventory byItemCode = inventoryRepository.findByItemCode(inventoryDTO.getItemCode());
                return modelMapper.map(byItemCode, InventoryDTO.class);
            } else {
                inventoryDTO.setStatus("No Item Found");
                return inventoryDTO;
            }
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while checking inventory status.");
        }
    }

    @Override
    public String checkSupplier(InventoryDTO inventoryDTO) {
        if (supplierRepository.existsById(inventoryDTO.getSupplier().getSupplierCode())) {
            return supplierRepository.findNameById(inventoryDTO.getSupplier().getSupplierCode());
        } else {
            return "Supplier Not Found";
        }
    }

    @Override
    public void updateInventory(InventoryDTO inventoryDTO) {

    }

    @Override
    public void deleteInventory(String id) {

    }

    @Override
    public List<InventoryDTO> getAllInventory() {
        return null;
    }

    @Override
    public InventoryDTO getInventory(String id) {
        return modelMapper.map(inventoryRepository.findById(id), InventoryDTO.class);
    }
}
