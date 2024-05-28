package lk.ijse.spring.shoeShop.dto;

import jakarta.persistence.*;
import lk.ijse.spring.shoeShop.embedded.OrderStatus;
import lk.ijse.spring.shoeShop.entity.Customer;
import lk.ijse.spring.shoeShop.entity.SaleDetails;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleDTO {

    private String orderNo;

    private LocalDate purchaseDate;

    private Double total;

    private String paymentMethod;

    private Integer totalPoints;

    private String cashier;

    private CustomerDTO customerId;
    private OrderStatus status;

    private List<SaleDetailsDTO> saleDetails = new ArrayList<>();
}
