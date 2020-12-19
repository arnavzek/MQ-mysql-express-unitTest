CREATE TABLE `article` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT(65535) NOT NULL,
  `creationDate` timestamp DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(`title`),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;


CREATE TABLE `comment` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `commentReference` bigint(20) unsigned DEFAULT NULL,
  `content` TEXT(65535) NOT NULL,
  `creationDate` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;