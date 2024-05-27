package lk.ijse.spring.shoeShop.service.impl;

import jakarta.persistence.EntityExistsException;
import lk.ijse.spring.shoeShop.dto.CustomerDTO;
import lk.ijse.spring.shoeShop.entity.Customer;
import lk.ijse.spring.shoeShop.repository.CustomerRepository;
import lk.ijse.spring.shoeShop.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    CustomerRepository customerRepository;
    ModelMapper modelMapper;

    public CustomerServiceImpl(CustomerRepository customerRepository, ModelMapper modelMapper) {
        this.customerRepository = customerRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void saveCustomer(CustomerDTO customerDTO) {

        if (!customerRepository.existsById(customerDTO.getCustomerId())) {
            if (!customerRepository.existsByEmail(customerDTO.getEmail())) {
                if (!customerRepository.existsByContactNo(customerDTO.getContactNo())) {
                    Customer customer = modelMapper.map(customerDTO, Customer.class);
                    customer.setAddress(customerDTO.getAddress());
                    customerRepository.save(customer);
                }else {
                    throw new EntityExistsException("Contact Number already exists!");
                }
            }else {
                throw new EntityExistsException("Email Address already exists!");
            }
        }else {
            throw new EntityExistsException("Customer already exists!");
        }
    }

    @Override
    public void updateCustomer(CustomerDTO customerDTO) {
        if (customerRepository.existsById(customerDTO.getCustomerId())) {
            customerRepository.save(modelMapper.map(customerDTO, Customer.class));
        } else {
            throw new EntityExistsException("Customer Not Found!");
        }
    }

    @Override
    public void deleteCustomer(String id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
        } else {
            throw new EntityExistsException("Customer Not Found!");
        }
    }

    @Override
    public CustomerDTO getCustomer(String id) {
        return modelMapper.map(customerRepository.findById(id).get(), CustomerDTO.class);
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return modelMapper.map(customerRepository.findAll(), new TypeToken<List<CustomerDTO>>() {
        }.getType());
    }

    @Override
    public String lastId() {
        return customerRepository.getLastIndex();
    }

    @Override
    public List<CustomerDTO> searchCustomersById(String idOrName) {
        return modelMapper.map(customerRepository.findByCustomerIdStartingWithOrCustomerNameStartingWith(idOrName,idOrName),new TypeToken<List<CustomerDTO>>() {}.getType());

    }

    @Override
    public Object getCustomerDetailsForOrder(CustomerDTO customerDTO) {
        if (customerRepository.existsById(customerDTO.getCustomerId())){
            return modelMapper.map(customerRepository.findById(customerDTO.getCustomerId()),Customer.class);
        }else {
            return "Customer Not Found!";
        }
    }
}
