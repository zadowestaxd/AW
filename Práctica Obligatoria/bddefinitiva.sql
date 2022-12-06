-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-11-2022 a las 17:01:02
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

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
  `done` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `UCM_AW_CAU_AVI_Avisos`
--

INSERT INTO `UCM_AW_CAU_AVI_Avisos` (`idUser`, `idTarea`, `hecho`) VALUES
(5, 10, 0),
(5, 20, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `UCM_AW_CAU_USU_Usuarios`
--

CREATE TABLE `UCM_AW_CAU_USU_Usuarios` (
  `idUser` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  'numEmpleado' int(11),
  `perfil` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `img` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `UCM_AW_CAU_USU_Usuarios`
--

INSERT INTO `UCM_AW_CAU_USU_Usuarios` (`idUser`, `email`, `password`, `img`) VALUES
(5, 'usuario@ucm.es', '1234567', NULL);


--
--
-- Indices de la tabla `UCM_AW_CAU_AVI_Avisos`
--
ALTER TABLE `UCM_AW_CAU_AVI_Avisos`
  ADD PRIMARY KEY (`idTarea`,`idUser`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idTarea` (`idTarea`);

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

--
-- R
-- Filtros para la tabla `UCM_AW_CAU_AVI_Avisos`
--
ALTER TABLE `UCM_AW_CAU_AVI_Avisos`
  ADD CONSTRAINT `UCM_AW_CAU_AVI_Avisos_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `UCM_AW_CAU_USU_Usuarios` (`idUser`),
  ADD CONSTRAINT `UCM_AW_CAU_AVI_Avisos_ibfk_2` FOREIGN KEY (`idTarea`) REFERENCES `tareas` (`idTarea`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
