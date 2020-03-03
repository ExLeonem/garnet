CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `forename` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `trashtype` (
  `id` int(11) NOT NULL,
  `trashtype_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `district` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `district_number` int(11) NOT NULL,
  `district_flag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `trashcan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fill_weight` double DEFAULT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `trashtype` int(11) NOT NULL,
  `district` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_trashcan_to_trashtype_idx_idx` (`trashtype`),
  KEY `fk_trashcan_to_district_idx` (`district`),
  CONSTRAINT `fk_trashcan_to_district_idx` FOREIGN KEY (`district`) REFERENCES `district` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_trashcan_to_trashtype_idx` FOREIGN KEY (`trashtype`) REFERENCES `trashtype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

