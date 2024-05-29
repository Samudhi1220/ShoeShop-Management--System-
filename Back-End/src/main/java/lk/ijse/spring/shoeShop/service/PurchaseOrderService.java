package lk.ijse.spring.shoeShop.service;

import lk.ijse.spring.shoeShop.dto.SaleDTO;
import lk.ijse.spring.shoeShop.dto.SaleDetailsDTO;
import lk.ijse.spring.shoeShop.entity.Sales;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface PurchaseOrderService {
    String lastId();
    public void purchaseOrder(SaleDTO saleDTO);

    List<SaleDTO> getAllSales();

    List<SaleDetailsDTO> getSaleDetails();

    void returnFullOrder(String orderId);
    void returnOneItem(SaleDetailsDTO saleDetailsDTO);
    boolean canBeReturned(String orderNo);
    int totalSalesOfASelectedDate(LocalDate date);

    double totalProfitOfASelectedDate(LocalDate localDate);

    Map<String, Object> mostSoldItemAndColor(LocalDate date);

    List<Sales> getLastThreeOrders();

    int totalItemsSoldOnDate(LocalDate date);

}
