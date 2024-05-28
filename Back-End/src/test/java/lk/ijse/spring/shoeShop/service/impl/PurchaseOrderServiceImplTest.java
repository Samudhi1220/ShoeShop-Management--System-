package lk.ijse.spring.shoeShop.service.impl;

import lk.ijse.spring.shoeShop.dto.SaleDetailsDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class PurchaseOrderServiceImplTest {
    @Autowired
    PurchaseOrderServiceImpl purchaseOrderService;

    @Test
    void lastId() {
    }

    @Test
    void purchaseOrder() {
    }

    @Test
    void getAllSales() {
    }

    @Test
    void getSaleDetails() {
        List<SaleDetailsDTO> saleDetails = purchaseOrderService.getSaleDetails();
        for (SaleDetailsDTO  saleDetailsDTO : saleDetails ){
            System.out.println(saleDetailsDTO);
        }
    }
}