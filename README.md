# NemoLib Web
This is a Java Spring Boot web app for finding network motifs using the NemoProfile algorithm implemented in the NemoLib library.

NemoProfile paper: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5657038/ \
NemoLib fork: https://github.com/techyfatih/nemolib

As of writing this, a demo app can be found here, hosted on AWS:\
http://nemolibweb-env.qzhmfapqwj.us-west-2.elasticbeanstalk.com/

## Build Instructions
### Prerequisites
* Java 8 or higher (https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* Apache Maven (https://maven.apache.org/)

Once the above tools have been installed, you can run the application on localhost by simplying executing:

```
mvn clean compile exec:java
```

in the root directory.

To package the application into an executable JAR file, which can then be deployed to another machine for hosting (e.g. AWS), run:

```
mvn clean package
```

The JAR file will be located in the generated `target/` directory.

The server uses Spring's default port of 5000 (TODO: make this configurable by user)
