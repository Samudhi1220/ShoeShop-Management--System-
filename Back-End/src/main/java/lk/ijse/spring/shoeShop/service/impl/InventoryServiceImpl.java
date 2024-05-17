package lk.ijse.spring.shoeShop.service.impl;

import lk.ijse.spring.shoeShop.dto.InventoryDTO;
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
        return null;
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
        return null;
    }
}
