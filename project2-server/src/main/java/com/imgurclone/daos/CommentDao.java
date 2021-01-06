package com.imgurclone.daos;

import com.imgurclone.models.Comment;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class CommentDao {
    private SessionFactory sessionFactory;

    /**
     * log4j logger
     */
    private static final Logger logger = LogManager.getLogger(AlbumDao.class);

    @Autowired
    public CommentDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    /**
     * Insert a new comment into
     * @param comment
     * @return
     */
    @Transactional
    public Comment insert(Comment comment){
        Session session = sessionFactory.getCurrentSession();
        session.save(comment);
        return comment;
    }

    /**
     * deletes the most recent album from the albums table and associated tags
     */
    @Transactional
    public void deleteMostRecentCommentId(){
        Session session = sessionFactory.getCurrentSession();
        String sql = "select id from albumcomments order by id desc limit 1";
        SQLQuery sqlQuery = session.createSQLQuery(sql);
        int highestId =(Integer)sqlQuery.list().get(0);

        String deleteSql = "delete from albumcomments where id="+highestId;
        SQLQuery deleteSqlQuery = session.createSQLQuery(deleteSql);
        deleteSqlQuery.executeUpdate();

    }
}
