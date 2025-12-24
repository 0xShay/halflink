package services.shay.shortlink;

import java.security.SecureRandom;

public class ShortCodeGenerator {

    private static final String BASE_58_CHARS = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

    private static final SecureRandom RANDOM = new SecureRandom();

    public static String generate(int length) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(BASE_58_CHARS.charAt(RANDOM.nextInt(BASE_58_CHARS.length())));
        }
        return sb.toString();
    }

    public static String generate() {
         return generate(7);
    }

}
