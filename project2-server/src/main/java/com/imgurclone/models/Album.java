package com.imgurclone.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "albums")
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="albumtitle")
    private String albumTitle;

    @Column(name = "datecreated")
    @CreationTimestamp
    private Timestamp dateCreated;

    //many to one
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="userCreator", referencedColumnName="ID", columnDefinition="INT")
    private User userCreator;

    @JsonManagedReference
    @OneToMany(mappedBy = "album", fetch = FetchType.EAGER)
    private Set<Image> imageSet;

    @JsonManagedReference
    @OneToMany(mappedBy = "album", fetch = FetchType.EAGER)
    private Set<AlbumTag> tagList;

    @JsonManagedReference
    @OneToMany(mappedBy="album", fetch = FetchType.EAGER)
    private Set<Comment> commentSet;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAlbumTitle() {
        return albumTitle;
    }

    public void setAlbumTitle(String albumTitle) {
        this.albumTitle = albumTitle;
    }

    public Timestamp getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Timestamp dateCreated) {
        this.dateCreated = dateCreated;
    }

    public User getUserCreator() {
        return userCreator;
    }

    public void setUserCreator(User userCreator) {
        this.userCreator = userCreator;
    }

    public Set<Image> getImageSet() {
        return imageSet;
    }

    public void setImageSet(Set<Image> imageSet) {
        this.imageSet = imageSet;
    }

    public Set<AlbumTag> getTagList() {
        return tagList;
    }

    public void setTagList(Set<AlbumTag> tagList) {
        this.tagList = tagList;
    }

    public Set<Comment> getCommentSet() {
        return commentSet;
    }

    public void setCommentSet(Set<Comment> commentSet) {
        this.commentSet = commentSet;
    }

    @Override
    public String toString() {
        return "Album{" +
                "id=" + id +
                ", albumTitle='" + albumTitle + '\'' +
                ", dateCreated=" + dateCreated +
                ", userCreator=" + userCreator +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Album album = (Album) o;
        return getId() == album.getId() &&
                Objects.equals(getAlbumTitle(), album.getAlbumTitle()) &&
                Objects.equals(getDateCreated(), album.getDateCreated()) &&
                Objects.equals(getUserCreator(), album.getUserCreator());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getAlbumTitle(), getDateCreated(), getUserCreator());
    }
}
