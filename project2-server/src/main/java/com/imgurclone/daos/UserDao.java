package com.imgurclone.daos;

import com.imgurclone.models.Album;
import com.imgurclone.models.User;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public class UserDao {

    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    private AlbumDao albumDao;


    @Autowired
    public UserDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }


    @Transactional
    public void save(User user) {
        Session session = sessionFactory.getCurrentSession();
        session.save(user);
    }

    /**
     * returns the highest id in the db
     * @return highest id in the db
     */
    public int getHighestId(){
        Session session = sessionFactory.getCurrentSession();
        String hql = "from User U order by U.id DESC ";
        Query query = session.createQuery(hql);
        query.setMaxResults(1);
        return ((User)query.list().get(0)).getId();
    }

    /**
     * Get a user by their email address
     * @param email
     * @return
     */
    @Transactional
    public User getByEmail(String email) {
        Session session = sessionFactory.getCurrentSession();
        String hql = "From User where email=:email";
        Query query = session.createQuery(hql);
        query.setString("email", email);
        return (User) query.list().get(0);
    }

    /**
     * Get a user by their primary Id
     * @param id
     * @return
     */
    @Transactional
    public User getById (int id) {
        Session session = sessionFactory.getCurrentSession();
        String hql = "From User where id=:id";
        Query query = session.createQuery(hql);
        query.setInteger("id", id);
        return (User) query.list().get(0);
    }

    /**
     * Add a new album to the User's favorite album list
     * @param userId - Id of the user
     * @param favAlbumId - album of the id to be added to favorites list
     */
    @Transactional
    public void addFavoriteAlbum(Integer userId, int favAlbumId ) {
        Session session = sessionFactory.getCurrentSession();
        String hql = "From User where id=:id";
        Query query = session.createQuery(hql);
        query.setInteger("id", userId);
        User user = (User) query.list().get(0);

        user.getFavoriteAlbums().add(albumDao.getSingleAlbumById(favAlbumId));
        session.merge(user);

    }

    @Transactional
    public void addLikedAlbum(Integer userId, int likedAlbumId ) {
        Session session = sessionFactory.getCurrentSession();
        String hql = "From User where id=:id";
        Query query = session.createQuery(hql);
        query.setInteger("id", userId);
        User user = (User) query.list().get(0);

        user.getLikedAlbums().add(albumDao.getSingleAlbumById(likedAlbumId));
        session.merge(user);

    }

    /**
     * deletes the most recent favorite relationship from the favoriteItems table
     */
    @Transactional
    public void deleteMostRecentFavoriteRelationshipId(){
        Session session = sessionFactory.getCurrentSession();
        String sql = "select id from favoriteitems order by id desc limit 1";
        SQLQuery sqlQuery = session.createSQLQuery(sql);
        int highestId =(Integer)sqlQuery.list().get(0);
        String deleteSql = "delete from favoriteitems where id="+highestId;
        SQLQuery deleteSqlQuery = session.createSQLQuery(deleteSql);
        deleteSqlQuery.executeUpdate();

    }

    /**
     * deletes the most recent album from the albums table and associated tags
     */
    @org.springframework.transaction.annotation.Transactional
    public void deleteMostRecentUserId(){
        Session session = sessionFactory.getCurrentSession();
        String sql = "select id from users order by id desc limit 1";
        SQLQuery sqlQuery = session.createSQLQuery(sql);
        int highestId =(Integer)sqlQuery.list().get(0);

        String deleteSql = "delete from users where id="+highestId;
        SQLQuery deleteSqlQuery = session.createSQLQuery(deleteSql);
        deleteSqlQuery.executeUpdate();

    }

    /**
     * deletes the most recent album from the albums table and associated tags
     */
    @org.springframework.transaction.annotation.Transactional
    public void deleteMostRecentLikeId(){
        Session session = sessionFactory.getCurrentSession();
        String sql = "select id from albumvotes order by id desc limit 1";
        SQLQuery sqlQuery = session.createSQLQuery(sql);
        int highestId =(Integer)sqlQuery.list().get(0);

        String deleteSql = "delete from albumvotes where id="+highestId;
        SQLQuery deleteSqlQuery = session.createSQLQuery(deleteSql);
        deleteSqlQuery.executeUpdate();

    }

}
