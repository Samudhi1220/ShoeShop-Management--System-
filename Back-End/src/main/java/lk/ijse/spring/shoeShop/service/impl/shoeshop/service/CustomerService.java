package lk.ijse.spring.shoeShop.service.impl.shoeshop.service;

import lk.ijse.spring.shoeshop.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {
    void saveCustomer(CustomerDTO customer);
    void updateCustomer(CustomerDTO customer);
    void deleteCustomer(String id);
    CustomerDTO getCustomer(String id);
    List<CustomerDTO> getAllCustomers();
    String lastId();
    List<CustomerDTO> searchCustomersById(String idOrName);

}
