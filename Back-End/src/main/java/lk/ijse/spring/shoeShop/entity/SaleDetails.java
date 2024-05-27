package lk.ijse.spring.shoeShop.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lk.ijse.spring.shoeShop.embedded.SaleDetailPK;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class SaleDetails {

    @EmbeddedId
    private SaleDetailPK orderDetailPK;

    @Column(name = "itm_qty")
    private int itmQTY;

    @ManyToOne
    @JoinColumn(name = "order_no",insertable=false, updatable=false)
    @JsonBackReference
    private Sales orderNo;

    @ManyToOne
    @JoinColumn(name = "item_code",insertable=false, updatable=false)
    private Inventory inventory;

    private Double itmTotal;

    private int size;

    private String status;
}
