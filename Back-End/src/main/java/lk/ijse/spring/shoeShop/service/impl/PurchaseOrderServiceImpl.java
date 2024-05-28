package lk.ijse.spring.shoeShop.service.impl;

import lk.ijse.spring.shoeShop.dto.CustomerDTO;
import lk.ijse.spring.shoeShop.dto.SaleDTO;
import lk.ijse.spring.shoeShop.dto.SaleDetailsDTO;
import lk.ijse.spring.shoeShop.embedded.LoyaltyLevel;
import lk.ijse.spring.shoeShop.embedded.OrderStatus;
import lk.ijse.spring.shoeShop.entity.Customer;
import lk.ijse.spring.shoeShop.entity.Inventory;
import lk.ijse.spring.shoeShop.entity.SaleDetails;
import lk.ijse.spring.shoeShop.entity.Sales;
import lk.ijse.spring.shoeShop.repository.CustomerRepository;
import lk.ijse.spring.shoeShop.repository.InventoryRepository;
import lk.ijse.spring.shoeShop.repository.PurchaseOrderDetailsRepository;
import lk.ijse.spring.shoeShop.repository.PurchaseOrderRepository;
import lk.ijse.spring.shoeShop.service.PurchaseOrderService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    private final PurchaseOrderRepository purchaseOrderRepository;
    private final CustomerRepository customerRepository;
    private final InventoryRepository inventoryRepository;
    private final PurchaseOrderDetailsRepository purchaseOrderDetailsRepository;
    private final ModelMapper modelMapper;


    public PurchaseOrderServiceImpl(PurchaseOrderRepository purchaseOrderRepository, CustomerRepository customerRepository, InventoryRepository inventoryRepository, PurchaseOrderDetailsRepository purchaseOrderDetailsRepository, ModelMapper modelMapper) {
        this.purchaseOrderRepository = purchaseOrderRepository;
        this.customerRepository = customerRepository;
        this.inventoryRepository = inventoryRepository;
        this.purchaseOrderDetailsRepository = purchaseOrderDetailsRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public String lastId() {
        return purchaseOrderRepository.getLastIndex();
    }

    @Override
    public void purchaseOrder(SaleDTO saleDTO) {
        saleDTO.setPurchaseDate(LocalDate.now());
        saleDTO.setStatus(OrderStatus.ACTIVE);
//        saleDTO.setStatus(Order_Status.ACTIVE);
//        System.out.println(saleDTO.getCustomerId().getCustomerId());

        if (saleDTO.getCustomerId().getCustomerId() != null) {
            Customer customer = customerRepository.findByCustomerId(saleDTO.getCustomerId().getCustomerId());
            // Update customer loyalty points and level
            if (saleDTO.getTotal() >= 800) {
                saleDTO.setTotalPoints(1);
                customer.setTotalPoints(customer.getTotalPoints() + saleDTO.getTotalPoints());
            }
            customer.setRecentPurchase(LocalDate.now());
            updateCustomerLoyaltyLevel(customer);
        } else {
            CustomerDTO customerDTO = new CustomerDTO();
            customerDTO.setCustomerId("Nan");
            saleDTO.setCustomerId(customerDTO);
        }


        for (SaleDetailsDTO saleDetailsDTO : saleDTO.getSaleDetails()) {
            saleDetailsDTO.setStatus(OrderStatus.ACTIVE);

            updateInventoryAndSizeQuantities(saleDetailsDTO);
        }

        purchaseOrderRepository.save(modelMapper.map(saleDTO, Sales.class));

    }

    @Override
    public List<SaleDTO> getAllSales() {
//        Object map = modelMapper.map(purchaseOrderRepository.findAll(), new TypeToken<List<SaleDTO>>() {
//        }.getType());
        List<Sales> all = purchaseOrderRepository.findAll();
        for (Sales sales : all) {
            sales.setSaleDetails(null);
        }
        return modelMapper.map(all, new TypeToken<List<SaleDTO>>() {
        }.getType());

    }

    @Override
    public List<SaleDetailsDTO> getSaleDetails() {
        List<SaleDetails> all = purchaseOrderDetailsRepository.findAll();
        for (SaleDetails saleDetails : all) {
            saleDetails.getOrderNo().setSaleDetails(null);
        }
        return modelMapper.map(all, new TypeToken<List<SaleDetailsDTO>>() {
        }.getType());
    }

    @Override
    public void returnFullOrder(String orderId) {
        if (purchaseOrderRepository.existsById(orderId)) {
            Sales byOrderNo = purchaseOrderRepository.findByOrderNo(orderId);
            if (byOrderNo.getStatus() == OrderStatus.ACTIVE) {

                byOrderNo.setStatus(OrderStatus.RETURNED);

                List<SaleDetails> byOrderNo1 = purchaseOrderDetailsRepository.findByOrderNo(byOrderNo);

                for (SaleDetails saleDetails : byOrderNo1) {
                    int qty = saleDetails.getItmQTY();
                    saleDetails.setReturn_qty(saleDetails.getReturn_qty() + qty);
                    saleDetails.setItmQTY(0);
                    Inventory byItemCode = inventoryRepository.findByItemCode(saleDetails.getInventory().getItemCode());
                    byItemCode.setQty(byItemCode.getQty() + qty);
                    saleDetails.setStatus(OrderStatus.RETURNED);
                }
            } else {
                throw new RuntimeException("This order already returned!");
            }
        } else {
            throw new RuntimeException("Order not found!");
        }

    }

    @Override
    public boolean canBeReturned(String orderNo) {
        Sales sales = purchaseOrderRepository.findById(orderNo).orElse(null);
        if (sales == null) {
            return false;
        }

        LocalDate purchaseDate = sales.getPurchaseDate();

        LocalDate threeDaysFromPurchase = purchaseDate.plusDays(3);

        LocalDate currentDate = LocalDate.now();

        return !currentDate.isAfter(threeDaysFromPurchase);
    }


    private void updateCustomerLoyaltyLevel(Customer customer) {
        if (customer.getTotalPoints() >= 200) {
            customer.setLevel(LoyaltyLevel.GOLD);
        } else if (customer.getTotalPoints() >= 100) {
            customer.setLevel(LoyaltyLevel.SILVER);
        } else if (customer.getTotalPoints() >= 50) {
            customer.setLevel(LoyaltyLevel.BRONZE);
        } else {
            customer.setLevel(LoyaltyLevel.NEW);
        }
    }

    private void updateInventoryAndSizeQuantities(SaleDetailsDTO saleDetailsDTO) {
        Inventory inventory = inventoryRepository.findByItemCode(saleDetailsDTO.getInventory().getItemCode());

        int newInventoryQty = inventory.getQty() - saleDetailsDTO.getItmQTY();
        inventory.setQty(newInventoryQty);

        double percentage = ((double) newInventoryQty / 10) * 100;
        if (percentage > 50) {
            inventory.setStatus("Available");
        } else if (percentage <= 50 && percentage > 0) {
            inventory.setStatus("Low");
        } else if (newInventoryQty == 0) {
            inventory.setStatus("Not Available");
        }
    }
}