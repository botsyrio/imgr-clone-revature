package com.imgurclone.models;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name ="albumtags")
public class AlbumTag {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="albumid", referencedColumnName="ID", columnDefinition="INT")
    private Album album;


    @Column(name = "tagname")
    private String tagName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AlbumTag albumTag = (AlbumTag) o;
        return getId() == albumTag.getId() &&
                Objects.equals(getAlbum(), albumTag.getAlbum()) &&
                Objects.equals(getTagName(), albumTag.getTagName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getAlbum(),getTagName());
    }

    @Override
    public String toString() {
        return "AlbumTag{" +
                "id=" + id +
                ", album=" + album +
                ", tagName='" + tagName + '\'' +
                '}';
    }
}
