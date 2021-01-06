import com.imgurclone.daos.UserDao;
import com.imgurclone.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Component
@EnableWebMvc
public class Main {

    @Autowired
    UserDao userDao;



    public static void main(String[] args) {
        ApplicationContext ac = new ClassPathXmlApplicationContext("file:src/main/webapp/WEB-INF/application-context.xml");
        Main app = ac.getBean(Main.class);

        User user = new User();
        user.setEmail("test");
        user.setPasswordHash("test");

//        app.userDao.save(user);
    }
}
