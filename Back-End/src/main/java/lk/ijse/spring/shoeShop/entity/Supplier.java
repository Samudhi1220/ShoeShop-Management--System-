package lk.ijse.spring.shoeShop.entity;

import jakarta.persistence.*;
import lk.ijse.spring.shoeShop.embedded.Category;
import lk.ijse.spring.shoeShop.embedded.Contact;
import lk.ijse.spring.shoeShop.embedded.InAddress;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Supplier {
    @Id
    private String supplierCode;
    @NotNull
    private String supplierName;
    @Enumerated(EnumType.STRING)
    private Category category;
    @Embedded
    private InAddress address;

    private Contact contact;
    @NotNull
    @Column(unique = true)
    private String email;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "supplier")
    List<Inventory> inventories = new ArrayList<>();
}
