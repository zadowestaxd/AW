SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE aw_tareas_usuarios (
  id int(10) NOT NULL,
  email varchar(100) NOT NULL,
  passwordd varchar(100) NOT NULL,
  img varchar(100) DEFAULT NULL
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE aw_tareas_user_tarea (
  taskId int(10) NOT NULL,
  userId int(100) NOT NULL,
  done tinyint(1) NOT NULL
  PRIMARY KEY (id, userId)
  FOREIGN KEY (userId) REFERENCES aw_tareas_usuarios(id)
  FOREIGN KEY (taskId) REFERENCES aw_tareas_tareas(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE aw_tareas_tareas (
  id int(11) NOT NULL,
  texto text NOT NULL,
  PRIMARY KEY (taskId)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE aw_tareas_tareas_etiqueta (
  taskId int(11) NOT NULL,
  idEtiqueta text NOT NULL,
  PRIMARY KEY (taskId, idEtiqueta),
  FOREIGN KEY (taskId) REFERENCES aw_tareas_tareas_tareas (id)
  FOREIGN KEY (idEtiqueta) REFERENCES aw_tareas_etiquetas (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE aw_tareas_etiquetas (
  texto text NOT NULL,
  id varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE aw_tareas_tareas
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE aw_tareas_etiquetas
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

COMMIT;

