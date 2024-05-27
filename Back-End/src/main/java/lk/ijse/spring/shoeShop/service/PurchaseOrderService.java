package lk.ijse.spring.shoeShop.service;

import lk.ijse.spring.shoeShop.dto.SaleDTO;

public interface PurchaseOrderService {
    String lastId();
    public void purchaseOrder(SaleDTO saleDTO);
}
