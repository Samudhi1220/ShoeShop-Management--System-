package lk.ijse.spring.shoeShop.service;

import lk.ijse.spring.shoeShop.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {
    void saveCustomer(CustomerDTO customer);

    void updateCustomer(CustomerDTO customer);

    void deleteCustomer(String id);

    CustomerDTO getCustomer(String id);

    List<CustomerDTO> getAllCustomers();

    String lastId();

    List<CustomerDTO> searchCustomersById(String idOrName);

    Object getCustomerDetailsForOrder(CustomerDTO customerDTO);
}
