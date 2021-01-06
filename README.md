# imgur-clone
A Maven web application that works similarly to Imgur. It allows users to create an account/login with password hashing implemented. Users can view images, comment on albums, create albums, upload images and, like/favorites albums.

## Technologies
• Java 1.8

• Maven

• Spring Framework 4.3.27

    - Spring ORM    
    - Spring MVC
    
• Hibernate 4.3.11

• Postgres 42.2.18

• Amazon RDS

• Amazon AWS S3 SDK

• JUnit 4.12

• Apache Tomcat

• Angular 4


## Getting Started

### Pre-requisites
Please ensure you have the following installed prior to cloning this repository:
- Java 1.8 SDK
- Maven


### Required Files
• AwsCredentials.properties

        AWSAccessKeyId=YOUR_AWS_ACCESS_KEY
        AWSSecretKey=YOUR_AWS_SECRET_KEY
        region=your_s3_bucket_region

• datasource.properties

      datasource.url=your_rds_instance
      datasource.username=your_database_username
      datasource.password=your_database_password


## Running the Application

- maven package the spring application to a war
- deploy the war file to a tomcat server and run the server


Start the angular project with 
`ng serve -o`


## Contributors
David Foley, Ratul Ahmed, Clay Flores

