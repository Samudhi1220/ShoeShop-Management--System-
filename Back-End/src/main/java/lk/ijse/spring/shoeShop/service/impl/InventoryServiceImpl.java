package lk.ijse.spring.shoeShop.service.impl;

import jakarta.persistence.EntityExistsException;
import lk.ijse.spring.shoeShop.dto.EmployeeDTO;
import lk.ijse.spring.shoeShop.dto.InventoryDTO;
import lk.ijse.spring.shoeShop.entity.Inventory;
import lk.ijse.spring.shoeShop.repository.InventoryRepository;

import lk.ijse.spring.shoeShop.repository.SupplierRepository;
import lk.ijse.spring.shoeShop.service.InventoryService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {
    SupplierRepository supplierRepository;
    InventoryRepository inventoryRepository;

    ModelMapper modelMapper;

    public InventoryServiceImpl(InventoryRepository inventoryRepository, ModelMapper modelMapper, SupplierRepository supplierRepository
    ) {
        this.inventoryRepository = inventoryRepository;
        this.modelMapper = modelMapper;
        this.supplierRepository = supplierRepository;


    }

    @Override
    public void saveInventory(InventoryDTO inventoryDTO) {

        if (supplierRepository.existsById(inventoryDTO.getSupplier().getSupplierCode())) {

            if (inventoryRepository.existsById(inventoryDTO.getItemCode())) {
                int totalQty = inventoryDTO.getQty() + inventoryRepository.getQtyById(inventoryDTO.getItemCode());
                inventoryDTO.setQty(totalQty);
            }

            if (inventoryDTO.getBuyPrice() <= inventoryDTO.getSalePrice()) {
                double expectedProfit = inventoryDTO.getSalePrice() - inventoryDTO.getBuyPrice();
                inventoryDTO.setExpectedProfit(expectedProfit);
                double profitMargin = (expectedProfit / inventoryDTO.getSalePrice()) * 100;
                inventoryDTO.setProfitMargin(profitMargin);

            } else {
                throw new RuntimeException("Please check prices");

            }

            inventoryRepository.save(modelMapper.map(inventoryDTO,Inventory.class));

        } else {
            throw new RuntimeException("supplier not found.");
        }

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
        if (inventoryDTO == null || inventoryDTO.getItemCode() == null) {
            throw new IllegalArgumentException("InventoryDTO or ItemCode cannot be null.");
        }

        if (supplierRepository.existsById(inventoryDTO.getSupplier().getSupplierCode())) {
            if (!inventoryRepository.existsById(inventoryDTO.getItemCode())) {
                throw new RuntimeException("Item not found.");
            }

            Inventory existingInventory = inventoryRepository.findById(inventoryDTO.getItemCode()).orElseThrow(() -> new RuntimeException("Item not found."));
            existingInventory.setItemDesc(inventoryDTO.getItemDesc());
            existingInventory.setCategory(inventoryDTO.getCategory());
            existingInventory.setQty(inventoryDTO.getQty());
            existingInventory.setBuyPrice(inventoryDTO.getBuyPrice());
            existingInventory.setSalePrice(inventoryDTO.getSalePrice());
            existingInventory.setSize(inventoryDTO.getSize());

            if (inventoryDTO.getBuyPrice() <= inventoryDTO.getSalePrice()) {
                double expectedProfit = inventoryDTO.getSalePrice() - inventoryDTO.getBuyPrice();
                existingInventory.setExpectedProfit(expectedProfit);
                double profitMargin = (expectedProfit / inventoryDTO.getSalePrice()) * 100;
                existingInventory.setProfitMargin(profitMargin);
            } else {
                throw new RuntimeException("Please check prices");
            }

            inventoryRepository.save(existingInventory);
        } else {
            throw new RuntimeException("Supplier not found.");
        }

    }

    @Override
    public void deleteInventory(String id) {

    }

    @Override
    public List<InventoryDTO> getAllInventory() {
        return modelMapper.map(inventoryRepository.findAll(), new TypeToken<List<InventoryDTO>>() {
        }.getType());
    }

    @Override
    public InventoryDTO getInventory(String id) {
        return modelMapper.map(inventoryRepository.findById(id), InventoryDTO.class);
    }
}
