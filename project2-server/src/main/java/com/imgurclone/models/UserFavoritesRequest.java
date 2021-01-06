package com.imgurclone.models;

public class UserFavoritesRequest {
    private int userId;
    private int favAlbumId;

    public UserFavoritesRequest() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getFavAlbumId() {
        return favAlbumId;
    }

    public void setFavAlbumId(int favAlbumId) {
        this.favAlbumId = favAlbumId;
    }
}
