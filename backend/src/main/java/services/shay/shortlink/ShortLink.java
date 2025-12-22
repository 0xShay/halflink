package services.shay.shortlink;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "shortlink", uniqueConstraints = { @UniqueConstraint(columnNames = { "code" }) })
public class ShortLink {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull
    private String url;

    @NotNull
    private String title;

    private Date createdAt;

    private Integer clicks;

    private String code;

    protected ShortLink() {}

    public ShortLink(String url, String title) {
        this.url = url;
        this.title = title;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        clicks = 0;
        code = ShortCodeGenerator.generate();
    }

    public UUID getId() { return id; }
    public String getUrl() { return url; }
    public String getTitle() { return title; }
    public Date getCreatedAt() { return createdAt; }
    public Integer getClicks() { return clicks; }
    public String getCode() { return code; }

    public void setId(UUID id) { this.id = id; }
    public void setUrl(String url) { this.url = url; }
    public void setTitle(String title) { this.title = title; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    public void setClicks(Integer clicks) { this.clicks = clicks; }
    public void setCode(String code) { this.code = code; }

}
