
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tareas`
--

-- --------------------------------------------------------


CREATE TABLE `UCM_AW_CAU_AVI_Avisos` (
  `idUser` int(11) NOT NULL,
  `idAviso` int(11) NOT NULL,
  `texto` varchar(100) NOT NULL,
  `prioridad` int(11) NOT NULL,
  `done` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `UCM_AW_CAU_AVI_Avisos`
--

INSERT INTO `UCM_AW_CAU_AVI_Avisos` (`idUser`, `idAviso`, `done`, `texto`,`prioridad`) VALUES
(5, 10, 0,'hola, buenas, soy sumorenito18 y aparte de ser cani soy el soy el niño al que tu quiereh',2),
(5, 20, 0, 'habia una vez un barquito chiquitito que no sabia que no podia que no sabia navegar',0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `UCM_AW_CAU_USU_Usuarios`
--

CREATE TABLE `UCM_AW_CAU_USU_Usuarios` (
  `idUser` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `numEmpleado` int(11),
  `perfil` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `img` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `UCM_AW_CAU_USU_Usuarios`
--

INSERT INTO `UCM_AW_CAU_USU_Usuarios` (`idUser`, `email`, `password`, `img`, `perfil`, `numEmpleado`,`name`) VALUES
(5, 'usuario@ucm.es', '1234567', NULL, 0, NULL, 'Eve'),
(3, 'tecnicoCau@ucm.es', '1746263', NULL, 1, 1, 'Alfonso');


--
--
-- Indices de la tabla `UCM_AW_CAU_AVI_Avisos`
--
ALTER TABLE `UCM_AW_CAU_AVI_Avisos`
  ADD PRIMARY KEY (`idAviso`);

--
-- Indices de la tabla `UCM_AW_CAU_USU_Usuarios`
--
ALTER TABLE `UCM_AW_CAU_USU_Usuarios`
  ADD PRIMARY KEY (`idUser`);


--
-- AUTO_INCREMENT de la tabla `UCM_AW_CAU_USU_Usuarios`
--
ALTER TABLE `UCM_AW_CAU_USU_Usuarios`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `UCM_AW_CAU_AVI_Avisos`
  MODIFY `idAviso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- R
-- Filtros para la tabla `UCM_AW_CAU_AVI_Avisos`
--

COMMIT;
