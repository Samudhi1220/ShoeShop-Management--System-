package lk.ijse.spring.shoeShop.api;

import lk.ijse.spring.shoeShop.dto.CustomerDTO;
import lk.ijse.spring.shoeShop.dto.InventoryDTO;
import lk.ijse.spring.shoeShop.dto.SaleDTO;
import lk.ijse.spring.shoeShop.dto.SaleDetailsDTO;
import lk.ijse.spring.shoeShop.service.CustomerService;
import lk.ijse.spring.shoeShop.service.InventoryService;
import lk.ijse.spring.shoeShop.service.PurchaseOrderService;
import lk.ijse.spring.shoeShop.util.GenerateNewId;
import lk.ijse.spring.shoeShop.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/orders")
@CrossOrigin
public class PurchaseOrderController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private InventoryService inventoryService;

    @Autowired
    PurchaseOrderService purchaseOrderService;

    @PostMapping( "/item")
    public ResponseUtil getItemDetails(@RequestBody InventoryDTO inventoryDTO){
        return new ResponseUtil("200","Successfully Fetch Customers",inventoryService.getItemDetailsForOrder(inventoryDTO));
    }

    @PostMapping( "/customer")
    public ResponseUtil getCustomerDetails(@RequestBody CustomerDTO customerDTO){
        return new ResponseUtil("200","Successfully Fetch Customers",
                customerService.getCustomerDetailsForOrder(customerDTO));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/id")
    public ResponseUtil getNewId() {
        return new ResponseUtil("200", "Successfully Generated New Id",
                GenerateNewId.nextId(purchaseOrderService.lastId(), "OR00"));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil purchaseOrder(@RequestBody SaleDTO saleDTO){
        purchaseOrderService.purchaseOrder(saleDTO);
        return new ResponseUtil("200","Successfully Purchased",null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/allOrders")
    public ResponseUtil getAllOrders() {
        return new ResponseUtil("200", "Successfully Generated New Id",
           purchaseOrderService.getAllSales()   );
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/allDetails")
    public ResponseUtil getAllSaleDetails() {
        return new ResponseUtil("200", "Successfully Generated New Id",
                purchaseOrderService.getSaleDetails()   );
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping("/{orderId}")
    public ResponseUtil orderCanBeReturned(@PathVariable String orderId){
        return new ResponseUtil("200","Successfully Fetch Can Be Returned",
                purchaseOrderService.canBeReturned(orderId));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{returnOrderId}")
    public ResponseUtil returnFullOrder(@PathVariable("returnOrderId") String orderId){
        System.out.println(orderId);
        purchaseOrderService.returnFullOrder(orderId);
        return new ResponseUtil("200","Successfully Return Full Order",null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/oneItem")
    public ResponseUtil returnOneItemOrder(@RequestBody SaleDetailsDTO saleDetailsDTO){
        purchaseOrderService.returnOneItem(saleDetailsDTO);
        return new ResponseUtil("200","Successfully Return One Item Order",null);
    }
}
