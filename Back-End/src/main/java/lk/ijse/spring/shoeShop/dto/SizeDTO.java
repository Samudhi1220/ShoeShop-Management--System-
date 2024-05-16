package lk.ijse.spring.shoeShop.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SizeDTO {
    private int id;
    private String size;
    private String color;
    private int qty;
    private String itemCode;
}
