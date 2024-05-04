package lk.ijse.spring.shoeShop.util;

import org.springframework.stereotype.Component;

@Component
public class GenerateNewId {

    public static String nextId(String lastId, String idType) {

        try {

            String[] split = lastId.split("-");

            String idlastNumber = split[1];
            System.out.println(idlastNumber);

            int finalLastNumber = Integer.parseInt(idlastNumber)+1;

            System.out.println(finalLastNumber);
            return split[0] +"-00"+ finalLastNumber;

        } catch (Exception e) {
            return idType + "-001";
        }
    }
}
