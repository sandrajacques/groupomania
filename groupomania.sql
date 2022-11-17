-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 17 nov. 2022 à 19:39
-- Version du serveur :  8.0.28
-- Version de PHP : 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE `commentaires` (
  `id` int NOT NULL,
  `message` text,
  `posts_id` int DEFAULT NULL,
  `idAuthor` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commentaires`
--

INSERT INTO `commentaires` (`id`, `message`, `posts_id`, `idAuthor`) VALUES
(1, 'commentaire post1', 1, NULL),
(17, 'bonne fete', 34, 1);

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id` int NOT NULL,
  `posts_id` int DEFAULT NULL,
  `idAuthor` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `posts_id`, `idAuthor`) VALUES
(1, 41, 2),
(2, 41, 2),
(3, 41, 2),
(4, 40, 2),
(7, 40, 2),
(8, 33, 2),
(9, 41, 2),
(10, 40, 2),
(11, 32, 2),
(12, 32, 2),
(13, 42, 2),
(14, 43, 2),
(15, 43, 2),
(16, 43, 2),
(17, 43, 2),
(18, 43, 2),
(19, 43, 2),
(21, 42, 1),
(22, 41, 1),
(23, 40, 1),
(24, 35, 1),
(25, 34, 1),
(26, 33, 1),
(27, 32, 1),
(30, 35, 2),
(31, 34, 2),
(32, 49, 2);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int NOT NULL,
  `contenu` text,
  `imgUrl` text,
  `horodatage` text,
  `idAuthor` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `contenu`, `imgUrl`, `horodatage`, `idAuthor`) VALUES
(32, 'haloween', '', '2022-06-30T19:23:46.095Z', NULL),
(33, 'paques', '', '2022-06-30T19:32:51.190Z', NULL),
(34, '14 juillet', '', '2022-06-30T19:33:01.540Z', NULL),
(35, 'noel', '', '2022-06-30T19:35:21.796Z', NULL),
(49, 'bientot le titre  pour noel ', 'http://localhost:3001/images/_th-1668710014478-166547754.jpg', '2022-11-17T18:29:37.733Z', 2);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` longblob
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `email`, `password`, `avatar`) VALUES
(1, 'Jacques', 'Sandra', 'ssephiha1905@gmail.com', '$2b$10$ZbfKbXUkGX3FahQXFza5B.727H.DJvEiJIEluyejR90XvsYIc6b3K', NULL),
(2, 'sorensen', 'aksel', 'aksel@gmail.com', '$2b$10$ARrAHAvJDVDD69EFPR0O9.3oyze.PlMFo24U1jwwXK1WDsZgjiwLm', NULL),
(4, 'Jacques', 'Sandra', 'ssephiha@gmail.com', '$2b$10$T3KUB1JBWBR/q9kXcWagB.VhS5RWrjWWTcSOhs9zRdXp8fPa3SNu6', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `commentaires`
--
ALTER TABLE `commentaires`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
