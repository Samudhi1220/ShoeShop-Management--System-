package lk.ijse.spring.shoeShop.dto;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lk.ijse.spring.shoeShop.embedded.SaleDetailPK;
import lk.ijse.spring.shoeShop.entity.Inventory;
import lk.ijse.spring.shoeShop.entity.Sales;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleDetailsDTO {

    private SaleDetailPK orderDetailPK;
    private int itmQTY;
    private Sales orderNo;
    private Inventory inventory;
    private Double itmTotal;
}
