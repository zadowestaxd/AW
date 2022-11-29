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

--
-- Estructura de tabla para la tabla `etiquetas`
--

CREATE TABLE `etiquetas` (
  `idEtiqueta` int(11) NOT NULL,
  `tag` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `etiquetas`
--

INSERT INTO `etiquetas` (`idEtiqueta`, `tag`) VALUES
(32, 'AW'),
(41, 'AW2'),
(34, 'Básico'),
(42, 'Básico2'),
(26, 'Cerveza'),
(25, 'Deporte'),
(43, 'Deporte2'),
(29, 'g'),
(24, 'JavaScript'),
(45, 'prueba'),
(36, 'TFG'),
(44, 'TFG2'),
(27, 'uni'),
(23, 'Universidad'),
(28, 'vivaelfurbo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `idTarea` int(11) NOT NULL,
  `texto` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`idTarea`, `texto`) VALUES
(11, 'Acabar AW'),
(9, 'Acabar práctica AW'),
(20, 'Añadir prueba'),
(16, 'Empezar practiva obligatoria'),
(12, 'Furboll'),
(13, 'Holo'),
(10, 'Jugar al padel y al futbol'),
(17, 'Nueva tarea de ejemplo2'),
(15, 'prueba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas_etiquetas`
--

CREATE TABLE `tareas_etiquetas` (
  `idTarea` int(11) NOT NULL,
  `idEtiqueta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tareas_etiquetas`
--

INSERT INTO `tareas_etiquetas` (`idTarea`, `idEtiqueta`) VALUES
(9, 23),
(9, 24),
(10, 25),
(10, 26),
(11, 27),
(12, 28),
(15, 29),
(16, 32),
(17, 25),
(17, 32),
(17, 34),
(17, 36),
(17, 41),
(17, 42),
(17, 43),
(17, 44),
(20, 45);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_tareas`
--

CREATE TABLE `user_tareas` (
  `idUser` int(11) NOT NULL,
  `idTarea` int(11) NOT NULL,
  `hecho` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_tareas`
--

INSERT INTO `user_tareas` (`idUser`, `idTarea`, `hecho`) VALUES
(5, 10, 0),
(5, 20, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUser` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `img` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUser`, `email`, `password`, `img`) VALUES
(5, 'usuario@ucm.es', '1234567', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD PRIMARY KEY (`idEtiqueta`),
  ADD UNIQUE KEY `tag` (`tag`),
  ADD UNIQUE KEY `tag_2` (`tag`),
  ADD UNIQUE KEY `tag_3` (`tag`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`idTarea`),
  ADD UNIQUE KEY `texto` (`texto`);

--
-- Indices de la tabla `tareas_etiquetas`
--
ALTER TABLE `tareas_etiquetas`
  ADD PRIMARY KEY (`idTarea`,`idEtiqueta`),
  ADD KEY `idEtiqueta` (`idEtiqueta`),
  ADD KEY `idTarea` (`idTarea`);

--
-- Indices de la tabla `user_tareas`
--
ALTER TABLE `user_tareas`
  ADD PRIMARY KEY (`idTarea`,`idUser`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idTarea` (`idTarea`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  MODIFY `idEtiqueta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `idTarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tareas_etiquetas`
--
ALTER TABLE `tareas_etiquetas`
  ADD CONSTRAINT `tareas_etiquetas_ibfk_1` FOREIGN KEY (`idEtiqueta`) REFERENCES `etiquetas` (`idEtiqueta`),
  ADD CONSTRAINT `tareas_etiquetas_ibfk_2` FOREIGN KEY (`idTarea`) REFERENCES `tareas` (`idTarea`);

--
-- Filtros para la tabla `user_tareas`
--
ALTER TABLE `user_tareas`
  ADD CONSTRAINT `user_tareas_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `usuarios` (`idUser`),
  ADD CONSTRAINT `user_tareas_ibfk_2` FOREIGN KEY (`idTarea`) REFERENCES `tareas` (`idTarea`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
