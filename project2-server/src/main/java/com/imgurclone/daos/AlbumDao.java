package com.imgurclone.daos;

import com.imgurclone.models.Album;
import com.imgurclone.models.AlbumTag;
import com.imgurclone.models.Image;
import com.imgurclone.models.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.*;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class AlbumDao {
    private SessionFactory sessionFactory;

    /**
     * log4j logger
     */
    private static final Logger logger = LogManager.getLogger(AlbumDao.class);

    @Autowired
    public AlbumDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    /**
     *
     * @param album - New album to be inserted
     * @return returns the new album's id
     */
    @Transactional
    public int insert(Album album) {
        Session session = sessionFactory.getCurrentSession();
        session.save(album);
        for(AlbumTag t: album.getTagList())
            session.save(t);
        return album.getId();
    }

    /**
     *
     * @param album The album to be updated
     */
    @Transactional
    public void update(Album album) {
        Session session = sessionFactory.getCurrentSession();
        session.update(album);
    }

    /**
     * returns the 10 most recent albums in the database as a List
     *
     * @return the 10 most recent albums
     */
    @Transactional
    public List<Album> getTenMostRecentAlbums() {
        logger.debug("getTenMostRecentAlbums beginning");

        Session session = sessionFactory.getCurrentSession();
        String hql = "from Album A order by A.dateCreated DESC ";
        Query query = session.createQuery(hql);
        query.setMaxResults(10);
        List<Album> result = query.list();
        /*
        Criteria criteria = session.createCriteria(Album.class);
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        criteria.addOrder(Order.desc("dateCreated"));
        criteria.setMaxResults(10);



        logger.debug("getTenMostRecentAlbums Criteria set up");

        List<Album> result = criteria.list();

        logger.debug("getTenMostRecentAlbums Criteria executed");
        logger.debug("getTenMostRecentAlbums result[0] title: "+result.get(0).getAlbumTitle());
        */


        return result;
    }

    /**
     * takes in the title of an album to return the album of that name
     * an alternative to searching by id
     *
     * @param title
     * @return the desired album
     */
    @Transactional
    public Album getSingleAlbumByTitle(String title) {
        logger.debug("getSingleAlbumByTitle beginning");

        Session session = sessionFactory.getCurrentSession();
        Criteria criteria = session.createCriteria(Album.class);
        criteria.add(Restrictions.eq("albumTitle", title));

        logger.debug("getSingleAlbumByTitle criteria set");

        List<Album> result = criteria.list();

        logger.debug("getSingleAlbumByTitle Criteria executed");
        logger.debug("getSingleAlbumByTitle title: " + result.get(0).getAlbumTitle());

        return result.get(0);
    }


    /**
     * returns an album by the given id. may be used for
     * typing album id into url bar
     *
     * @param id
     * @return the desired album
     */
    @Transactional
    public Album getSingleAlbumById(int id) {
        logger.debug("getSingleAlbum beginning");

        Session session = sessionFactory.getCurrentSession();
        Criteria criteria = session.createCriteria(Album.class);
        criteria.add(Restrictions.eq("id", id));

        logger.debug("getSingleAlbumById criteria set");

        List<Album> result = criteria.list();

        logger.debug("getSingleAlbumById Criteria executed");
        logger.debug("getSingleAlbumById id: " + result.get(0).getId());

        return result.get(0);

    }

    public void deleteImageById(int idOfDeleted) {
        logger.debug("deleteImageById beginning");
        Session session = sessionFactory.getCurrentSession();

        Image image = new Image();
        image.setId(idOfDeleted);
        logger.debug("deleteImageById Ready");

        session.delete(image);
        logger.debug("deleteImageById finished");
    }


    /**
     * returns all albums created by a particular user
     * @param userCreator the user whose albums are being returned
     * @return the list of the user's albums
     */
    @Transactional
    public List<Album> getAlbumsByUserCreator(User userCreator){
        logger.debug("getAlbumsByUserCreator beginning");

        Session session = sessionFactory.getCurrentSession();
        String hql = "from Album A where A.userCreator = :user order by A.dateCreated DESC ";
        Query query = session.createQuery(hql);
        query.setParameter("user", userCreator);
        List<Album> result = query.list();
        logger.debug("getAlbumsByUserCreator retrieved albums for userCreator "+userCreator.getId());
        return result;
    }

    @Transactional
    public List<Album> getAlbumsByTagName(String tagName){
        Session session = sessionFactory.getCurrentSession();
        String tagHql = "from AlbumTag T where T.tagName=:tag";
        Query query = session.createQuery(tagHql);
        query.setParameter("tag", tagName);
        List<AlbumTag> tagMappings = query.list();
        List<Album> result = new ArrayList<>();
        for(AlbumTag tag:tagMappings)
            result.add(tag.getAlbum());
        return result;
    }

    @Transactional
    public void insertNewImage(Integer albumId, Image newImage) {
        Session session = sessionFactory.getCurrentSession();

        Criteria criteria = session.createCriteria(Album.class);
        criteria.add(Restrictions.eq("id", albumId));

        List<Album> result = criteria.list();
        Album albumToUpdate = result.get(0);

        newImage.setAlbum(albumToUpdate);
        session.save(newImage);

        albumToUpdate.getImageSet().add(newImage);
        session.save(albumToUpdate);
        session.flush();
    }

    /**
     * Add a new tag to the album
     * @param albumId - Id of the album whose tagset the tag will be put into
     * @param newTag - A new tag for the albums tagset
     */
    @Transactional
    public void addNewTagToAlbum(Integer albumId, String newTag) {
        Session session = sessionFactory.getCurrentSession();
        String hql = "From Album where id=:albumId";
        Query query = session.createQuery(hql);
        query.setInteger("albumId", albumId);

        Album albumToUpdate = (Album) query.list().get(0);

        AlbumTag newAlbumTag = new AlbumTag();
        newAlbumTag.setAlbum(albumToUpdate);
        newAlbumTag.setTagName(newTag);

        session.saveOrUpdate(newAlbumTag);
    }

    @Transactional
    public BigInteger getCountAlbumLikes(Integer albumId){
        Session session = sessionFactory.getCurrentSession();
        String sql = "select count(id) from albumvotes where albumId="+albumId;
        SQLQuery sqlQuery = session.createSQLQuery(sql);
        return (BigInteger) sqlQuery.list().get(0);
    }

    /**
     * deletes the most recent album from the albums table and associated tags
     */
    @Transactional
    public void deleteMostRecentAlbumId(){
        Session session = sessionFactory.getCurrentSession();
        String sql = "select id from albums order by id desc limit 1";
        SQLQuery sqlQuery = session.createSQLQuery(sql);
        int highestId =(Integer)sqlQuery.list().get(0);

        String deleteSql = "delete from albumtags where albumid="+highestId;
        SQLQuery deleteSqlQuery = session.createSQLQuery(deleteSql);
        deleteSqlQuery.executeUpdate();

        deleteSql = "delete from albums where id="+highestId;
        deleteSqlQuery = session.createSQLQuery(deleteSql);
        deleteSqlQuery.executeUpdate();

    }

    /**
     * deletes the most recent tag from the albums table and associated tags
     */
    @Transactional
    public void deleteMostRecentTagId(){
        Session session = sessionFactory.getCurrentSession();
        String sql = "select id from albumtags order by id desc limit 1";
        SQLQuery sqlQuery = session.createSQLQuery(sql);
        int highestId =(Integer)sqlQuery.list().get(0);

        String deleteSql = "delete from albumtags where id="+highestId;
        SQLQuery deleteSqlQuery = session.createSQLQuery(deleteSql);
        deleteSqlQuery.executeUpdate();
    }
}