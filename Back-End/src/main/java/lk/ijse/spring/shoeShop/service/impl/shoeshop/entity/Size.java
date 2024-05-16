package lk.ijse.spring.shoeShop.service.impl.shoeshop.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "size_id")
    private int sizeId;
    private String size;
    private String color;
    private int qty;

    @ManyToOne
    @JoinColumn(name = "item_code")
    private Inventory inventory;
}
