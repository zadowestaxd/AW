SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE aw_tareas_usuarios (
  userId int(10) NOT NULL,
  email varchar(100) NOT NULL,
  passwordd varchar(100) NOT NULL,
  img varchar(100) DEFAULT NULL,
  PRIMARY KEY (userId)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `aw_tareas_usuarios`
MODIFY `userId` int(10) NOT NULL AUTO_INCREMENT;

CREATE TABLE aw_tareas_tareas (
  taskId int(10) NOT NULL,
  texto varchar(100) NOT NULL,
  PRIMARY KEY (taskId)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `aw_tareas_tarea`
MODIFY `taskId` int(10) NOT NULL AUTO_INCREMENT;


CREATE TABLE aw_tareas_user_tarea (
  taskId int(10) NOT NULL,
  userId int(10) NOT NULL,
  done tinyint(1) NOT NULL,
  PRIMARY KEY (taskId, userId),
  FOREIGN KEY (userId) REFERENCES aw_tareas_usuarios(userId),
  FOREIGN KEY (taskId) REFERENCES aw_tareas_tareas(taskId)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE aw_tareas_etiquetas (
  idEtiqueta varchar(10) NOT NULL,
  texto varchar(10) NOT NULL,
  PRIMARY KEY (idEtiqueta)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `aw_tareas_etiquetas`
MODIFY `idEtiqueta` int(10) NOT NULL AUTO_INCREMENT;



CREATE TABLE aw_tareas_tareas_etiqueta (
  taskId int(10) NOT NULL,
  idEtiqueta varchar(10) NOT NULL,
  PRIMARY KEY (taskId, idEtiqueta),
  FOREIGN KEY (taskId) REFERENCES aw_tareas_tareas (taskId),
  FOREIGN KEY (idEtiqueta) REFERENCES aw_tareas_etiquetas (idEtiqueta)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

COMMIT;


INSERT INTO `aw_tareas_usuarios` (`email`, `password`, `img`) VALUES ('usuario@ucm.es', '1234', NULL);

--
-- Insercciones tabla `task`
--
INSERT INTO `task` (`user`, `text`, `done`) VALUES ('usuario@ucm.es', 'PREPARAR PRACTICA AW', '0');
INSERT INTO `task` (`user`, `text`, `done`) VALUES ('usuario@ucm.es', 'MIRAR FECHAS CONGRESO', '1');
INSERT INTO `task` (`user`, `text`, `done`) VALUES ('usuario@ucm.es', 'IR AL SUPERMERCADO', '0');
INSERT INTO `task` (`user`, `text`, `done`) VALUES ('usuario@ucm.es', 'MUDANZA', '0');

--
-- Insercciones tabla `tag`
--
INSERT INTO `tag` (`taskId`, `tag`) VALUES ('1', 'AW');
INSERT INTO `tag` (`taskId`, `tag`) VALUES ('1', 'PRACTICA');
INSERT INTO `tag` (`taskId`, `tag`) VALUES ('3', 'PERSONAL');
INSERT INTO `tag` (`taskId`, `tag`) VALUES ('4', 'PERSONAL');
