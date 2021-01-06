package com.imgurclone.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "imagepath")
    private String imagePath;

    @Column(name = "caption")
    private String caption;

    @Column(name = "datesubmitted")
    private Timestamp dateSubmitted;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="ALBUMID", referencedColumnName = "ID", columnDefinition = "INT")
    private Album album;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public Timestamp getDateSubmitted() {
        return dateSubmitted;
    }

    public void setDateSubmitted(Timestamp dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Image image = (Image) o;
        return getId() == image.getId() &&
                Objects.equals(getImagePath(), image.getImagePath()) &&
                Objects.equals(getCaption(), image.getCaption()) &&
                Objects.equals(getDateSubmitted(), image.getDateSubmitted()) &&
                Objects.equals(getAlbum(), image.getAlbum());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getImagePath(), getCaption(), getDateSubmitted(), getAlbum());
    }

    @Override
    public String toString() {
        return "Image{" +
                "id=" + id +
                ", imagePath='" + imagePath + '\'' +
                ", caption='" + caption + '\'' +
                ", dateSubmitted=" + dateSubmitted +
                ", album=" + album +
                '}';
    }
}
