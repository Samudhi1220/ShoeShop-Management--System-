package lk.ijse.spring.shoeShop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lk.ijse.spring.shoeShop.embedded.OrderStatus;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Sales {

    @Id
    private String orderNo;

    @CreationTimestamp
    private LocalDate purchaseDate;

    private Double total;

    private String paymentMethod;

    private Integer totalPoints;

    private String cashier;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customerId;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "orderNo")
    @JsonManagedReference
    private List<SaleDetails> saleDetails = new ArrayList<>();
}
