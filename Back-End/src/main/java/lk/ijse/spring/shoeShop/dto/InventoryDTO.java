package lk.ijse.spring.shoeShop.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lk.ijse.spring.shoeShop.entity.Supplier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "itemCode")
public class InventoryDTO {

    @NotNull(message = "Inventory ID is required")
    @Pattern(regexp = "^[A-Z]{3}\\d{4}[1-9]$", message = "ID is not Valid")
    private String itemCode;

    @NotNull(message = "Description  is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Description is not Valid")
    private String itemDesc;

    private String itemPicture;


    private int qty;

    private String category;
    private Supplier supplier;

    @NotNull(message = "Supplier Name is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Description is not Valid")
    private String supplierName;

    @NotNull(message = "Description  is required")
    @Pattern(regexp = "^\\d+(\\.\\d{1,2})?$", message = "Description is not Valid")
    private Double salePrice;

    @NotNull(message = "Description  is required")
    @Pattern(regexp = "^\\d+(\\.\\d{1,2})?$", message = "Description is not Valid")
    private Double buyPrice;

    private Double expectedProfit;
    private Double profitMargin;

    @NotNull(message = "Status is required")
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Status is not Valid")
    private String status;
    private String size;

}
