package services.shay.shortlink;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/l")
public class ShortLinkController {

    private final ShortLinkRepository shortLinkRepository;

    public ShortLinkController(ShortLinkRepository shortLinkRepository) {
        this.shortLinkRepository = shortLinkRepository;
    }

    @GetMapping("/{code}")
    public ResponseEntity<Void> redirectToUrl(@PathVariable String code) {
        ShortLink sl = shortLinkRepository.findByCode(code).orElse(null);
        if (sl != null) {
            sl.setClicks(sl.getClicks() + 1);
            shortLinkRepository.save(sl);
            return ResponseEntity
                    .status(HttpStatus.FOUND)
                    .location(URI.create(sl.getUrl()))
                    .build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ShortLink createShortLink(@Valid @RequestBody ShortLink shortLink) {
        ShortLink savedShortLink = shortLinkRepository.save(shortLink);
        System.out.println("savedShortLink = " + savedShortLink);
        return savedShortLink;
    }

    @DeleteMapping("/{id}")
    public void deleteShortLink(@PathVariable UUID id) {
        shortLinkRepository.deleteById(id);
    }

}
