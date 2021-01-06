package com.imgurclone.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name="USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "email")
    private String email;

    //TODO make this a hashed valued
    @Column(name = "passwordHash")
    private String passwordHash;

    @JsonManagedReference
    @OneToMany(mappedBy = "userCreator", fetch = FetchType.EAGER)
    private Set<Album> albumList;

    @ManyToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
    @JoinTable(
        name = "favoriteItems",
        joinColumns = { @JoinColumn(name = "userfavoriter") },
        inverseJoinColumns = { @JoinColumn(name = "albumfavorited") }
    )
    private Set<Album> favoriteAlbums;

    //many to many relationship from albumVotes
    @ManyToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    @JoinTable(
        name = "albumVotes",
        joinColumns = { @JoinColumn(name = "usercreator") },
        inverseJoinColumns = { @JoinColumn(name = "albumid") }
    )
    private Set<Album> likedAlbums;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {return passwordHash;}

    public void setPasswordHash(String passwordHash) {this.passwordHash = passwordHash;}

    public Set<Album> getAlbumList() {
        return albumList;
    }

    public void setAlbumList(Set<Album> albumList) {
        this.albumList = albumList;
    }

    public Set<Album> getFavoriteAlbums() {
        return favoriteAlbums;
    }

    public void setFavoriteAlbums(Set<Album> favoriteAlbums) {
        this.favoriteAlbums = favoriteAlbums;
    }

    public Set<Album> getLikedAlbums() {
        return likedAlbums;
    }

    public void setLikedAlbums(Set<Album> likedAlbums) {
        this.likedAlbums = likedAlbums;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return getId() == user.getId() &&
                Objects.equals(getEmail(), user.getEmail()) &&
                Objects.equals(getPasswordHash(), user.getPasswordHash());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getEmail(), getPasswordHash());
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", passwordHash='" + passwordHash + '\'' +
                '}';
    }
}
